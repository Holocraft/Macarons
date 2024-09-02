type ButtonProps = {
  label: string;
  eventFunction?: () => void;
};

export default function Button({ eventFunction, label }: ButtonProps) {
  return <button onClick={() => eventFunction}>{label}</button>;
}
