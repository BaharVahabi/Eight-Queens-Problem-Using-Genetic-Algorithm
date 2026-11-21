import GeneChips from "./GeneChips";
import FitnessTag from "./FitnessTag";

// نوار زیر ژن‌ها که بازه‌ی برش OX رو نشون می‌ده
function SegmentMarker({ start, end, size }) {
  return (
    <div dir="ltr" className="mt-1 flex gap-1">
      {Array.from({ length: size }, (_, index) => (
        <span
          key={index}
          className={`h-1 w-7 rounded-full ${
            index >= start && index <= end ? "bg-slate-500" : "bg-transparent"
          }`}
        />
      ))}
    </div>
  );
}

function Row({ label, children, fitness }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-2">
      <div>
        <p className="mb-1 text-xs font-semibold text-slate-500">{label}</p>
        {children}
      </div>
      {fitness !== undefined && <FitnessTag fitness={fitness} />}
    </div>
  );
}

const CHILD_CAPTIONS = [
  "Child 1 · segment from Parent A, rest from Parent B",
  "Child 2 · segment from Parent B, rest from Parent A",
];

export default function CrossoverView({ item }) {
  const { parents, applied, start, end, children } = item;
  const [parentA, parentB] = parents;
  const size = parentA.genes.length;

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-600">
        Order Crossover (OX): a random segment is copied from one parent, and
        the remaining genes are filled in the order they appear in the other
        parent, so every child stays a valid permutation.
      </p>

      <div className="space-y-3 rounded-xl border border-slate-200 p-3">
        <Row label="Parent A" fitness={parentA.fitness}>
          <GeneChips genes={parentA.genes} role="A" />
          {applied && <SegmentMarker start={start} end={end} size={size} />}
        </Row>
        <Row label="Parent B" fitness={parentB.fitness}>
          <GeneChips genes={parentB.genes} role="B" />
          {applied && <SegmentMarker start={start} end={end} size={size} />}
        </Row>
        <p className="text-xs text-slate-500">
          {applied
            ? `Cut segment: positions ${start + 1}–${end + 1}`
            : "Crossover was skipped for this pair, so the children are copies of the parents."}
        </p>
      </div>

      <div className="space-y-3 rounded-xl border border-slate-200 p-3">
        {children.map((child, index) => (
          <Row key={index} label={CHILD_CAPTIONS[index]} fitness={child.fitness}>
            <GeneChips genes={child.genes} roles={child.sources} />
          </Row>
        ))}
        <p className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
          <span>
            <span className="mr-1 inline-block h-2 w-2 rounded-full bg-purple-400" />
            from Parent A
          </span>
          <span>
            <span className="mr-1 inline-block h-2 w-2 rounded-full bg-sky-400" />
            from Parent B
          </span>
        </p>
      </div>
    </div>
  );
}