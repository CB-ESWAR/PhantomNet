import React from "react";

interface ProbabilitySpectrumProps {
  aiProbability: number;
  humanProbability: number;
  verdict?: string;
}

export const ProbabilitySpectrum: React.FC<ProbabilitySpectrumProps> = ({
  aiProbability,
  humanProbability,
  verdict,
}) => {
  const insufficient =
    verdict?.toLowerCase().includes("insufficient") ||
    (aiProbability === 0 && humanProbability === 0);

  const aiWidth = Math.min(Math.max(aiProbability, 0), 100);
  const humanWidth = Math.min(Math.max(humanProbability, 0), 100);

  return (
    <div className="forensic-card spectrum-card animate-fade-in">
      <div className="spectrum-header">
        <div className="spectrum-title font-mono">
          <span>▥</span>
          PROBABILITY SPECTRUM
        </div>

        <div className="spectrum-tag font-mono">
          AI vs HUMAN PROBABILITY DISTRIBUTIONS
        </div>
      </div>

      <div className="probability-cards-row">
        <div className="prob-box ai-box">
          <div className="prob-box-label font-mono">
            AI PROBABILITY
          </div>

          <div className="prob-box-value font-mono">
            {insufficient ? (
              "N/A"
            ) : (
              <>
                {aiProbability.toFixed(2)}
                <span className="percent-unit">%</span>
              </>
            )}
          </div>

          <div className="prob-box-sub text-crimson font-mono">
            SYNTHETIC GENERATION SIGNAL
          </div>
        </div>

        <div className="prob-box human-box">
          <div className="prob-box-label font-mono">
            HUMAN PROBABILITY
          </div>

          <div className="prob-box-value font-mono">
            {insufficient ? (
              "N/A"
            ) : (
              <>
                {humanProbability.toFixed(2)}
                <span className="percent-unit">%</span>
              </>
            )}
          </div>

          <div className="prob-box-sub text-cyan font-mono">
            NATURAL AUTHORSHIP SIGNAL
          </div>
        </div>
      </div>

      {insufficient ? (
        <div className="insufficient-spectrum font-mono">
          <div className="insufficient-icon">!</div>

          <div>
            <div className="insufficient-title">
              PROBABILITY UNAVAILABLE
            </div>

            <div className="insufficient-text">
              Insufficient linguistic evidence for a reliable probability
              estimate.
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="bar-container">
            <div className="spectrum-bar">
              <div
                className="bar-fill ai-fill"
                style={{ width: `${aiWidth}%` }}
                title={`AI Probability: ${aiProbability.toFixed(2)}%`}
              >
                {aiWidth > 15 && (
                  <span className="bar-text font-mono">
                    AI {aiProbability.toFixed(1)}%
                  </span>
                )}
              </div>

              <div
                className="bar-fill human-fill"
                style={{ width: `${humanWidth}%` }}
                title={`Human Probability: ${humanProbability.toFixed(2)}%`}
              >
                {humanWidth > 15 && (
                  <span className="bar-text font-mono">
                    HUMAN {humanProbability.toFixed(1)}%
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="spectrum-axis font-mono">
            <span>100% AI SIGNAL</span>
            <span>BALANCED</span>
            <span>100% HUMAN SIGNAL</span>
          </div>
        </>
      )}

      <style>{`
        .spectrum-card {
          margin-bottom: 24px;
          background: rgba(18, 22, 36, 0.85);
          padding: 24px 28px;
        }

        .spectrum-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .spectrum-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--cyan-primary);
        }

        .spectrum-tag {
          font-size: 10px;
          color: var(--text-muted);
          letter-spacing: 0.08em;
        }

        .probability-cards-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 20px;
        }

        .prob-box {
          background: rgba(10, 13, 20, 0.6);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 16px 20px;
          transition: all var(--transition-fast);
        }

        .ai-box {
          border-left: 3px solid var(--crimson-danger);
        }

        .ai-box:hover {
          border-color: rgba(255, 51, 102, 0.4);
          box-shadow: 0 0 15px rgba(255, 51, 102, 0.15);
        }

        .human-box {
          border-left: 3px solid var(--cyan-primary);
        }

        .human-box:hover {
          border-color: var(--border-cyan);
          box-shadow: 0 0 15px var(--cyan-glow);
        }

        .prob-box-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          margin-bottom: 6px;
        }

        .prob-box-value {
          font-size: 32px;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.1;
          margin-bottom: 4px;
        }

        .percent-unit {
          font-size: 18px;
          color: var(--text-muted);
          margin-left: 2px;
        }

        .prob-box-sub {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.1em;
        }

        .bar-container {
          width: 100%;
          background: rgba(10, 13, 20, 0.8);
          border: 1px solid var(--border-subtle);
          padding: 4px;
          border-radius: 20px;
          margin-bottom: 10px;
        }

        .spectrum-bar {
          width: 100%;
          height: 24px;
          display: flex;
          border-radius: 16px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.03);
        }

        .bar-fill {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: width 800ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        .ai-fill {
          background: linear-gradient(90deg, #ff3366 0%, #ff6600 100%);
          box-shadow: 0 0 10px rgba(255, 51, 102, 0.4);
        }

        .human-fill {
          background: linear-gradient(90deg, #0088ff 0%, #00f0ff 100%);
          box-shadow: 0 0 10px rgba(0, 240, 255, 0.4);
        }

        .bar-text {
          font-size: 10px;
          font-weight: 800;
          color: #040810;
          letter-spacing: 0.06em;
          white-space: nowrap;
        }

        .spectrum-axis {
          display: flex;
          justify-content: space-between;
          font-size: 9px;
          color: var(--text-muted);
          letter-spacing: 0.08em;
        }

        .insufficient-spectrum {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 16px;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          background: rgba(10, 13, 20, 0.55);
        }

        .insufficient-icon {
          width: 24px;
          height: 24px;
          border: 1px solid var(--amber-warning);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--amber-warning);
          font-weight: 800;
        }

        .insufficient-title {
          color: var(--amber-warning);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.08em;
          margin-bottom: 3px;
        }

        .insufficient-text {
          color: var(--text-muted);
          font-size: 10px;
        }

        @media (max-width: 640px) {
          .probability-cards-row {
            grid-template-columns: 1fr;
          }

          .spectrum-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
        }
      `}</style>
    </div>
  );
};