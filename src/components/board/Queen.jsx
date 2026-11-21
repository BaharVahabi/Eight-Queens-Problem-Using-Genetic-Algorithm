import { motion } from "framer-motion";
import { FaChessQueen } from "react-icons/fa";
import { BOARD_SIZE } from "../../ga/constants";

const COLORS = {
  default: "text-purple-800",
  conflict: "text-red-600",
  success: "text-green-600",
};

const CELL = 100 / BOARD_SIZE;

export default function Queen({ column, row, state = "default" }) {
  const left = `${column * CELL}%`;
  const top = `${(row - 1) * CELL}%`;

  return (
    <motion.div
      className="pointer-events-none absolute flex items-center justify-center"
      style={{ width: `${CELL}%`, height: `${CELL}%` }}
      initial={{ left, top, scale: 0 }}
      animate={{ left, top, scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
    >
      <FaChessQueen
        className={`h-3/5 w-3/5 transition-colors duration-300 ${COLORS[state]}`}
      />
    </motion.div>
  );
}