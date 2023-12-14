/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  bestiaryDirectory: string;
  name: string;
  size: string;
  type: string;
};

function createFile(data: Inputs) {
  console.log('sending...');
  window.electron.ipcRenderer.sendMessage('write-yaml', [data]);
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
