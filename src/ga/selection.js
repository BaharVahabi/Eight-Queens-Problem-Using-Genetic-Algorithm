function runTournament(evaluated, tournamentSize) {
  const candidates = [];

  for (let i = 0; i < tournamentSize; i++) {
    candidates.push(evaluated[Math.floor(Math.random() * evaluated.length)]);
  }

  let winnerIndex = 0;
  candidates.forEach((candidate, index) => {
    if (candidate.fitness > candidates[winnerIndex].fitness) {
      winnerIndex = index;
    }
  });

  return { candidates, winnerIndex, winner: candidates[winnerIndex] };
}

// خروجی هر جفت: دو تورنمنت و دو والد برنده
export function selectParents(evaluated, pairCount, tournamentSize) {
  return Array.from({ length: pairCount }, () => {
    const first = runTournament(evaluated, tournamentSize);
    const second = runTournament(evaluated, tournamentSize);

    return {
      tournaments: [first, second],
      parents: [first.winner, second.winner],
    };
  });
}