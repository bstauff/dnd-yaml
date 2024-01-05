import { useFieldArray, useFormContext } from 'react-hook-form';

export default function BonusActionsForm() {
  const { register, control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'bonus-actions',
  });

  return (
    <>
      <h1>Bonus Actions</h1>
      <hr />
      <form>
        <ul>
          {fields.map((item, index) => (
            <li key={item.id}>
              <label htmlFor={`bonus-actions-name-${index}`}>
                Name
                <input
                  id={`bonus-actions-name-${index}`}
                  {...register(`bonus-actions.${index}.name`)}
                />
              </label>
              <label htmlFor={`bonus-actions-description-${index}`}>
                Description
                <input
                  id={`bonus-actions-description-${index}`}
                  {...register(`bonus-actions.${index}.desc`)}
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
