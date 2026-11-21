import { FaFastForward, FaPause, FaPlay, FaStepForward } from "react-icons/fa";
import { RUN_STATE, STEP_SPEEDS } from "../../ga/constants";
import ControlButton from "./ControlButton";

const HINTS = {
  [RUN_STATE.IDLE]:
    "Press Start to generate the first population, then step through the algorithm.",
  [RUN_STATE.STOPPED]: "Press Start to resume stepping.",
  [RUN_STATE.SOLVED]: "A solution was found. Press Reset to run again.",
  [RUN_STATE.MAX_REACHED]:
    "The generation limit was reached. Press Reset to run again.",
};

export default function StepControls({
  runState,
  canStep,
  canSkip,
  autoplay,
  speed,
  onNext,
  onSkip,
  onToggleAutoplay,
  onSpeedChange,
}) {
  const hint = HINTS[runState];

  return (
    <div className="rounded-2xl border border-purple-100 bg-white p-5 shadow-xs">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
        Step Controls
      </h2>

      <div className="mt-4 flex gap-3">
        <ControlButton
          icon={FaStepForward}
          label="Next Step"
          onClick={onNext}
          disabled={!canStep || autoplay}
        />
        <ControlButton
          icon={FaFastForward}
          label="Skip Stage"
          variant="outline"
          onClick={onSkip}
          disabled={!canSkip || autoplay}
        />
      </div>

      <div className="mt-3 flex items-center gap-3">
        <ControlButton
          icon={autoplay ? FaPause : FaPlay}
          label={autoplay ? "Pause" : "Auto-play"}
          variant="neutral"
          onClick={onToggleAutoplay}
          disabled={!canStep}
        />
        <label className="flex items-center gap-2 text-sm text-slate-500">
          Speed
          <select
            value={speed}
            onChange={(event) => onSpeedChange(event.target.value)}
            className="rounded-lg border border-slate-200 bg-white px-2 py-2 text-sm text-slate-700"
          >
            {Object.entries(STEP_SPEEDS).map(([key, { label }]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {hint && <p className="mt-3 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}