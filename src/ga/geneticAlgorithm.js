import {
  GA_CONFIG,
  MAX_FITNESS,
  STATUS,
  TOP_CHROMOSOMES_COUNT,
} from "./constants";
import { createPopulation } from "./chromosome";
import { evaluatePopulation } from "./fitness";
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
    this.parentPairs = [];
    this.offspring = [];
    this.globalBest = null;
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
        return this.result(STATUS.SOLVED, null);
    }
  }

  generatePopulation() {
    this.population = createPopulation(this.config.populationSize);
    this.stage = STAGE.EVALUATE;
    return this.result(STATUS.GENERATING, null);
  }

  evaluate() {
    this.generation += 1;
    this.evaluated = evaluatePopulation(this.population);

    const best = this.evaluated[0];
    if (!this.globalBest || best.fitness > this.globalBest.fitness) {
      this.globalBest = best;
    }

    if (best.fitness === MAX_FITNESS) {
      this.stage = STAGE.DONE;
      return this.result(STATUS.SOLVED, "solved");
    }

    if (this.generation >= this.config.maxGenerations) {
      this.stage = STAGE.DONE;
      return this.result(STATUS.EVALUATING, "maxGenerations");
    }

    this.stage = STAGE.SELECT;
    return this.result(STATUS.EVALUATING, null);
  }

  select() {
    const offspringCount =
      this.config.populationSize - this.config.eliteCount;
    const pairCount = Math.ceil(offspringCount / 2);

    this.parentPairs = selectParents(
      this.evaluated,
      pairCount,
      this.config.tournamentSize
    );
    this.stage = STAGE.CROSSOVER;
    return this.result(STATUS.SELECTING, null);
  }

  crossover() {
    const offspringCount =
      this.config.populationSize - this.config.eliteCount;

    this.offspring = this.parentPairs
      .flatMap(([a, b]) =>
        crossoverPair(a.genes, b.genes, this.config.crossoverRate)
      )
      .slice(0, offspringCount);

    this.stage = STAGE.MUTATE;
    return this.result(STATUS.CROSSOVER, null);
  }

  mutateAndBuildNextGeneration() {
    this.offspring = this.offspring.map((genes) =>
      swapMutation(genes, this.config.mutationRate)
    );

    // Elitism: بهترین‌ها بدون تغییر به نسل بعد می‌رن
    const elites = this.evaluated
      .slice(0, this.config.eliteCount)
      .map((individual) => [...individual.genes]);

    this.population = [...elites, ...this.offspring];
    this.stage = STAGE.EVALUATE;
    return this.result(STATUS.MUTATION, null);
  }

  getSnapshot() {
    return {
      generation: this.generation,
      best: this.evaluated[0] ?? null,
      topChromosomes: this.evaluated.slice(0, TOP_CHROMOSOMES_COUNT),
      globalBest: this.globalBest,
    };
  }

  result(status, finished) {
    return { status, finished, snapshot: this.getSnapshot() };
  }
}