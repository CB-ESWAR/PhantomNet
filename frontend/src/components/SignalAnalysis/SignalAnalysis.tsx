import React from "react";
import { EngineScores } from "../../services/api";

interface SignalAnalysisProps {
  scores: EngineScores;
}

export const SignalAnalysis: React.FC<SignalAnalysisProps> = ({ scores }) => {
  const signalList = [
    { key: "stylometric", label: "Stylometric", score: scores.stylometric, desc: "Syntactic structure & lexical cadence" },
    { key: "statistical", label: "Statistical", score: scores.statistical, desc: "Token distribution & entropy variance" },
    { key: "readability", label: "Readability", score: scores.readability, desc: "Linguistic complexity & length metrics" },
    { key: "fingerprint", label: "Fingerprint", score: scores.fingerprint, desc: "Stylistic hash & pattern matching" },
    { key: "similarity", label: "Similarity", score: scores.similarity, desc: "Cross-model semantic embedding alignment" },
  ];

  // Radar Chart Math for 5 axes
  const center = 110;
  const radius = 80;
  const totalAxes = 5;

  const getCoordinates = (index: number, val: number) => {
    // Start at top (-90 degrees)
    const angle = (Math.PI * 2 * index) / totalAxes - Math.PI / 2;
    const r = Math.min(Math.max(val, 0), 1) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  // Generate polygon points string for dataset
  const points = signalList
    .map((sig, i) => {
      const { x, y } = getCoordinates(i, sig.score);
      return `${x},${y}`;
    })
    .join(" ");

  // Background grid webs (at 0.25, 0.5, 0.75, 1.0)
  const gridLevels = [0.25, 0.5, 0.75, 1.0];

  return (
    <div className="forensic-card signals-card animate-fade-in">
      <div className="signals-header font-mono">
        <div className="signals-title">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2">
            <polygon points="12 2 2 7 12 12 22 7 12 2"/>
            <polyline points="2 17 12 22 22 17"/>
            <polyline points="2 12 12 17 22 12"/>
          </svg>
          ANALYSIS SIGNALS
        </div>
        <div className="signals-tag">MULTIDIMENSIONAL ENGINE SIGNAL MATRIX</div>
      </div>

      <div className="signals-body">
        {/* Radar SVG Visualizer */}
        <div className="radar-container">
          <svg width="220" height="220" viewBox="0 0 220 220" className="radar-svg">
            {/* Grid Circles / Webs */}
            {gridLevels.map((lvl) => {
              const gridPoints = signalList
                .map((_, i) => {
                  const { x, y } = getCoordinates(i, lvl);
                  return `${x},${y}`;
                })
                .join(" ");
              return (
                <polygon
                  key={lvl}
                  points={gridPoints}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="1"
                  strokeDasharray={lvl === 1.0 ? "none" : "2,2"}
                />
              );
            })}

            {/* Radar Axis Lines */}
            {signalList.map((_, i) => {
              const { x, y } = getCoordinates(i, 1.0);
              return (
                <line
                  key={i}
                  x1={center}
                  y1={center}
                  x2={x}
                  y2={y}
                  stroke="rgba(255, 255, 255, 0.12)"
                  strokeWidth="1"
                />
              );
            })}

            {/* Data Polygon Fill */}
            <polygon
              points={points}
              fill="rgba(0, 240, 255, 0.18)"
              stroke="#00f0ff"
              strokeWidth="2"
              className="radar-polygon"
            />

            {/* Axis Dots */}
            {signalList.map((sig, i) => {
              const { x, y } = getCoordinates(i, sig.score);
              return (
                <circle
                  key={sig.key}
                  cx={x}
                  cy={y}
                  r="4"
                  fill="#00f0ff"
                  stroke="#040810"
                  strokeWidth="1.5"
                />
              );
            })}
          </svg>
        </div>

        {/* Signal Metric List */}
        <div className="signal-metrics-list">
          {signalList.map((sig) => {
            const pct = (sig.score * 100).toFixed(0);
            return (
              <div key={sig.key} className="signal-item">
                <div className="signal-item-top">
                  <div className="signal-name-area">
                    <span className="signal-name font-mono">{sig.label}</span>
                    <span className="signal-desc">{sig.desc}</span>
                  </div>
                  <div className="signal-score-val font-mono">
                    {sig.score.toFixed(2)}
                  </div>
                </div>

                <div className="signal-bar-track">
                  <div
                    className="signal-bar-fill"
                    style={{ width: `${Math.min(Math.max(sig.score, 0), 1) * 100}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .signals-card {
          margin-bottom: 24px;
          background: rgba(18, 22, 36, 0.85);
          padding: 24px 28px;
        }

        .signals-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .signals-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--cyan-primary);
        }

        .signals-tag {
          font-size: 10px;
          color: var(--text-muted);
          letter-spacing: 0.08em;
        }

        .signals-body {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 28px;
          align-items: center;
        }

        .radar-container {
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(10, 13, 20, 0.5);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 10px;
        }

        .radar-svg {
          filter: drop-shadow(0 0 10px rgba(0, 240, 255, 0.2));
        }

        .radar-polygon {
          transition: points 600ms ease;
        }

        .signal-metrics-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .signal-item {
          background: rgba(10, 13, 20, 0.4);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 10px 14px;
        }

        .signal-item-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 6px;
        }

        .signal-name-area {
          display: flex;
          flex-direction: column;
        }

        .signal-name {
          font-size: 12px;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: 0.04em;
        }

        .signal-desc {
          font-size: 10px;
          color: var(--text-muted);
        }

        .signal-score-val {
          font-size: 14px;
          font-weight: 800;
          color: var(--cyan-primary);
        }

        .signal-bar-track {
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 2px;
          overflow: hidden;
        }

        .signal-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #0088ff 0%, #00f0ff 100%);
          border-radius: 2px;
          transition: width 600ms ease;
        }

        @media (max-width: 768px) {
          .signals-body {
            grid-template-columns: 1fr;
          }
          .radar-container {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};
