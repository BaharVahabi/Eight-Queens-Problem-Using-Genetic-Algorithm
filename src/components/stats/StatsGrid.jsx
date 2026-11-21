import {
  FaBullseye,
  FaClock,
  FaDna,
  FaExclamationTriangle,
} from "react-icons/fa";
import { MAX_FITNESS } from "../../ga/constants";
import { formatSeconds } from "../../utils/formatTime";
import StatCard from "./StatCard";

export default function StatsGrid({ generation, best, elapsedMs, isSolved }) {
  const fitness = best ? best.fitness : "—";
  const conflicts = best ? best.conflicts : "—";

  let conflictTone = "default";
  if (best) conflictTone = best.conflicts === 0 ? "success" : "danger";

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatCard icon={FaDna} label="Generation" value={generation} />
      <StatCard
        icon={FaBullseye}
        label="Fitness"
        value={fitness}
        suffix={`/ ${MAX_FITNESS}`}
        tone={isSolved ? "success" : "default"}
      />
      <StatCard
        icon={FaExclamationTriangle}
        label="Conflicts"
        value={conflicts}
        tone={conflictTone}
      />
      <StatCard
        icon={FaClock}
        label="Execution Time"
        value={formatSeconds(elapsedMs)}
        suffix="s"
      />
    </div>
  );
}