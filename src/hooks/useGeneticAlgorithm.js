import { useCallback, useEffect, useRef, useState } from "react";
import { GeneticAlgorithm } from "../ga/geneticAlgorithm";
import { RUN_STATE, STAGE_DELAY_MS } from "../ga/constants";
import useTimer from "./useTimer";

const EMPTY_SNAPSHOT = {
  generation: 0,
  best: null,
  topChromosomes: [],
  globalBest: null,
};

export default function useGeneticAlgorithm() {
  const gaRef = useRef(null);
  if (gaRef.current === null) {
    gaRef.current = new GeneticAlgorithm();
  }

  const timeoutRef = useRef(null);
  const [runState, setRunState] = useState(RUN_STATE.IDLE);
  const [status, setStatus] = useState(null);
  const [snapshot, setSnapshot] = useState(EMPTY_SNAPSHOT);

  const {
    elapsedMs,
    start: startTimer,
    pause: pauseTimer,
    reset: resetTimer,
  } = useTimer();

  const clearScheduledStep = useCallback(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const scheduleStep = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      const { status: nextStatus, finished, snapshot: nextSnapshot } =
        gaRef.current.step();

      setStatus(nextStatus);
      setSnapshot(nextSnapshot);

      if (finished) {
        timeoutRef.current = null;
        pauseTimer();
        setRunState(
          finished === "solved" ? RUN_STATE.SOLVED : RUN_STATE.MAX_REACHED
        );
        return;
      }

      scheduleStep();
    }, STAGE_DELAY_MS);
  }, [pauseTimer]);

  const start = useCallback(() => {
    if (runState !== RUN_STATE.IDLE && runState !== RUN_STATE.STOPPED) return;

    startTimer();
    setRunState(RUN_STATE.RUNNING);
    scheduleStep();
  }, [runState, startTimer, scheduleStep]);

  const stop = useCallback(() => {
    if (runState !== RUN_STATE.RUNNING) return;

    clearScheduledStep();
    pauseTimer();
    setRunState(RUN_STATE.STOPPED);
  }, [runState, clearScheduledStep, pauseTimer]);

  const reset = useCallback(() => {
    clearScheduledStep();
    gaRef.current = new GeneticAlgorithm();
    resetTimer();
    setStatus(null);
    setSnapshot(EMPTY_SNAPSHOT);
    setRunState(RUN_STATE.IDLE);
  }, [clearScheduledStep, resetTimer]);

  useEffect(() => clearScheduledStep, [clearScheduledStep]);

  return { runState, status, snapshot, elapsedMs, start, stop, reset };
}