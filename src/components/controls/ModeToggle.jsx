import { FaBolt, FaListOl } from "react-icons/fa";
import { MODE } from "../../ga/constants";

const OPTIONS = [
  { value: MODE.AUTO, label: "Auto Run", icon: FaBolt },
  { value: MODE.STEP, label: "Step by Step", icon: FaListOl },
];

export default function ModeToggle({ mode, onChange }) {
  return (
    <div className="rounded-2xl border border-purple-100 bg-white p-5 shadow-xs">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
        Mode
      </h2>
      <div
        role="group"
        aria-label="Execution mode"
        className="mt-4 grid grid-cols-2 gap-1 rounded-xl bg-slate-100 p-1"
      >
        {OPTIONS.map(({ value, label, icon: Icon }) => {
          const active = mode === value;

          return (
            <button
              key={value}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(value)}
              className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                active
                  ? "bg-white text-purple-700 shadow-xs"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Icon aria-hidden="true" />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}