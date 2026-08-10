import React from "react";
import { ScanningSignal } from "../../hooks/useAnalysis";

interface AnalysisProgressProps {
  currentSignal: ScanningSignal;
}

const SIGNALS: { id: ScanningSignal; label: string }[] = [
  { id: "STYLOMETRIC", label: "STYLOMETRIC" },
  { id: "STATISTICAL", label: "STATISTICAL" },
  { id: "READABILITY", label: "READABILITY" },
  { id: "FINGERPRINT", label: "FINGERPRINT" },
  { id: "SIMILARITY", label: "SIMILARITY" },
];

export const AnalysisProgress: React.FC<AnalysisProgressProps> = ({ currentSignal }) => {
  return (
    <div className="forensic-card progress-card animate-fade-in">
      <div className="progress-header">
        <div className="status-label font-mono">
          <span className="scanning-dot pulse-animation">●</span>
          SCANNING TEXT
        </div>
        <div className="progress-tag font-mono">
          EVALUATING: <span className="active-signal-name">{currentSignal}</span>
        </div>
      </div>

      {/* Signal step indicators */}
      <div className="signals-grid">
        {SIGNALS.map((sig) => {
          const isActive = currentSignal === sig.id;
          const isDone =
            SIGNALS.findIndex((s) => s.id === currentSignal) >
            SIGNALS.findIndex((s) => s.id === sig.id);

          return (
            <div
              key={sig.id}
              className={`signal-step ${isActive ? "active" : isDone ? "done" : ""}`}
            >
              <div className="step-bar font-mono">
                <span className="step-indicator">
                  {isDone ? "✓" : isActive ? "►" : "•"}
                </span>
                <span className="step-label">{sig.label}</span>
              </div>
              <div className="step-glow-line" />
            </div>
          );
        })}
      </div>

      <style>{`
        .progress-card {
          margin-bottom: 32px;
          background: rgba(12, 15, 23, 0.95);
          border: 1px solid var(--border-cyan);
          box-shadow: 0 0 25px var(--cyan-glow);
          padding: 24px 28px;
        }

        .progress-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 12px;
        }

        .status-label {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: var(--cyan-primary);
        }

        .scanning-dot {
          color: var(--cyan-primary);
        }

        .progress-tag {
          font-size: 11px;
          color: var(--text-muted);
          letter-spacing: 0.08em;
        }

        .active-signal-name {
          color: var(--text-primary);
          font-weight: 700;
        }

        .signals-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 12px;
        }

        .signal-step {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 10px 12px;
          transition: all var(--transition-fast);
          position: relative;
          overflow: hidden;
        }

        .signal-step.done {
          border-color: rgba(16, 185, 129, 0.3);
          background: rgba(16, 185, 129, 0.04);
        }

        .signal-step.active {
          border-color: var(--cyan-primary);
          background: rgba(0, 240, 255, 0.08);
          box-shadow: 0 0 15px rgba(0, 240, 255, 0.2);
        }

        .step-bar {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--text-muted);
        }

        .signal-step.done .step-bar {
          color: var(--emerald-success);
        }

        .signal-step.active .step-bar {
          color: var(--cyan-primary);
        }

        .step-glow-line {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          width: 0%;
          background: var(--cyan-primary);
          transition: width 300ms ease;
        }

        .signal-step.active .step-glow-line {
          width: 100%;
        }

        .signal-step.done .step-glow-line {
          width: 100%;
          background: var(--emerald-success);
        }

        @media (max-width: 768px) {
          .signals-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
