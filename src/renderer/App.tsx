/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import SkillSavesForm from './SkillSavesForm';
import BasicStats from './BasicStats';

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
  console.log('sending...', data);
  // window.electron.ipcRenderer.sendMessage('write-yaml', [data]);
}

function StatblockForm() {
  const methods = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = createFile;

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <label>
          Bestiary Directory
          <input {...methods.register('bestiaryDirectory')} tabIndex={-1} />
        </label>
        <BasicStats />
        <label>
          stats
          <input {...methods.register('stats')} />
        </label>
        <SkillSavesForm />
        <label>
          damage_vulnerabilities
          <input {...methods.register('damage_vulnerabilities')} />
        </label>
        <label>
          damage_resistances
          <input {...methods.register('damage_resistances')} />
        </label>
        <label>
          damage_immunities
          <input {...methods.register('damage_immunities')} />
        </label>
        <label>
          condition_immunities
          <input {...methods.register('condition_immunities')} />
        </label>
        <label>
          senses
          <input {...methods.register('senses')} />
        </label>
        <label>
          languages
          <input {...methods.register('languages')} />
        </label>
        <label>
          cr
          <input {...methods.register('cr')} />
        </label>
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
