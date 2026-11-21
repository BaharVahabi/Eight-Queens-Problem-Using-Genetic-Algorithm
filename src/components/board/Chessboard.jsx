import { useMemo } from "react";
import { BOARD_SIZE } from "../../ga/constants";
import { getConflictingColumns } from "../../ga/fitness";
import Square from "./Square";
import Queen from "./Queen";

export default function Chessboard({ chromosome, isSolved }) {
  const conflictColumns = useMemo(
    () => (chromosome ? getConflictingColumns(chromosome) : new Set()),
    [chromosome]
  );

  const getQueenState = (column) => {
    if (isSolved) return "success";
    return conflictColumns.has(column) ? "conflict" : "default";
  };

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px] overflow-hidden rounded-2xl border-4 border-purple-300 shadow-lg">
      <div className="grid h-full w-full grid-cols-8 grid-rows-8">
        {Array.from({ length: BOARD_SIZE * BOARD_SIZE }, (_, index) => {
          const row = Math.floor(index / BOARD_SIZE);
          const column = index % BOARD_SIZE;
          const hasQueen = chromosome && chromosome[column] - 1 === row;

          return (
            <Square
              key={index}
              isLight={(row + column) % 2 === 0}
              state={hasQueen ? getQueenState(column) : "default"}
            />
          );
        })}
      </div>

      {chromosome &&
        chromosome.map((row, column) => (
          <Queen
            key={column}
            column={column}
            row={row}
            state={getQueenState(column)}
          />
        ))}
    </div>
  );
}