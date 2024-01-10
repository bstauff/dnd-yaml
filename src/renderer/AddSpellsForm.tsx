import { useFieldArray, useFormContext } from 'react-hook-form';

export default function AddSpellsForm() {
  const { register, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'spells',
  });
  return (
    <>
      <h2>Spells</h2>
      <hr />
      <ul>
        {fields.map((item, index) => (
          <li key={item.id}>
            <label htmlFor={`level-${index}`}>
              Level
              <input
                id={`level-${index}`}
                {...register(`spells.${index}.level`)}
              />
            </label>
            <label htmlFor={`spell-list-${index}`}>
              Spell List
              <input
                id={`spell-list-${index}`}
                {...register(`spells.${index}.spell-list`)}
              />
            </label>
            <button type="button" onClick={() => remove(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button type="button" onClick={() => append(undefined, undefined)}>
        add
      </button>
    </>
  );
}
