import { useState, useEffect } from "react";
import { PHASES } from "../utils/phases";

const DEFAULT_PROGRESS = {
  currentPhaseId: 1,
  completedPhases: [],
  totalCarsPassed: 0,
};

const STORAGE_KEY = "crazy-traffic-progress";

export function useProgress() {
  const [progress, setProgress] = useState(DEFAULT_PROGRESS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadProgress();
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveProgress();
    }
  }, [progress, isLoaded]);

  const loadProgress = () => {
    try {
      const savedProgress = localStorage.getItem(STORAGE_KEY);
      if (savedProgress) {
        const parsedProgress = JSON.parse(savedProgress);

        const validatedProgress = validateProgress(parsedProgress);
        setProgress(validatedProgress);
      } else {
        setProgress(DEFAULT_PROGRESS);
      }
    } catch (error) {
      console.error("Error loading progress:", error);
      setProgress(DEFAULT_PROGRESS);
    }

    setIsLoaded(true);
  };

  const saveProgress = () => {
    try {
      const progressToSave = {
        ...progress,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progressToSave));
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  };

  const validateProgress = (data) => {
    const validated = { ...DEFAULT_PROGRESS };

    if (data.currentPhaseId && typeof data.currentPhaseId === "number") {
      const phaseExists = PHASES.find(
        (phase) => phase.id === data.currentPhaseId
      );
      validated.currentPhaseId = phaseExists ? data.currentPhaseId : 1;
    }

    if (Array.isArray(data.completedPhases)) {
      validated.completedPhases = data.completedPhases.filter((phaseId) => {
        return (
          typeof phaseId === "number" &&
          PHASES.find((phase) => phase.id === phaseId)
        );
      });
    }

    if (typeof data.totalCarsPassed === "number" && data.totalCarsPassed >= 0) {
      validated.totalCarsPassed = data.totalCarsPassed;
    }

    return validated;
  };

  const getProgress = () => {
    return progress;
  };

  const setCurrentPhase = (phaseId) => {
    const phaseExists = PHASES.find((phase) => phase.id === phaseId);
    if (phaseExists) {
      setProgress((prev) => ({
        ...prev,
        currentPhaseId: phaseId,
      }));
    }
  };

  const markPhaseCompleted = (phaseId) => {
    const phaseExists = PHASES.find((phase) => phase.id === phaseId);
    if (phaseExists && !progress.completedPhases.includes(phaseId)) {
      setProgress((prev) => ({
        ...prev,
        completedPhases: [...prev.completedPhases, phaseId],
      }));
    }
  };

  const addCarsPassed = (count) => {
    setProgress((prev) => ({
      ...prev,
      totalCarsPassed: prev.totalCarsPassed + count,
    }));
  };

  const resetProgress = () => {
    setProgress(DEFAULT_PROGRESS);
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  };

  const getProgressStats = () => {
    const totalPhases = PHASES.length;
    const completedCount = progress.completedPhases.length;
    const currentPhaseIndex = PHASES.findIndex(
      (phase) => phase.id === progress.currentPhaseId
    );

    return {
      totalPhases,
      completedCount,
      currentPhaseIndex: currentPhaseIndex >= 0 ? currentPhaseIndex + 1 : 1,
      progressPercentage: Math.round((completedCount / totalPhases) * 100),
      isGameCompleted: completedCount === totalPhases,
    };
  };

  const isPhaseCompleted = (phaseId) => {
    return progress.completedPhases.includes(phaseId);
  };

  const getNextUncompletedPhase = () => {
    const uncompletedPhases = PHASES.filter(
      (phase) => !progress.completedPhases.includes(phase.id)
    );
    return uncompletedPhases.length > 0 ? uncompletedPhases[0] : null;
  };

  return {
    progress,
    isLoaded,
    getProgress,
    setCurrentPhase,
    markPhaseCompleted,
    addCarsPassed,
    resetProgress,
    getProgressStats,
    isPhaseCompleted,
    getNextUncompletedPhase,
  };
}
