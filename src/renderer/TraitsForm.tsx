import { useFieldArray, useFormContext } from 'react-hook-form';

export default function TraitsForm() {
  const { register, control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'traits',
  });

  return (
    <>
      <h1>Traits</h1>
      <hr />
      <form>
        <ul>
          {fields.map((item, index) => (
            <li key={item.id}>
              <label htmlFor={`trait-name-${index}`}>
                Name
                <input
                  id={`trait-name-${index}`}
                  {...register(`traits.${index}.name`)}
                />
              </label>
              <label htmlFor={`trait-description-${index}`}>
                Description
                <input
                  id={`trait-description-${index}`}
                  {...register(`traits.${index}.description`)}
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
