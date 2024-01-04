import { useFormContext } from 'react-hook-form';

export default function Resistances() {
  const { register } = useFormContext();
  return (
    <>
      <h1>Resistances</h1>
      <hr />
      <label htmlFor="damage-vulnerability">
        damage_vulnerabilities
        <input
          id="damage-vulnerability"
          {...register('damage_vulnerabilities')}
        />
      </label>
      <label htmlFor="damage-resistance">
        damage_resistances
        <input id="damage-resistance" {...register('damage_resistances')} />
      </label>
      <label htmlFor="damage-immunities">
        damage_immunities
        <input id="damage-immunities" {...register('damage_immunities')} />
      </label>
      <label htmlFor="condition-immunities">
        condition_immunities
        <input
          id="condition-immunities"
          {...register('condition_immunities')}
        />
      </label>
    </>
  );
}
