export default function SavesForm({ register }) {
  return (
    <label>
      saves.Str
      <input {...register('saves.Str')} />
    </label>
  );
}
