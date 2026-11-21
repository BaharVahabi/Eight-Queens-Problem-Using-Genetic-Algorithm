import { MAX_FITNESS } from "./constants";

export function getConflictingPairs(genes) {
  const pairs = [];

  for (let i = 0; i < genes.length - 1; i++) {
    for (let j = i + 1; j < genes.length; j++) {
      if (Math.abs(genes[i] - genes[j]) === j - i) {
        pairs.push([i, j]);
      }
    }
  }

  return pairs;
}

export function countConflicts(genes) {
  return getConflictingPairs(genes).length;
}

export function calculateFitness(genes) {
  return MAX_FITNESS - countConflicts(genes);
}

// ستون‌هایی که وزیرشون حداقل با یک وزیر دیگه تعارض داره
export function getConflictingColumns(genes) {
  const columns = new Set();
  getConflictingPairs(genes).forEach(([a, b]) => {
    columns.add(a);
    columns.add(b);
  });
  return columns;
}

export function evaluateChromosome(genes) {
  const conflicts = countConflicts(genes);
  return { genes, conflicts, fitness: MAX_FITNESS - conflicts };
}

// خروجی: آرایه‌ای از افراد مرتب‌شده بر اساس fitness (نزولی)
export function evaluatePopulation(population) {
  return population
    .map(evaluateChromosome)
    .sort((a, b) => b.fitness - a.fitness);
}