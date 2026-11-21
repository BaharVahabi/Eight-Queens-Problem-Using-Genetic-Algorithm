const VARIANTS = {
  primary:
    "bg-purple-600 text-white hover:bg-purple-700 disabled:hover:bg-purple-600",
  outline:
    "border border-purple-300 bg-white text-purple-700 hover:bg-purple-50 disabled:hover:bg-white",
  neutral:
    "bg-slate-100 text-slate-700 hover:bg-slate-200 disabled:hover:bg-slate-100",
};

export default function ControlButton({
  icon: Icon,
  label,
  onClick,
  disabled,
  variant = "primary",
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-40 ${VARIANTS[variant]}`}
    >
      <Icon aria-hidden="true" />
      {label}
    </button>
  );
}