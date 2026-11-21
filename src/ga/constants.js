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

// تاخیر بین مراحل در حالت Auto Run
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

export const MODE = {
  AUTO: "auto",
  STEP: "step",
};

// تاخیر بین قدم‌ها در Auto-play حالت Step by Step
export const STEP_SPEEDS = {
  slow: { label: "Slow", delay: 1200 },
  normal: { label: "Normal", delay: 600 },
  fast: { label: "Fast", delay: 200 },
};

// نوع trace هر مرحله از الگوریتم
export const TRACE = {
  GENERATE: "generate",
  EVALUATE: "evaluate",
  SELECT: "select",
  CROSSOVER: "crossover",
  MUTATE: "mutate",
};