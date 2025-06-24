import { useState } from "react";
import { useProgress } from "../hooks/useProgress";
import { PHASES } from "../utils/phases";
import "./ProgressMenu.css";

function ProgressMenu({ isOpen, onClose }) {
  const { progress, getProgressStats, resetProgress } = useProgress();
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  if (!isOpen) return null;

  const progressStats = getProgressStats();

  const handleResetProgress = () => {
    if (showResetConfirm) {
      resetProgress();
      setShowResetConfirm(false);
      onClose();
    } else {
      setShowResetConfirm(true);
    }
  };

  const handleCancelReset = () => {
    setShowResetConfirm(false);
  };

  return (
    <div className="progress-menu-overlay" onClick={onClose}>
      <div className="progress-menu" onClick={(e) => e.stopPropagation()}>
        <div className="progress-menu-header">
          <h2>📊 Progress</h2>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="progress-menu-content">
          {/* Overall Progress */}
          <div className="progress-section">
            <h3>General Progress</h3>
            <div className="progress-stats-grid">
              <div className="stat-item">
                <span className="stat-label">Completed Phases:</span>
                <span className="stat-value">
                  {progressStats.completedCount}/{progressStats.totalPhases}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Progress:</span>
                <span className="stat-value">
                  {progressStats.progressPercentage}%
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Current Phase:</span>
                <span className="stat-value">
                  {progressStats.currentPhaseIndex} de{" "}
                  {progressStats.totalPhases}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Passed Cars:</span>
                <span className="stat-value">{progress.totalCarsPassed}</span>
              </div>
            </div>
          </div>

          <div className="progress-section">
            <h3>Phases Details</h3>
            <div className="phases-list">
              {PHASES.map((phase) => {
                const isCompleted = progress.completedPhases.includes(phase.id);
                const isCurrent = progress.currentPhaseId === phase.id;

                return (
                  <div
                    key={phase.id}
                    className={`phase-item ${isCompleted ? "completed" : ""} ${
                      isCurrent ? "current" : ""
                    }`}
                  >
                    <div className="phase-status">
                      {isCompleted && (
                        <span className="status-completed">✅</span>
                      )}
                      {isCurrent && !isCompleted && (
                        <span className="status-current">🎯</span>
                      )}
                      {!isCompleted && !isCurrent && (
                        <span className="status-locked">🔒</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="progress-section">
            <div className="actions-grid">
              {!showResetConfirm ? (
                <button className="reset-button" onClick={handleResetProgress}>
                  🗑️ Delete all progress
                </button>
              ) : (
                <div className="reset-confirmation">
                  <p>Are you sure you want to delete all progress? </p>
                  <p>This action cannot be undone.</p>
                  <div className="reset-buttons">
                    <button
                      className="confirm-reset-button"
                      onClick={handleResetProgress}
                    >
                      Yes, delete
                    </button>
                    <button
                      className="cancel-reset-button"
                      onClick={handleCancelReset}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressMenu;
