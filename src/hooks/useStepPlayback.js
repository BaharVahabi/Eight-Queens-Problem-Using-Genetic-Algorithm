import { useCallback, useRef, useState } from "react";
import { TRACE } from "../ga/constants";

export default function useStepPlayback() {
  const [stageTrace, setStageTrace] = useState(null);
  const [generationTrace, setGenerationTrace] = useState({});
  const [cursor, setCursor] = useState(0);

  const stageRef = useRef(null);
  const cursorRef = useRef(0);

  // بارگذاری trace مرحله‌ی تازه اجراشده
  // showAll=true یعنی همه‌ی آیتم‌ها از ابتدا نمایش داده بشن (Auto Run)
  const loadStage = useCallback((trace, { showAll = false } = {}) => {
    const total = trace.items.length;
    const initial = showAll ? total : Math.min(1, total);

    stageRef.current = trace;
    cursorRef.current = initial;
    setStageTrace(trace);
    setCursor(initial);

    // با شروع نسل تازه (Generate یا Evaluate) trace قبلی پاک می‌شه
    setGenerationTrace((previous) =>
      trace.type === TRACE.GENERATE || trace.type === TRACE.EVALUATE
        ? { [trace.type]: trace }
        : { ...previous, [trace.type]: trace }
    );
  }, []);

  // نمایش آیتم بعدی مرحله؛ اگه آیتمی نمونده false برمی‌گردونه
  const revealNext = useCallback(() => {
    const trace = stageRef.current;
    if (!trace || cursorRef.current >= trace.items.length) return false;

    cursorRef.current += 1;
    setCursor(cursorRef.current);
    return true;
  }, []);

  const revealAll = useCallback(() => {
    const trace = stageRef.current;
    if (!trace) return;

    cursorRef.current = trace.items.length;
    setCursor(cursorRef.current);
  }, []);

  const clearPlayback = useCallback(() => {
    stageRef.current = null;
    cursorRef.current = 0;
    setStageTrace(null);
    setGenerationTrace({});
    setCursor(0);
  }, []);

  return {
    stageTrace,
    generationTrace,
    cursor,
    loadStage,
    revealNext,
    revealAll,
    clearPlayback,
  };
}