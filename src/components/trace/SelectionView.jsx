import { FaTrophy } from "react-icons/fa";
import GeneChips from "./GeneChips";
import FitnessTag from "./FitnessTag";

const SIDES = [
  {
    label: "Parent A",
    role: "A",
    card: "border-purple-300 bg-purple-50",
    badge: "bg-purple-600 text-white",
  },
  {
    label: "Parent B",
    role: "B",
    card: "border-sky-300 bg-sky-50",
    badge: "bg-sky-600 text-white",
  },
];

export default function SelectionView({ item }) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">
        Tournament selection: a few random candidates compete and the one with
        the highest fitness becomes a parent.
      </p>

      {item.tournaments.map((tournament, tournamentIndex) => {
        const side = SIDES[tournamentIndex];

        return (
          <div
            key={tournamentIndex}
            className="rounded-xl border border-slate-200 p-3"
          >
            <div className="mb-2 flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-slate-700">
                Tournament {tournamentIndex + 1}
              </h3>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-semibold ${side.badge}`}
              >
                Winner → {side.label}
              </span>
            </div>

            <ul className="space-y-1.5">
              {tournament.candidates.map((candidate, candidateIndex) => {
                const isWinner = candidateIndex === tournament.winnerIndex;

                return (
                  <li
                    key={candidateIndex}
                    className={`flex flex-wrap items-center justify-between gap-2 rounded-lg border px-2 py-1.5 ${
                      isWinner ? side.card : "border-slate-100"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">
                        C{candidateIndex + 1}
                      </span>
                      <GeneChips
                        genes={candidate.genes}
                        size="sm"
                        role={isWinner ? side.role : "default"}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      {isWinner && (
                        <FaTrophy
                          className="text-amber-500"
                          aria-label="Winner"
                        />
                      )}
                      <FitnessTag fitness={candidate.fitness} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}