import GeneChips from "./GeneChips";
import FitnessTag from "./FitnessTag";

function ChromosomeList({ items, highlight = false }) {
  return (
    <ul className="max-h-56 space-y-1.5 overflow-y-auto pr-1">
      {items.map((individual, index) => (
        <li
          key={index}
          className={`flex flex-wrap items-center justify-between gap-2 rounded-lg border px-2 py-1.5 ${
            highlight
              ? "border-purple-300 bg-purple-50"
              : "border-slate-100 bg-white"
          }`}
        >
          <GeneChips genes={individual.genes} size="sm" />
          <FitnessTag fitness={individual.fitness} />
        </li>
      ))}
    </ul>
  );
}

export default function NextGenerationView({ item, generation }) {
  const { elites, offspring } = item;

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">
        Elitism keeps the best chromosomes unchanged, and the mutated offspring
        fill the rest of the population. Together they form generation{" "}
        {generation + 1}.
      </p>

      <p className="text-sm font-semibold text-slate-700">
        {elites.length} elites + {offspring.length} offspring ={" "}
        {elites.length + offspring.length} chromosomes
      </p>

      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Elites (kept unchanged)
        </h3>
        <ChromosomeList items={elites} highlight />
      </div>

      <div>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Offspring (after crossover and mutation)
        </h3>
        <ChromosomeList items={offspring} />
      </div>
    </div>
  );
}