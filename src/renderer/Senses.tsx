import { useFormContext } from 'react-hook-form';

export default function Senses() {
  const { register } = useFormContext();
  return (
    <>
      <h1>Senses</h1>
      <label htmlFor="senses">
        senses
        <input id="senses" {...register('senses')} />
      </label>
      <label htmlFor="senses">
        languages
        <input id="senses" {...register('languages')} />
      </label>
      <label htmlFor="cr">
        cr
        <input id="cr" {...register('cr')} />
      </label>
    </>
  );
}
