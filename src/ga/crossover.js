export function randomCutPoints(size) {
  let start = Math.floor(Math.random() * size);
  let end = Math.floor(Math.random() * size);
  if (start > end) [start, end] = [end, start];
  return [start, end];
}

// بازه [start, end] از segmentParent کپی می‌شه و بقیه از fillParent پر می‌شه
export function orderCrossover(segmentParent, fillParent, start, end) {
  const size = segmentParent.length;
  const genes = new Array(size).fill(null);
  const sources = new Array(size).fill("fill");
  const used = new Set();

  for (let i = start; i <= end; i++) {
    genes[i] = segmentParent[i];
    sources[i] = "segment";
    used.add(segmentParent[i]);
  }

  let position = (end + 1) % size;
  for (let k = 0; k < size; k++) {
    const gene = fillParent[(end + 1 + k) % size];
    if (used.has(gene)) continue;

    genes[position] = gene;
    used.add(gene);
    position = (position + 1) % size;
  }

  return { genes, sources };
}

// sources هر فرزند: "A" یعنی ژن از والد اول و "B" یعنی از والد دوم
export function crossoverPair(parentA, parentB, crossoverRate) {
  if (Math.random() < crossoverRate) {
    const [start, end] = randomCutPoints(parentA.length);
    const first = orderCrossover(parentA, parentB, start, end);
    const second = orderCrossover(parentB, parentA, start, end);

    return {
      applied: true,
      start,
      end,
      children: [
        {
          genes: first.genes,
          sources: first.sources.map((s) => (s === "segment" ? "A" : "B")),
        },
        {
          genes: second.genes,
          sources: second.sources.map((s) => (s === "segment" ? "B" : "A")),
        },
      ],
    };
  }

  return {
    applied: false,
    start: null,
    end: null,
    children: [
      { genes: [...parentA], sources: parentA.map(() => "A") },
      { genes: [...parentB], sources: parentB.map(() => "B") },
    ],
  };
}