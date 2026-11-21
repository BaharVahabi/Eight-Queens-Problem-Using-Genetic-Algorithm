import useGeneticAlgorithm from "./hooks/useGeneticAlgorithm";
import { MODE, RUN_STATE } from "./ga/constants";
import DashboardLayout from "./components/layout/DashboardLayout";
import Header from "./components/layout/Header";
import StatsGrid from "./components/stats/StatsGrid";
import Chessboard from "./components/board/Chessboard";
import ControlPanel from "./components/controls/ControlPanel";
import ModeToggle from "./components/controls/ModeToggle";
import StepControls from "./components/controls/StepControls";
import StatusIndicator from "./components/status/StatusIndicator";
import ResultBanner from "./components/result/ResultBanner";
import PopulationPanel from "./components/population/PopulationPanel";
import StepInspector from "./components/trace/StepInspector";

export default function App() {
  const {
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
  } = useGeneticAlgorithm();

  const isSolved = runState === RUN_STATE.SOLVED;

  return (
    <DashboardLayout
      header={<Header />}
      stats={
        <StatsGrid
          generation={snapshot.generation}
          best={snapshot.best}
          elapsedMs={elapsedMs}
          isSolved={isSolved}
        />
      }
      board={
        <Chessboard
          chromosome={snapshot.best ? snapshot.best.genes : null}
          isSolved={isSolved}
        />
      }
      sidebar={
        <>
          <ControlPanel
            runState={runState}
            onStart={start}
            onStop={stop}
            onReset={reset}
          />
          <StatusIndicator runState={runState} status={status} />

          <ModeToggle mode={mode} onChange={changeMode} />
          {mode === MODE.STEP && (
            <StepControls
              runState={runState}
              canStep={canStep}
              canSkip={canSkip}
              autoplay={autoplay}
              speed={speed}
              onNext={nextStep}
              onSkip={skipStage}
              onToggleAutoplay={toggleAutoplay}
              onSpeedChange={setSpeed}
            />
          )}
          <ResultBanner
            runState={runState}
            generation={snapshot.generation}
            elapsedMs={elapsedMs}
            best={snapshot.globalBest}
          />
          <PopulationPanel chromosomes={snapshot.topChromosomes} />
        </>
      }
      inspector={
        <StepInspector
          mode={mode}
          stageTrace={stageTrace}
          generationTrace={generationTrace}
          cursor={cursor}
        />
      }
    />
  );
}