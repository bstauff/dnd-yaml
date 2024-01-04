import { useFormContext } from 'react-hook-form';

export default function AbilityScores() {
  const { register } = useFormContext();
  return (
    <>
      <h1>Ability Scores</h1>
      <hr />
      <label htmlFor="stats">
        stats
        <input id="stats" {...register('stats')} />
      </label>
    </>
  );
}
