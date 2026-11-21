import { RUN_STATE } from "../../ga/constants";

function getDisplay(runState, status) {
  switch (runState) {
    case RUN_STATE.IDLE:
      return { label: "Ready", dot: "bg-slate-300", pulse: false };
    case RUN_STATE.STOPPED:
      return { label: "Stopped", dot: "bg-amber-400", pulse: false };
    case RUN_STATE.SOLVED:
      return { label: "Solution Found", dot: "bg-green-500", pulse: false };
    case RUN_STATE.MAX_REACHED:
      return {
        label: "Maximum Generations Reached",
        dot: "bg-red-500",
        pulse: false,
      };
    default:
      return {
        label: status ?? "Starting...",
        dot: "bg-purple-500",
        pulse: true,
      };
  }
}

export default function StatusIndicator({ runState, status }) {
  const { label, dot, pulse } = getDisplay(runState, status);

  return (
    <div className="rounded-2xl border border-purple-100 bg-white p-5 shadow-sm">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
        Status
      </h2>
      <div className="mt-4 flex items-center gap-3" aria-live="polite">
        <span className="relative flex h-3 w-3">
          {pulse && (
            <span
              className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${dot}`}
            />
          )}
          <span className={`relative inline-flex h-3 w-3 rounded-full ${dot}`} />
        </span>
        <span className="text-lg font-semibold text-slate-800">{label}</span>
      </div>
    </div>
  );
}