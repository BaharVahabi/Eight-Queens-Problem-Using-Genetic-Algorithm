import { MAX_FITNESS } from "../../ga/constants";

export default function FitnessTag({ fitness }) {
  const tone =
    fitness === MAX_FITNESS
      ? "bg-green-100 text-green-700"
      : "bg-slate-100 text-slate-600";

  return (
    <span
      className={`shrink-0 rounded-lg px-2 py-0.5 text-xs font-bold tabular-nums ${tone}`}
    >
      {fitness}/{MAX_FITNESS}
    </span>
  );
}