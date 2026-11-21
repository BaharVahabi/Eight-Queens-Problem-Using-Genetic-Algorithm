import { MAX_FITNESS } from "../../ga/constants";

export default function ChromosomeRow({ genes, fitness, rank, isBest }) {
  return (
    <li
      className={`flex items-center justify-between gap-3 rounded-xl border px-3 py-2 ${
        isBest
          ? "border-purple-400 bg-purple-50 ring-1 ring-purple-300"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex min-w-0 items-center gap-2">
        <span className="text-xs font-semibold text-slate-400">#{rank}</span>
        <code
          dir="ltr"
          className="truncate font-mono text-sm tracking-wide text-slate-700"
        >
          [{genes.join(", ")}]
        </code>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {isBest && (
          <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-semibold text-purple-700">
            Best
          </span>
        )}
        <span
          className={`rounded-lg px-2 py-1 text-xs font-bold tabular-nums ${
            isBest ? "bg-purple-600 text-white" : "bg-slate-100 text-slate-600"
          }`}
        >
          {fitness}/{MAX_FITNESS}
        </span>
      </div>
    </li>
  );
}