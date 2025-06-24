import { createContext, useContext, useState, useEffect } from "react";
import {
  PHASES,
  getPhaseById,
  getNextPhase,
  isPhaseCompleted,
} from "../utils/phases";
import { useProgress } from "../hooks/useProgress";

const PhaseContext = createContext();

export function PhaseProvider({ children }) {
  const [carsPassed, setCarsPassed] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [phaseCompleted, setPhaseCompleted] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const [showFinalScreen, setShowFinalScreen] = useState(false);
  const [transitionCountdown, setTransitionCountdown] = useState(3);

  const {
    progress,
    isLoaded,
    setCurrentPhase,
    markPhaseCompleted,
    addCarsPassed,
    getProgressStats,
  } = useProgress();

  const currentPhase = getPhaseById(progress.currentPhaseId);

  useEffect(() => {
    if (isLoaded) {
      resetPhase();
    }
  }, [isLoaded]);

  const resetPhase = () => {
    setCarsPassed(0);
    setGameOver(false);
    setPhaseCompleted(false);
    setShowTransition(false);
    setTransitionCountdown(3);
  };

  const startPhase = (phaseId) => {
    setCurrentPhase(phaseId);
    resetPhase();
  };

  const hasNextPhase = () => {
    return getNextPhase(progress.currentPhaseId);
  };

  const advanceToNextPhase = () => {
    const nextPhase = hasNextPhase();
    if (nextPhase) {
      setCurrentPhase(nextPhase.id);
      resetPhase();
    }
  };

  const handleCarPassed = () => {
    if (!gameOver && !phaseCompleted) {
      const newCarsPassed = carsPassed + 1;
      setCarsPassed(newCarsPassed);
      addCarsPassed(1);

      if (isPhaseCompleted(newCarsPassed, currentPhase.targetCars)) {
        hasNextPhase() ? setShowTransition(true) : setShowFinalScreen(true);

        setPhaseCompleted(true);

        markPhaseCompleted(progress.currentPhaseId);

        if (window.gameAudio && window.gameAudio.playSuccess) {
          window.gameAudio.playSuccess();
        }
      }
    }
  };

  const handleGameOver = () => {
    setGameOver(true);
  };

  const handleRestart = () => {
    resetPhase();
  };

  useEffect(() => {
    if (showTransition && transitionCountdown > 0) {
      const timer = setTimeout(() => {
        setTransitionCountdown(transitionCountdown - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (showTransition && transitionCountdown === 0) {
      setShowTransition(false);
      advanceToNextPhase();
    }
  }, [showTransition, transitionCountdown]);

  useEffect(() => {
    const handleRestartEvent = () => {
      handleRestart();
    };

    window.addEventListener("restartGame", handleRestartEvent);
    return () => {
      window.removeEventListener("restartGame", handleRestartEvent);
    };
  }, []);

  const value = {
    currentPhase,
    currentPhaseId: progress.currentPhaseId,
    carsPassed,
    gameOver,
    phaseCompleted,
    showTransition,
    showFinalScreen,
    transitionCountdown,
    handleCarPassed,
    handleGameOver,
    handleRestart,
    advanceToNextPhase,
    startPhase,
    resetPhase,
    setShowFinalScreen,
    progressStats: getProgressStats(),
  };

  return (
    <PhaseContext.Provider value={value}>{children}</PhaseContext.Provider>
  );
}

export function usePhase() {
  const context = useContext(PhaseContext);
  if (!context) {
    throw new Error("usePhase must be used within a PhaseProvider");
  }
  return context;
}
