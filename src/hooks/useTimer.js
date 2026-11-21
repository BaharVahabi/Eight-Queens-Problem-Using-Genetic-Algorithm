import { useCallback, useEffect, useRef, useState } from "react";

function cancelFrame(frameRef) {
  if (frameRef.current !== null) {
    cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
  }
}

export default function useTimer() {
  const [elapsedMs, setElapsedMs] = useState(0);
  const segmentStartRef = useRef(null);
  const accumulatedRef = useRef(0);
  const frameRef = useRef(null);

  const start = useCallback(() => {
    if (segmentStartRef.current !== null) return;

    segmentStartRef.current = performance.now();

    const tick = () => {
      setElapsedMs(
        accumulatedRef.current + performance.now() - segmentStartRef.current
      );
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
  }, []);

  const pause = useCallback(() => {
    cancelFrame(frameRef);

    if (segmentStartRef.current !== null) {
      accumulatedRef.current += performance.now() - segmentStartRef.current;
      segmentStartRef.current = null;
      setElapsedMs(accumulatedRef.current);
    }
  }, []);

  const reset = useCallback(() => {
    cancelFrame(frameRef);
    segmentStartRef.current = null;
    accumulatedRef.current = 0;
    setElapsedMs(0);
  }, []);

  useEffect(() => () => cancelFrame(frameRef), []);

  return { elapsedMs, start, pause, reset };
}