import { useFieldArray, useFormContext } from 'react-hook-form';

export default function LegendaryActionsForm() {
  const { register, control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'legendaryActions',
  });

  return (
    <>
      <h1>Legendary Actions</h1>
      <hr />
      <form>
        <ul>
          {fields.map((item, index) => (
            <li key={item.id}>
              <label htmlFor={`legendaryActions-name-${index}`}>
                Name
                <input
                  id={`legendaryActions-name-${index}`}
                  {...register(`legendaryActions.${index}.name`)}
                />
              </label>
              <label htmlFor={`legendaryActions-description-${index}`}>
                Description
                <input
                  id={`legendaryActions-description-${index}`}
                  {...register(`legendaryActions.${index}.desc`)}
                />
              </label>
              <button type="button" onClick={() => remove(index)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
        <button type="button" onClick={() => append(undefined, undefined)}>
          Add
        </button>
      </form>
    </>
  );
}
