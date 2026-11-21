export default function Square({ isLight, state = "default" }) {
  let background = isLight ? "bg-amber-50" : "bg-purple-200";
  if (state === "conflict") background = "bg-red-200";
  if (state === "success") background = "bg-green-200";

  return <div className={`${background} transition-colors duration-300`} />;
}