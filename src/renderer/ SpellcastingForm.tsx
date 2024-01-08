import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import AddSpellsForm from './AddSpellsForm';
import SpellcastingDescriptionForm from './SpellcastingDescriptionForm';

export default function SpellcastingForm() {
  const [useSpellCasting, setUseSpellCasting] = useState(false);
  const { unregister } = useFormContext();
  return (
    <>
      <h1>Spellcasting</h1>
      <hr />
      {useSpellCasting ? (
        <>
          <SpellcastingDescriptionForm />
          <AddSpellsForm />
          <button
            type="button"
            onClick={() => {
              setUseSpellCasting(false);
              unregister('spellcasting-description');
              unregister('spells');
            }}
          >
            Remove Spellcasting
          </button>
        </>
      ) : (
        <p>not using spellcasting</p>
      )}
      <button type="button" onClick={() => setUseSpellCasting(true)}>
        Add Spellcasting
      </button>
    </>
  );
}
