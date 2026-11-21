function tournamentSelect(evaluated, tournamentSize) {
  let winner = null;

  for (let i = 0; i < tournamentSize; i++) {
    const candidate = evaluated[Math.floor(Math.random() * evaluated.length)];
    if (!winner || candidate.fitness > winner.fitness) {
      winner = candidate;
    }
  }

  return winner;
}

export function selectParents(evaluated, pairCount, tournamentSize) {
  return Array.from({ length: pairCount }, () => [
    tournamentSelect(evaluated, tournamentSize),
    tournamentSelect(evaluated, tournamentSize),
  ]);
}