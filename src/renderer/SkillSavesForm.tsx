import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

export default function SkillSavesForm() {
  const { register, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skillSaves',
  });

  return (
    <>
      <h1>Skill Saves</h1>
      <hr />
      <form>
        <ul>
          {fields.map((item, index) => (
            <li key={item.id}>
              <label htmlFor={`skill-${index}`}>
                Skill
                <input
                  id={`skill-${index}`}
                  {...register(`skillSaves.${index}.skill`)}
                />
              </label>
              <label htmlFor={`modifier-${index}`}>
                Mod
                <input
                  id={`modifier-${index}`}
                  {...register(`skillSaves.${index}.modifier`)}
                />
              </label>
              <button type="button" onClick={() => remove(index)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
        <button type="button" onClick={() => append(undefined, undefined)}>
          add skill save
        </button>
      </form>
    </>
  );
}
