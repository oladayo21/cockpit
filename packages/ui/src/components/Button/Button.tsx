type ButtonProps = {
  name: string;
};
export default function CockpitButton({ name }: ButtonProps) {
  const handleClick = () => console.log(`${name} was clicked`);
  return (
    <>
      <button onClick={handleClick}>{name}</button>
      <p>{name}</p>
    </>
  );
}
