import { BOARD_SIZE } from "./constants";

export function createRandomChromosome(size = BOARD_SIZE) {
  const genes = Array.from({ length: size }, (_, i) => i + 1);

  for (let i = size - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [genes[i], genes[j]] = [genes[j], genes[i]];
  }

  return genes;
}

export function createPopulation(populationSize) {
  return Array.from({ length: populationSize }, () => createRandomChromosome());
}