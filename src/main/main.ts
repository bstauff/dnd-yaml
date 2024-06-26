/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import YAML from 'yaml';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

const fs = require('fs');

interface SpellData {
  [key: number]: string;
}

interface SaveData {
  [key: string]: number;
}

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

function splitASI(asiString: string): number[] {
  return asiString
    .trim()
    .split(',')
    .map((scoreString) => Number(scoreString));
}

function getYamlString(bestiaryData) {
  // TODO Something is wrong with how modifiers are printing out
  // TODO check that the ASI split is correct
  const convertedSkillSaves = bestiaryData.skillSaves.map(
    (skillSave: { skill: string; modifier: number }) => {
      const skillSaveData: SaveData = {};
      skillSaveData[skillSave.skill] = skillSave.modifier;
      return skillSaveData;
    },
  );

  const convertedSaves = bestiaryData.saves.map(
    (save: { ability: string; modifier: number }) => {
      const saveData: SaveData = {};
      saveData[save.ability] = save.modifier;
      return saveData;
    },
  );

  const convertedSpells = bestiaryData.spells.map(
    (spell: { level: number; 'spell-list': string }) => {
      const foo: SpellData = {};
      foo[spell.level] = spell['spell-list'];
      return foo;
    },
  );

  const spellDescription = [bestiaryData['spellcasting-description']].concat(
    convertedSpells,
  );

  const converted = {
    ...bestiaryData,
    spells: spellDescription,
    stats: splitASI(bestiaryData.stats),
    saves: convertedSaves,
    skillsaves: convertedSkillSaves,
  };

  delete converted['spellcasting-description'];
  delete converted.bestiaryDirectory;

  const yamlString = YAML.stringify(converted).trimEnd();

  return yamlString;
}

function writeYaml(event, formData) {
  console.log(`I received: `, JSON.stringify(formData));

  const bestiaryData = formData[0];

  const bestiaryYaml = getYamlString(bestiaryData);

  console.log(bestiaryYaml);

  const { bestiaryDirectory } = bestiaryData;

  const stringToWrite = `\`\`\`statblock\n${bestiaryYaml}\n\`\`\``;

  const fullPath = `${bestiaryDirectory}${bestiaryData.name}.md`;

  console.log('Im about to write: \n', stringToWrite);
  console.log('writing to: ', fullPath);
  fs.writeFile(fullPath, stringToWrite, (error) =>
    error ? console.log('error', error) : console.log('good to go '),
  );
}

let mainWindow: BrowserWindow | null = null;

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});
ipcMain.on('write-yaml', writeYaml);

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
