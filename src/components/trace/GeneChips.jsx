const ROLE_STYLES = {
  default: "bg-slate-100 text-slate-700",
  A: "bg-purple-100 text-purple-700 ring-1 ring-purple-300",
  B: "bg-sky-100 text-sky-700 ring-1 ring-sky-300",
  swap: "bg-amber-100 text-amber-800 ring-2 ring-amber-400",
};

const SIZES = {
  sm: "h-6 w-6 text-xs",
  md: "h-7 w-7 text-sm",
};

export default function GeneChips({ genes, role = "default", roles, size = "md" }) {
  return (
    <div dir="ltr" className="flex gap-1">
      {genes.map((gene, index) => (
        <span
          key={index}
          className={`flex shrink-0 items-center justify-center rounded-md font-mono font-semibold tabular-nums ${SIZES[size]} ${
            ROLE_STYLES[roles?.[index] ?? role]
          }`}
        >
          {gene}
        </span>
      ))}
    </div>
  );
}