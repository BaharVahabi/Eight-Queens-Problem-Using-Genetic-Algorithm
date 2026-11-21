export function swapMutation(genes, mutationRate) {
  const mutated = [...genes];

  if (Math.random() >= mutationRate) {
    return { genes: mutated, swap: null };
  }

  const i = Math.floor(Math.random() * mutated.length);
  let j = Math.floor(Math.random() * mutated.length);
  while (j === i) {
    j = Math.floor(Math.random() * mutated.length);
  }

  [mutated[i], mutated[j]] = [mutated[j], mutated[i]];

  return { genes: mutated, swap: [Math.min(i, j), Math.max(i, j)] };
}