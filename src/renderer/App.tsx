/* eslint-disable react/jsx-props-no-spreading */
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import SkillSavesForm from './SkillSavesForm';
import BasicStats from './BasicStats';
import AbilityScores from './AbilityScores';
import Resistances from './Resistances';
import SavesForm from './SavesForm';
import TraitsForm from './TraitsForm';
import ActionsForm from './ActionsForm';
import LegendaryActionsForm from './LegendaryActionsForm';

export type Inputs = {
  bestiaryDirectory: string;
  name: string;
  size: string;
  type: string;
  alignment: string;
  ac: number;
  hp: number;
  hit_dice: string;
  speed: string;
  stats: number[];
  saves: { [key: string]: number };
  skillsaves: { [key: string]: number };
  damage_vulnerabilities: string;
  damage_resistances: string;
  damage_immunities: string;
  condition_immunities: string;
  senses: string;
  languages: string;
  cr: number;
};

function createFile(data: Inputs) {
  window.electron.ipcRenderer.sendMessage('write-yaml', [data]);
}

function StatblockForm() {
  const methods = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = createFile;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <label htmlFor="bestiary-directory">
          Bestiary Directory
          <input
            id="bestiary-directory"
            {...methods.register('bestiaryDirectory')}
            tabIndex={-1}
          />
        </label>
        <BasicStats />
        <AbilityScores />
        <SavesForm />
        <SkillSavesForm />
        <Resistances />
        <TraitsForm />
        <ActionsForm />
        <LegendaryActionsForm />
        <input type="submit" />
      </form>
    </FormProvider>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StatblockForm />} />
      </Routes>
    </Router>
  );
}
