const TONES = {
  default: "text-slate-800",
  success: "text-green-600",
  danger: "text-red-600",
};

export default function StatCard({
  icon: Icon,
  label,
  value,
  suffix,
  tone = "default",
}) {
  return (
    <div className="rounded-2xl border border-purple-100 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
        <Icon className="text-purple-500" aria-hidden="true" />
        {label}
      </div>
      <p className={`mt-2 text-3xl font-bold tabular-nums ${TONES[tone]}`}>
        {value}
        {suffix && (
          <span className="ml-1 text-base font-medium text-slate-400">
            {suffix}
          </span>
        )}
      </p>
    </div>
  );
}