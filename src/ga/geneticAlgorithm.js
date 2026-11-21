import {
  GA_CONFIG,
  MAX_FITNESS,
  STATUS,
  TOP_CHROMOSOMES_COUNT,
  TRACE,
} from "./constants";
import { createPopulation } from "./chromosome";
import { calculateFitness, evaluatePopulation } from "./fitness";
import { selectParents } from "./selection";
import { crossoverPair } from "./crossover";
import { swapMutation } from "./mutation";

const STAGE = {
  INIT: "init",
  EVALUATE: "evaluate",
  SELECT: "select",
  CROSSOVER: "crossover",
  MUTATE: "mutate",
  DONE: "done",
};

export class GeneticAlgorithm {
  constructor(config = GA_CONFIG) {
    this.config = config;
    this.stage = STAGE.INIT;
    this.generation = 0;
    this.population = []; // آرایه‌ای از ژن‌ها
    this.evaluated = []; // افراد مرتب‌شده بر اساس fitness
    this.selections = [];
    this.crossoverResults = [];
    this.globalBest = null;
  }

  get offspringCount() {
    return this.config.populationSize - this.config.eliteCount;
  }

  // اجرای یک مرحله از الگوریتم
  step() {
    switch (this.stage) {
      case STAGE.INIT:
        return this.generatePopulation();
      case STAGE.EVALUATE:
        return this.evaluate();
      case STAGE.SELECT:
        return this.select();
      case STAGE.CROSSOVER:
        return this.crossover();
      case STAGE.MUTATE:
        return this.mutateAndBuildNextGeneration();
      default:
        return this.result(STATUS.SOLVED, null, null);
    }
  }

  generatePopulation() {
    this.population = createPopulation(this.config.populationSize);
    this.stage = STAGE.EVALUATE;

    const trace = this.buildTrace(TRACE.GENERATE, [
      { size: this.population.length, samples: this.population.slice(0, 4) },
    ]);
    return this.result(STATUS.GENERATING, null, trace);
  }

  evaluate() {
    this.generation += 1;
    this.evaluated = evaluatePopulation(this.population);

    const best = this.evaluated[0];
    if (!this.globalBest || best.fitness > this.globalBest.fitness) {
      this.globalBest = best;
    }

    const average =
      this.evaluated.reduce((sum, individual) => sum + individual.fitness, 0) /
      this.evaluated.length;
    const trace = this.buildTrace(TRACE.EVALUATE, [
      { individuals: this.evaluated, average },
    ]);

    if (best.fitness === MAX_FITNESS) {
      this.stage = STAGE.DONE;
      return this.result(STATUS.SOLVED, "solved", trace);
    }

    if (this.generation >= this.config.maxGenerations) {
      this.stage = STAGE.DONE;
      return this.result(STATUS.EVALUATING, "maxGenerations", trace);
    }

    this.stage = STAGE.SELECT;
    return this.result(STATUS.EVALUATING, null, trace);
  }

  select() {
    const pairCount = Math.ceil(this.offspringCount / 2);

    this.selections = selectParents(
      this.evaluated,
      pairCount,
      this.config.tournamentSize
    );
    this.stage = STAGE.CROSSOVER;

    const trace = this.buildTrace(
      TRACE.SELECT,
      this.selections.map((selection, pairIndex) => ({
        pairIndex,
        ...selection,
      }))
    );
    return this.result(STATUS.SELECTING, null, trace);
  }

  crossover() {
    this.crossoverResults = this.selections.map(({ parents }) =>
      crossoverPair(
        parents[0].genes,
        parents[1].genes,
        this.config.crossoverRate
      )
    );
    this.stage = STAGE.MUTATE;

    const trace = this.buildTrace(
      TRACE.CROSSOVER,
      this.crossoverResults.map((result, pairIndex) => ({
        pairIndex,
        parents: this.selections[pairIndex].parents,
        applied: result.applied,
        start: result.start,
        end: result.end,
        children: result.children.map((child) => ({
          ...child,
          fitness: calculateFitness(child.genes),
        })),
      }))
    );
    return this.result(STATUS.CROSSOVER, null, trace);
  }

  mutateAndBuildNextGeneration() {
    const mutatedChildren = [];

    const pairItems = this.crossoverResults.map((result, pairIndex) => {
      const children = result.children.map((child) => {
        const outcome = swapMutation(child.genes, this.config.mutationRate);
        mutatedChildren.push(outcome.genes);

        return {
          before: child.genes,
          after: outcome.genes,
          swap: outcome.swap,
          fitnessBefore: calculateFitness(child.genes),
          fitnessAfter: calculateFitness(outcome.genes),
        };
      });

      return { kind: "pair", pairIndex, children };
    });

    // Elitism: بهترین‌ها بدون تغییر به نسل بعد می‌رن
    const elites = this.evaluated.slice(0, this.config.eliteCount);
    const offspring = mutatedChildren.slice(0, this.offspringCount);

    this.population = [...elites.map((e) => [...e.genes]), ...offspring];
    this.stage = STAGE.EVALUATE;

    const nextGenerationItem = {
      kind: "nextGeneration",
      elites,
      offspring: offspring.map((genes) => ({
        genes,
        fitness: calculateFitness(genes),
      })),
    };

    const trace = this.buildTrace(TRACE.MUTATE, [
      ...pairItems,
      nextGenerationItem,
    ]);
    return this.result(STATUS.MUTATION, null, trace);
  }

  buildTrace(type, items) {
    return { type, generation: this.generation, items };
  }

  getSnapshot() {
    return {
      generation: this.generation,
      best: this.evaluated[0] ?? null,
      topChromosomes: this.evaluated.slice(0, TOP_CHROMOSOMES_COUNT),
      globalBest: this.globalBest,
    };
  }

  result(status, finished, trace) {
    return { status, finished, trace, snapshot: this.getSnapshot() };
  }
}