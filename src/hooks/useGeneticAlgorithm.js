import { useCallback, useEffect, useRef, useState } from "react";
import { GeneticAlgorithm } from "../ga/geneticAlgorithm";
import { MODE, RUN_STATE, STAGE_DELAY_MS, STEP_SPEEDS } from "../ga/constants";
import useTimer from "./useTimer";
import useStepPlayback from "./useStepPlayback";

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

  const autoRunTimeoutRef = useRef(null);
  const autoplayTimeoutRef = useRef(null);
  const runStateRef = useRef(RUN_STATE.IDLE);
  const modeRef = useRef(MODE.AUTO);
  const speedRef = useRef("normal");

  const [runState, setRunState] = useState(RUN_STATE.IDLE);
  const [mode, setModeState] = useState(MODE.AUTO);
  const [status, setStatus] = useState(null);
  const [snapshot, setSnapshot] = useState(EMPTY_SNAPSHOT);
  const [autoplay, setAutoplay] = useState(false);
  const [speed, setSpeedState] = useState("normal");

  const {
    elapsedMs,
    start: startTimer,
    pause: pauseTimer,
    reset: resetTimer,
  } = useTimer();

  const {
    stageTrace,
    generationTrace,
    cursor,
    loadStage,
    revealNext,
    revealAll,
    clearPlayback,
  } = useStepPlayback();

  const updateRunState = useCallback((next) => {
    runStateRef.current = next;
    setRunState(next);
  }, []);

  const clearAutoRun = useCallback(() => {
    if (autoRunTimeoutRef.current !== null) {
      clearTimeout(autoRunTimeoutRef.current);
      autoRunTimeoutRef.current = null;
    }
  }, []);

  const clearAutoplayTimeout = useCallback(() => {
    if (autoplayTimeoutRef.current !== null) {
      clearTimeout(autoplayTimeoutRef.current);
      autoplayTimeoutRef.current = null;
    }
  }, []);

  // توقف Auto-play (و تایمر، چون تایمر فقط در حالت پخش خودکار می‌شمره)
  const stopAutoplay = useCallback(() => {
    clearAutoplayTimeout();
    setAutoplay(false);
    pauseTimer();
  }, [clearAutoplayTimeout, pauseTimer]);

  const finishRun = useCallback(
    (finished) => {
      clearAutoRun();
      stopAutoplay();
      updateRunState(
        finished === "solved" ? RUN_STATE.SOLVED : RUN_STATE.MAX_REACHED
      );
    },
    [clearAutoRun, stopAutoplay, updateRunState]
  );

  // اجرای یک مرحله از الگوریتم و ثبت trace آن
  const executeStage = useCallback(
    (options) => {
      const result = gaRef.current.step();

      setStatus(result.status);
      setSnapshot(result.snapshot);
      if (result.trace) loadStage(result.trace, options);
      if (result.finished) finishRun(result.finished);

      return result;
    },
    [loadStage, finishRun]
  );

  // حلقه‌ی Auto Run
  const scheduleAutoRun = useCallback(() => {
    function runStage() {
      const result = executeStage({ showAll: true });
      if (result.finished) return;

      autoRunTimeoutRef.current = setTimeout(runStage, STAGE_DELAY_MS);
    }

    autoRunTimeoutRef.current = setTimeout(runStage, STAGE_DELAY_MS);
  }, [executeStage]);

  // یک قدم در حالت Step by Step؛ اگه بشه ادامه داد true برمی‌گردونه
  const advance = useCallback(() => {
    if (
      runStateRef.current !== RUN_STATE.RUNNING ||
      modeRef.current !== MODE.STEP
    ) {
      return false;
    }

    if (revealNext()) return true;

    const result = executeStage();
    return !result.finished;
  }, [revealNext, executeStage]);

  const startAutoplay = useCallback(() => {
    if (
      runStateRef.current !== RUN_STATE.RUNNING ||
      modeRef.current !== MODE.STEP
    ) {
      return;
    }

    setAutoplay(true);
    startTimer();

    function tick() {
      if (!advance()) {
        stopAutoplay();
        return;
      }
      autoplayTimeoutRef.current = setTimeout(
        tick,
        STEP_SPEEDS[speedRef.current].delay
      );
    }

    autoplayTimeoutRef.current = setTimeout(
      tick,
      STEP_SPEEDS[speedRef.current].delay
    );
  }, [advance, startTimer, stopAutoplay]);

  const start = useCallback(() => {
    const current = runStateRef.current;
    if (current !== RUN_STATE.IDLE && current !== RUN_STATE.STOPPED) return;

    updateRunState(RUN_STATE.RUNNING);

    if (modeRef.current === MODE.AUTO) {
      startTimer();
      scheduleAutoRun();
      return;
    }

    // Step by Step: شروع تازه اولین مرحله (Generate) رو اجرا می‌کنه
    if (current === RUN_STATE.IDLE) executeStage();
  }, [updateRunState, startTimer, scheduleAutoRun, executeStage]);

  const stop = useCallback(() => {
    if (runStateRef.current !== RUN_STATE.RUNNING) return;

    clearAutoRun();
    stopAutoplay();
    updateRunState(RUN_STATE.STOPPED);
  }, [clearAutoRun, stopAutoplay, updateRunState]);

  const reset = useCallback(() => {
    clearAutoRun();
    stopAutoplay();
    gaRef.current = new GeneticAlgorithm();
    resetTimer();
    clearPlayback();
    setStatus(null);
    setSnapshot(EMPTY_SNAPSHOT);
    updateRunState(RUN_STATE.IDLE);
  }, [clearAutoRun, stopAutoplay, resetTimer, clearPlayback, updateRunState]);

  const changeMode = useCallback(
    (next) => {
      if (next === modeRef.current) return;

      const wasRunning = runStateRef.current === RUN_STATE.RUNNING;
      if (wasRunning) {
        clearAutoRun();
        stopAutoplay();
      }

      modeRef.current = next;
      setModeState(next);

      if (!wasRunning) return;

      if (next === MODE.STEP) {
        // مرحله‌ی جاری کامل نمایش داده می‌شه و قدم بعدی مرحله‌ی تازه رو شروع می‌کنه
        revealAll();
      } else {
        startTimer();
        scheduleAutoRun();
      }
    },
    [clearAutoRun, stopAutoplay, revealAll, startTimer, scheduleAutoRun]
  );

  const setSpeed = useCallback((next) => {
    speedRef.current = next;
    setSpeedState(next);
  }, []);

  const nextStep = useCallback(() => {
    advance();
  }, [advance]);

  const skipStage = useCallback(() => {
    if (
      runStateRef.current === RUN_STATE.RUNNING &&
      modeRef.current === MODE.STEP
    ) {
      revealAll();
    }
  }, [revealAll]);

  const toggleAutoplay = useCallback(() => {
    if (autoplay) {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  }, [autoplay, stopAutoplay, startAutoplay]);

  useEffect(
    () => () => {
      clearAutoRun();
      clearAutoplayTimeout();
    },
    [clearAutoRun, clearAutoplayTimeout]
  );

  const canStep = mode === MODE.STEP && runState === RUN_STATE.RUNNING;
  const canSkip =
    canStep && stageTrace !== null && cursor < stageTrace.items.length;

  return {
    mode,
    changeMode,
    runState,
    status,
    snapshot,
    elapsedMs,
    start,
    stop,
    reset,
    stageTrace,
    generationTrace,
    cursor,
    autoplay,
    speed,
    setSpeed,
    canStep,
    canSkip,
    nextStep,
    skipStage,
    toggleAutoplay,
  };
}