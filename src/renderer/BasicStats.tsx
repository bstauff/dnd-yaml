import { useFormContext } from 'react-hook-form';

export default function BasicStats() {
  const { register } = useFormContext();
  return (
    <>
      <h1>Basic Stats</h1>
      <hr />
      <label htmlFor="name">
        Name
        <input id="name" {...register('name')} tabIndex={0} />
      </label>
      <label htmlFor="size">
        Size
        <input id="size" {...register('size')} />
      </label>
      <label htmlFor="type">
        Type
        <input id="type" {...register('type')} />
      </label>
      <label htmlFor="alignment">
        alignment
        <input id="alignment" {...register('alignment')} />
      </label>
      <label htmlFor="ac">
        ac
        <input id="ac" {...register('ac')} />
      </label>
      <label htmlFor="hp">
        hp
        <input id="hp" {...register('hp')} />
      </label>
      <label htmlFor="hit_dice">
        hit_dice
        <input id="hit_dice" {...register('hit_dice')} />
      </label>
      <label htmlFor="speed">
        speed
        <input id="speed" {...register('speed')} />
      </label>
    </>
  );
}
