export function orderCrossover(parentA, parentB) {
  const size = parentA.length;

  let start = Math.floor(Math.random() * size);
  let end = Math.floor(Math.random() * size);
  if (start > end) [start, end] = [end, start];

  const child = new Array(size).fill(null);
  const used = new Set();

  for (let i = start; i <= end; i++) {
    child[i] = parentA[i];
    used.add(parentA[i]);
  }

  let position = (end + 1) % size;
  for (let k = 0; k < size; k++) {
    const gene = parentB[(end + 1 + k) % size];
    if (used.has(gene)) continue;

    child[position] = gene;
    used.add(gene);
    position = (position + 1) % size;
  }

  return child;
}

export function crossoverPair(parentA, parentB, crossoverRate) {
  if (Math.random() < crossoverRate) {
    return [orderCrossover(parentA, parentB), orderCrossover(parentB, parentA)];
  }
  return [[...parentA], [...parentB]];
}