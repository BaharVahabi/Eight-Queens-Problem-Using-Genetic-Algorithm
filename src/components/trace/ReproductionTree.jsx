import { getSwapRoles } from "../../utils/geneRoles";
import GeneChips from "./GeneChips";
import FitnessTag from "./FitnessTag";

const NODE_TONES = {
  default: "border-slate-200 bg-white",
  A: "border-purple-300 bg-purple-50",
  B: "border-sky-300 bg-sky-50",
  mutated: "border-amber-300 bg-amber-50",
};

function TreeNode({ label, genes, role, roles, fitness, tone = "default", note }) {
  return (
    <div className={`min-w-0 rounded-xl border p-2 ${NODE_TONES[tone]}`}>
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <span className="truncate text-xs font-semibold text-slate-600">
          {label}
        </span>
        <FitnessTag fitness={fitness} />
      </div>
      <GeneChips genes={genes} role={role} roles={roles} size="sm" />
      {note && <p className="mt-1 text-[11px] text-slate-500">{note}</p>}
    </div>
  );
}

function Connector({ variant }) {
  const common = { strokeWidth: 2, vectorEffect: "non-scaling-stroke" };

  return (
    <svg
      className="h-8 w-full"
      viewBox="0 0 100 32"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {variant === "cross" ? (
        <>
          <line x1="25" y1="0" x2="25" y2="32" className="stroke-purple-300" {...common} />
          <line x1="25" y1="0" x2="75" y2="32" className="stroke-purple-300" {...common} />
          <line x1="75" y1="0" x2="25" y2="32" className="stroke-sky-300" {...common} />
          <line x1="75" y1="0" x2="75" y2="32" className="stroke-sky-300" {...common} />
        </>
      ) : (
        <>
          <line x1="25" y1="0" x2="25" y2="32" className="stroke-slate-300" {...common} />
          <line x1="75" y1="0" x2="75" y2="32" className="stroke-slate-300" {...common} />
        </>
      )}
    </svg>
  );
}

export default function ReproductionTree({ pairIndex, generationTrace }) {
  const selection = generationTrace.select?.items[pairIndex];
  const crossover = generationTrace.crossover?.items[pairIndex];
  const mutation = generationTrace.mutate?.items[pairIndex];

  if (!selection) return null;

  const [parentA, parentB] = selection.parents;

  return (
    <div className="min-w-0 rounded-2xl border border-slate-200 p-4">
      <h3 className="text-sm font-semibold text-slate-700">
        Reproduction Tree · Pair {pairIndex + 1}
      </h3>

      <div className="mt-3 overflow-x-auto">
        <div className="min-w-[490px]">
          <div className="grid grid-cols-2 gap-3">
            <TreeNode
              label="Parent A"
              genes={parentA.genes}
              role="A"
              fitness={parentA.fitness}
              tone="A"
            />
            <TreeNode
              label="Parent B"
              genes={parentB.genes}
              role="B"
              fitness={parentB.fitness}
              tone="B"
            />
          </div>

          {crossover && (
            <>
              <Connector variant="cross" />
              <div className="grid grid-cols-2 gap-3">
                {crossover.children.map((child, index) => (
                  <TreeNode
                    key={index}
                    label={`Child ${index + 1}`}
                    genes={child.genes}
                    roles={child.sources}
                    fitness={child.fitness}
                    note={crossover.applied ? undefined : "Copied (no crossover)"}
                  />
                ))}
              </div>
            </>
          )}

          {mutation && (
            <>
              <Connector variant="straight" />
              <div className="grid grid-cols-2 gap-3">
                {mutation.children.map((child, index) => (
                  <TreeNode
                    key={index}
                    label={`Child ${index + 1} after mutation`}
                    genes={child.after}
                    roles={child.swap ? getSwapRoles(child.after, child.swap) : undefined}
                    fitness={child.fitnessAfter}
                    tone={child.swap ? "mutated" : "default"}
                    note={
                      child.swap
                        ? `Swapped positions ${child.swap[0] + 1} and ${child.swap[1] + 1}`
                        : "No mutation"
                    }
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}