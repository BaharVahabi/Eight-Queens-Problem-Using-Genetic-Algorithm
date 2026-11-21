import { FaChessQueen } from "react-icons/fa";

export default function Header() {
  return (
    <header className="flex items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-600 text-2xl text-white shadow-sm">
        <FaChessQueen aria-hidden="true" />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Eight Queens · Genetic Algorithm
        </h1>
        <p className="text-sm text-slate-500">
          Watch the population evolve toward a valid solution.
        </p>
      </div>
    </header>
  );
}