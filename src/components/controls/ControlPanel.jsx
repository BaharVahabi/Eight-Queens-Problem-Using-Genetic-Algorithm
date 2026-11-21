import { FaPlay, FaRedo, FaStop } from "react-icons/fa";
import { RUN_STATE } from "../../ga/constants";
import ControlButton from "./ControlButton";

export default function ControlPanel({ runState, onStart, onStop, onReset }) {
  const canStart =
    runState === RUN_STATE.IDLE || runState === RUN_STATE.STOPPED;
  const canStop = runState === RUN_STATE.RUNNING;
  const canReset = runState !== RUN_STATE.IDLE;

  return (
    <div className="rounded-2xl border border-purple-100 bg-white p-5 shadow-sm">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
        Controls
      </h2>
      <div className="mt-4 flex gap-3">
        <ControlButton
          icon={FaPlay}
          label="Start"
          onClick={onStart}
          disabled={!canStart}
        />
        <ControlButton
          icon={FaStop}
          label="Stop"
          variant="outline"
          onClick={onStop}
          disabled={!canStop}
        />
        <ControlButton
          icon={FaRedo}
          label="Reset"
          variant="neutral"
          onClick={onReset}
          disabled={!canReset}
        />
      </div>
    </div>
  );
}