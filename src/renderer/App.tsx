/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import SavesForm from './SavesForm';

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
  saves: {
    Str: number;
    Dex: number;
    Con: number;
    Int: number;
    Wis: number;
    Cha: number;
  };
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
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = createFile;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Bestiary Directory
        <input {...register('bestiaryDirectory')} tabIndex={-1} />
      </label>
      <label>
        Name
        <input {...register('name')} tabIndex={0} />
      </label>
      <label>
        Size
        <input {...register('size')} />
      </label>
      <label>
        Type
        <input {...register('type')} />
      </label>
      <label>
        alignment
        <input {...register('alignment')} />
      </label>
      <label>
        ac
        <input {...register('ac')} />
      </label>
      <label>
        hp
        <input {...register('hp')} />
      </label>
      <label>
        hit_dice
        <input {...register('hit_dice')} />
      </label>
      <label>
        speed
        <input {...register('speed')} />
      </label>
      <label>
        stats
        <input {...register('stats')} />
      </label>
      <SavesForm register={register} />
      <label>
        damage_vulnerabilities
        <input {...register('damage_vulnerabilities')} />
      </label>
      <label>
        damage_resistances
        <input {...register('damage_resistances')} />
      </label>
      <label>
        damage_immunities
        <input {...register('damage_immunities')} />
      </label>
      <label>
        condition_immunities
        <input {...register('condition_immunities')} />
      </label>
      <label>
        senses
        <input {...register('senses')} />
      </label>
      <label>
        languages
        <input {...register('languages')} />
      </label>
      <label>
        cr
        <input {...register('cr')} />
      </label>
      <input type="submit" />
    </form>
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
