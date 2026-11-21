export function swapMutation(genes, mutationRate) {
  const mutated = [...genes];

  if (Math.random() < mutationRate) {
    const i = Math.floor(Math.random() * mutated.length);
    let j = Math.floor(Math.random() * mutated.length);
    while (j === i) {
      j = Math.floor(Math.random() * mutated.length);
    }
    [mutated[i], mutated[j]] = [mutated[j], mutated[i]];
  }

  return mutated;
}