import ChromosomeRow from "./ChromosomeRow";

export default function PopulationPanel({ chromosomes }) {
  return (
    <div className="rounded-2xl border border-purple-100 bg-white p-5 shadow-sm">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
        Top 4 Chromosomes
      </h2>

      {chromosomes.length === 0 ? (
        <p className="mt-4 text-sm text-slate-400">
          Press Start to generate the first population.
        </p>
      ) : (
        <ul className="mt-4 flex flex-col gap-2">
          {chromosomes.map((individual, index) => (
            <ChromosomeRow
              key={index}
              rank={index + 1}
              genes={individual.genes}
              fitness={individual.fitness}
              isBest={index === 0}
            />
          ))}
        </ul>
      )}
    </div>
  );
}