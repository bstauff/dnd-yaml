import { useFieldArray, useFormContext } from 'react-hook-form';

export default function ReactionsForm() {
  const { register, control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'reactions',
  });

  return (
    <>
      <h1>Reactions</h1>
      <hr />
      <form>
        <ul>
          {fields.map((item, index) => (
            <li key={item.id}>
              <label htmlFor={`reactions-name-${index}`}>
                Name
                <input
                  id={`reactions-name-${index}`}
                  {...register(`reactions.${index}.name`)}
                />
              </label>
              <label htmlFor={`reactions-description-${index}`}>
                Description
                <input
                  id={`reactions-description-${index}`}
                  {...register(`reactions.${index}.desc`)}
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
