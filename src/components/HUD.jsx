import { useState } from "react";
import { usePhase } from "../contexts/PhaseContext";
import { useAudio } from "../contexts/AudioContext";
import { useProgress } from "../hooks/useProgress";
import ProgressMenu from "./ProgressMenu";
import "./HUD.css";

function HUD() {
  const { resetProgress } = useProgress();

  const {
    currentPhase,
    carsPassed,
    gameOver,
    showTransition,
    showFinalScreen,
    transitionCountdown,
    handleRestart,
    progressStats,
    setShowFinalScreen,
  } = usePhase();

  const { isMuted, toggleMute } = useAudio();
  const [showProgressMenu, setShowProgressMenu] = useState(false);

  const handleRestartClick = () => {
    handleRestart();
  };

  const handleResetProgress = () => {
    resetProgress();
    setShowFinalScreen(false);
  };

  const handleOpenProgressMenu = () => {
    setShowProgressMenu(true);
  };

  const handleCloseProgressMenu = () => {
    setShowProgressMenu(false);
  };

  if (showTransition) {
    return (
      <div className="hud-overlay">
        <div className="phase-transition">
          <h2>🎉 Completed Phase!</h2>
          <p>{currentPhase.name}</p>
          <p>
            Objective: {carsPassed}/{currentPhase.targetCars} cars
          </p>
          <div className="countdown">
            <h3>Next phase in...</h3>
            <div className="countdown-number">{transitionCountdown}</div>
          </div>
        </div>
      </div>
    );
  }
  if (gameOver && (!showFinalScreen || !showTransition)) {
    return (
      <div className="hud-overlay">
        <div className="game-over">
          <h2>Game Over!</h2>
          <p>Collision detected!</p>
          <button onClick={handleRestartClick} className="restart-button">
            Restart
          </button>
        </div>
      </div>
    );
  }
  if (showFinalScreen) {
    return (
      <div className="hud-overlay">
        <div className="phase-transition">
          <h2>🎉 Congrats! You completed the game</h2>
          <button onClick={handleResetProgress} className="restart-button">
            Restart Game
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="hud">
        <div className="phase-info">
          <h3>{currentPhase.name}</h3>
          <p className="phase-description">{currentPhase.description}</p>
          <div className="phase-progress">
            <span className="phase-counter">
              Phase {progressStats.currentPhaseIndex} of{" "}
              {progressStats.totalPhases}
            </span>
            <span className="completion-rate">
              {progressStats.completedCount}/{progressStats.totalPhases}{" "}
              completed
            </span>
          </div>
          <div
            className={`difficulty-badge difficulty-${currentPhase.difficulty}`}
          >
            {currentPhase.difficulty.toUpperCase()}
          </div>
        </div>

        <div className="progress-info">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${(carsPassed / currentPhase.targetCars) * 100}%`,
              }}
            ></div>
          </div>
          <p className="progress-text">
            {carsPassed} / {currentPhase.targetCars} cars passed
          </p>
          <p className="objective-text">
            Objective: {currentPhase.targetCars - carsPassed} remaining cars
          </p>
        </div>

        <div className="game-controls">
          <button onClick={toggleMute} className="audio-button">
            {isMuted ? "🔇" : "🔊"}
          </button>
          <button onClick={handleOpenProgressMenu} className="progress-button">
            📊 Progress
          </button>
        </div>

        <div className="phase-stats">
          <div className="stat">
            <span className="stat-label">Speed:</span>
            <span className="stat-value">
              {(currentPhase.carSpeed * 100).toFixed(0)}%
            </span>
          </div>
          <div className="stat">
            <span className="stat-label">Spawn Rate:</span>
            <span className="stat-value">
              {(
                1000 / Math.min(...Object.values(currentPhase.spawnRate))
              ).toFixed(1)}
              /s
            </span>
          </div>
          <div className="stat">
            <span className="stat-label">Max Cars:</span>
            <span className="stat-value">{currentPhase.maxCarsPerAvenue}</span>
          </div>
        </div>
      </div>

      <ProgressMenu
        isOpen={showProgressMenu}
        onClose={handleCloseProgressMenu}
      />
    </>
  );
}

export default HUD;
