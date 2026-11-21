const STAGES = [
  { key: "generate", label: "Generate" },
  { key: "evaluate", label: "Evaluate" },
  { key: "select", label: "Select" },
  { key: "crossover", label: "Crossover" },
  { key: "mutate", label: "Mutate" },
  { key: "nextGeneration", label: "Next Gen" },
];

const PILL_STYLES = {
  done: "bg-green-100 text-green-700",
  active: "bg-purple-600 text-white",
  todo: "bg-slate-100 text-slate-400",
};

export default function StageStepper({ activeKey }) {
  const activeIndex = STAGES.findIndex((stage) => stage.key === activeKey);

  return (
    <ol className="flex flex-wrap items-center gap-2" aria-label="Algorithm stages">
      {STAGES.map((stage, index) => {
        const state =
          index < activeIndex ? "done" : index === activeIndex ? "active" : "todo";

        return (
          <li
            key={stage.key}
            aria-current={state === "active" ? "step" : undefined}
            className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${PILL_STYLES[state]}`}
          >
            <span className="tabular-nums">{index + 1}</span>
            {stage.label}
          </li>
        );
      })}
    </ol>
  );
}