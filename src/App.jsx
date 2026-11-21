import useGeneticAlgorithm from "./hooks/useGeneticAlgorithm";
import { RUN_STATE } from "./ga/constants";
import DashboardLayout from "./components/layout/DashboardLayout";
import Header from "./components/layout/Header";
import StatsGrid from "./components/stats/StatsGrid";
import Chessboard from "./components/board/Chessboard";
import ControlPanel from "./components/controls/ControlPanel";
import StatusIndicator from "./components/status/StatusIndicator";
import ResultBanner from "./components/result/ResultBanner";
import PopulationPanel from "./components/population/PopulationPanel";

export default function App() {
  const { runState, status, snapshot, elapsedMs, start, stop, reset } =
    useGeneticAlgorithm();

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
          <ResultBanner
            runState={runState}
            generation={snapshot.generation}
            elapsedMs={elapsedMs}
            best={snapshot.globalBest}
          />
          <PopulationPanel chromosomes={snapshot.topChromosomes} />
        </>
      }
    />
  );
}