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
      <ul>
        {fields.map((item, index) => (
          <li key={item.id}>
            <label htmlFor={`traits-name-${index}`}>
              Name
              <input
                id={`traits-name-${index}`}
                {...register(`traits.${index}.name`)}
              />
            </label>
            <label htmlFor={`traits-description-${index}`}>
              Description
              <input
                id={`traits-description-${index}`}
                {...register(`traits.${index}.desc`)}
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
    </>
  );
}
