import { useFormContext } from 'react-hook-form';

export default function SpellcastingDescriptionForm() {
  const { register } = useFormContext();
  return (
    <>
      <h2>Description</h2>
      <form>
        <input
          id="spellcasting-description"
          {...register('spellcasting-description')}
        />
      </form>
    </>
  );
}
