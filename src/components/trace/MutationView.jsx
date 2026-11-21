import { GA_CONFIG } from "../../ga/constants";
import { getSwapRoles } from "../../utils/geneRoles";
import GeneChips from "./GeneChips";
import FitnessTag from "./FitnessTag";

function Row({ label, genes, roles, fitness }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
      <span className="w-16 text-xs font-semibold text-slate-500">{label}</span>
      <GeneChips genes={genes} roles={roles} />
      <FitnessTag fitness={fitness} />
    </div>
  );
}

function FitnessChange({ before, after }) {
  const delta = after - before;
  const tone =
    delta > 0 ? "text-green-600" : delta < 0 ? "text-red-600" : "text-slate-500";

  return (
    <span className={`text-xs font-semibold tabular-nums ${tone}`}>
      Fitness {before} → {after} ({delta > 0 ? "+" : ""}
      {delta})
    </span>
  );
}

export default function MutationView({ item }) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">
        Swap Mutation: with a {Math.round(GA_CONFIG.mutationRate * 100)}% chance
        two random genes of a child swap places, which keeps it a valid
        permutation.
      </p>

      {item.children.map((child, index) => {
        const roles = getSwapRoles(child.before, child.swap);

        return (
          <div key={index} className="rounded-xl border border-slate-200 p-3">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-slate-700">
                Child {index + 1}
              </h3>
              {child.swap ? (
                <FitnessChange
                  before={child.fitnessBefore}
                  after={child.fitnessAfter}
                />
              ) : (
                <span className="text-xs font-semibold text-slate-400">
                  No mutation
                </span>
              )}
            </div>

            {child.swap ? (
              <div className="space-y-2">
                <Row
                  label="Before"
                  genes={child.before}
                  roles={roles}
                  fitness={child.fitnessBefore}
                />
                <Row
                  label="After"
                  genes={child.after}
                  roles={roles}
                  fitness={child.fitnessAfter}
                />
                <p className="text-xs text-slate-500">
                  Genes at positions {child.swap[0] + 1} and {child.swap[1] + 1}{" "}
                  were swapped.
                </p>
              </div>
            ) : (
              <Row
                label="Unchanged"
                genes={child.after}
                fitness={child.fitnessAfter}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}