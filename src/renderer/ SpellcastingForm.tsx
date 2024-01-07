import { useState } from 'react';
import AddSpellsForm from './AddSpellsForm';
import SpellcastingDescriptionForm from './SpellcastingDescriptionForm';

export default function SpellcastingForm() {
  const [useSpellCasting, setUseSpellCasting] = useState(false);
  return (
    <>
      <h1>Spellcasting</h1>
      <hr />
      {useSpellCasting ? (
        <>
          <SpellcastingDescriptionForm />
          <AddSpellsForm />
          <button type="button" onClick={() => setUseSpellCasting(false)}>
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
