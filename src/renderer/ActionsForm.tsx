import { useFieldArray, useFormContext } from 'react-hook-form';

export default function ActionsForm() {
  const { register, control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'actions',
  });

  return (
    <>
      <h1>Actions</h1>
      <hr />
      <ul>
        {fields.map((item, index) => (
          <li key={item.id}>
            <label htmlFor={`action-name-${index}`}>
              Name
              <input
                id={`action-name-${index}`}
                {...register(`actions.${index}.name`)}
              />
            </label>
            <label htmlFor={`action-description-${index}`}>
              Description
              <input
                id={`action-description-${index}`}
                {...register(`actions.${index}.desc`)}
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
