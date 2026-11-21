import { motion } from "framer-motion";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { GA_CONFIG, MAX_FITNESS, RUN_STATE } from "../../ga/constants";
import { formatSeconds } from "../../utils/formatTime";

function Detail({ label, value }) {
  return (
    <div className="rounded-lg bg-white/70 px-3 py-2">
      <dt className="text-xs text-slate-500">{label}</dt>
      <dd className="font-bold tabular-nums text-slate-800">{value}</dd>
    </div>
  );
}

export default function ResultBanner({ runState, generation, elapsedMs, best }) {
  if (runState === RUN_STATE.SOLVED) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-green-200 bg-green-50 p-5"
      >
        <div className="flex items-center gap-2 text-green-700">
          <FaCheckCircle aria-hidden="true" />
          <h2 className="text-lg font-bold">Solution Found</h2>
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <Detail label="Generations" value={generation} />
          <Detail label="Execution Time" value={`${formatSeconds(elapsedMs)} s`} />
          <Detail label="Conflicts" value={0} />
          <Detail label="Fitness" value={`${MAX_FITNESS}/${MAX_FITNESS}`} />
        </dl>
      </motion.div>
    );
  }

  if (runState === RUN_STATE.MAX_REACHED) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-red-200 bg-red-50 p-5"
      >
        <div className="flex items-center gap-2 text-red-700">
          <FaExclamationCircle aria-hidden="true" />
          <h2 className="text-lg font-bold">No Solution Found</h2>
        </div>
        <p className="mt-3 text-sm text-slate-700">
          The maximum limit of {GA_CONFIG.maxGenerations} generations was
          reached. Best fitness: {best ? best.fitness : "—"}/{MAX_FITNESS}.
          Press Reset to try again.
        </p>
      </motion.div>
    );
  }

  return null;
}