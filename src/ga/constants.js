export const BOARD_SIZE = 8;

// تعداد جفت وزیرها: C(8, 2) = 28
export const MAX_FITNESS = (BOARD_SIZE * (BOARD_SIZE - 1)) / 2;

export const GA_CONFIG = {
  populationSize: 50,
  eliteCount: 2,
  tournamentSize: 3,
  crossoverRate: 0.9,
  mutationRate: 0.25,
  maxGenerations: 500,
};

// تاخیر بین مراحل الگوریتم (برای اینکه کاربر مراحل رو ببینه)
export const STAGE_DELAY_MS = 120;

export const TOP_CHROMOSOMES_COUNT = 4;

export const STATUS = {
  GENERATING: "Generating Population",
  EVALUATING: "Evaluating Fitness",
  SELECTING: "Selecting Parents",
  CROSSOVER: "Applying Crossover",
  MUTATION: "Applying Mutation",
  SOLVED: "Solution Found",
};

export const RUN_STATE = {
  IDLE: "idle",
  RUNNING: "running",
  STOPPED: "stopped",
  SOLVED: "solved",
  MAX_REACHED: "maxReached",
};