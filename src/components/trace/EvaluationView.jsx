import { MAX_FITNESS } from "../../ga/constants";
import GeneChips from "./GeneChips";
import FitnessTag from "./FitnessTag";

function Stat({ label, value }) {
  return (
    <div className="rounded-lg bg-slate-50 px-3 py-2">
      <dt className="text-xs text-slate-500">{label}</dt>
      <dd className="font-bold tabular-nums text-slate-800">{value}</dd>
    </div>
  );
}

export default function EvaluationView({ item }) {
  const { individuals, average } = item;
  const best = individuals[0];

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">
        Each chromosome gets a fitness of {MAX_FITNESS} − conflicts, then the
        population is sorted from best to worst.
      </p>

      <dl className="grid grid-cols-3 gap-3 text-sm">
        <Stat label="Population" value={individuals.length} />
        <Stat label="Best fitness" value={`${best.fitness}/${MAX_FITNESS}`} />
        <Stat label="Average fitness" value={average.toFixed(2)} />
      </dl>

      <ul className="max-h-72 space-y-1.5 overflow-y-auto pr-1">
        {individuals.map((individual, index) => (
          <li
            key={index}
            className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg border border-slate-100 px-2 py-1.5"
          >
            <span className="w-6 text-xs font-semibold text-slate-400">
              #{index + 1}
            </span>
            <GeneChips genes={individual.genes} size="sm" />
            <div className="h-2 min-w-[3rem] flex-1 basis-24 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-purple-400"
                style={{ width: `${(individual.fitness / MAX_FITNESS) * 100}%` }}
              />
            </div>
            <FitnessTag fitness={individual.fitness} />
          </li>
        ))}
      </ul>
    </div>
  );
}