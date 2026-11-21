import { FaProjectDiagram } from "react-icons/fa";
import { MODE, TRACE } from "../../ga/constants";
import StageStepper from "./StageStepper";
import GeneChips from "./GeneChips";
import EvaluationView from "./EvaluationView";
import SelectionView from "./SelectionView";
import CrossoverView from "./CrossoverView";
import MutationView from "./MutationView";
import NextGenerationView from "./NextGenerationView";
import ReproductionTree from "./ReproductionTree";

const PANEL_CLASS =
  "rounded-3xl border border-purple-100 bg-white p-4 shadow-xs sm:p-6";

function Heading({ subtitle }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
        <FaProjectDiagram aria-hidden="true" />
      </div>
      <div>
        <h2 className="text-lg font-bold text-slate-800">Step Inspector</h2>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>
    </div>
  );
}

function GenerateSummary({ item }) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-600">
        {item.size} random chromosomes were created. Each one is a shuffled
        permutation of 1 to 8, so no two queens share a row or a column.
      </p>
      <ul className="space-y-1.5">
        {item.samples.map((genes, index) => (
          <li key={index} className="rounded-lg border border-slate-100 px-2 py-1.5">
            <GeneChips genes={genes} size="sm" />
          </li>
        ))}
      </ul>
      <p className="text-xs text-slate-400">
        Showing {item.samples.length} of {item.size} chromosomes.
      </p>
    </div>
  );
}

function renderStageView(stageTrace, item) {
  switch (stageTrace.type) {
    case TRACE.GENERATE:
      return <GenerateSummary item={item} />;
    case TRACE.EVALUATE:
      return <EvaluationView item={item} />;
    case TRACE.SELECT:
      return <SelectionView item={item} />;
    case TRACE.CROSSOVER:
      return <CrossoverView item={item} />;
    case TRACE.MUTATE:
      return item.kind === "nextGeneration" ? (
        <NextGenerationView item={item} generation={stageTrace.generation} />
      ) : (
        <MutationView item={item} />
      );
    default:
      return null;
  }
}

export default function StepInspector({ mode, stageTrace, generationTrace, cursor }) {
  if (!stageTrace) {
    return (
      <section className={PANEL_CLASS}>
        <Heading subtitle="See how chromosomes evolve, one step at a time." />
        <p className="mt-6 text-sm text-slate-400">
          Press Start to watch chromosomes being selected, crossed over and
          mutated.
        </p>
      </section>
    );
  }

  const total = stageTrace.items.length;
  const focusIndex = mode === MODE.STEP ? Math.max(cursor - 1, 0) : 0;
  const item = stageTrace.items[focusIndex];
  const isNextGeneration =
    stageTrace.type === TRACE.MUTATE && item.kind === "nextGeneration";
  const activeKey = isNextGeneration ? "nextGeneration" : stageTrace.type;
  const hasPair = item.pairIndex !== undefined;

  const subtitle =
    stageTrace.generation === 0
      ? "Initial population"
      : `Generation ${stageTrace.generation}`;

  return (
    <section className={PANEL_CLASS}>
      <Heading subtitle={subtitle} />

      <div className="mt-5">
        <StageStepper activeKey={activeKey} />
      </div>

      {mode === MODE.STEP ? (
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>
              Step {focusIndex + 1} of {total} in this stage
            </span>
            {hasPair && <span>Pair {item.pairIndex + 1}</span>}
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-purple-500 transition-all duration-300"
              style={{ width: `${((focusIndex + 1) / total) * 100}%` }}
            />
          </div>
        </div>
      ) : (
        <p className="mt-4 text-xs text-slate-500">
          Auto Run shows a sample (the first pair) of each stage. Switch to Step
          by Step to walk through every pair.
        </p>
      )}

      <div className={`mt-6 grid gap-6 ${hasPair ? "xl:grid-cols-2" : ""}`}>
        <div className="min-w-0">{renderStageView(stageTrace, item)}</div>
        {hasPair && (
          <ReproductionTree
            pairIndex={item.pairIndex}
            generationTrace={generationTrace}
          />
        )}
      </div>
    </section>
  );
}