import { useFieldArray, useFormContext } from 'react-hook-form';

export default function SavesForm() {
  const { register, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'saves',
  });

  return (
    <>
      <h1>Saves</h1>
      <hr />
      <ul>
        {fields.map((item, index) => (
          <li key={item.id}>
            <label htmlFor={`ability-${index}`}>
              Ability
              <input
                id={`ability-${index}`}
                {...register(`saves.${index}.ability`)}
              />
            </label>
            <label htmlFor={`modifier-${index}`}>
              Mod
              <input
                id={`modifier-${index}`}
                {...register(`saves.${index}.modifier`)}
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
