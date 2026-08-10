import React from "react";

interface VerdictCardProps {
  verdict: string;
  confidence: number;
  reliability: number;
  reliabilityGrade: string;
}

export const VerdictCard: React.FC<VerdictCardProps> = ({
  verdict,
  confidence,
  reliability,
  reliabilityGrade,
}) => {
  const isInsufficient =
    verdict === "Insufficient Text for Reliable Detection";

  const getVerdictTheme = (v: string) => {
    const lower = v.toLowerCase();

    if (lower.includes("ai") || lower.includes("synthetic")) {
      return {
        badgeColor: "var(--crimson-danger)",
        glowColor: "rgba(255, 51, 102, 0.2)",
        borderColor: "rgba(255, 51, 102, 0.4)",
        icon: "🤖",
      };
    }

    if (lower.includes("human")) {
      return {
        badgeColor: "var(--emerald-success)",
        glowColor: "rgba(16, 185, 129, 0.2)",
        borderColor: "rgba(16, 185, 129, 0.4)",
        icon: "👤",
      };
    }

    return {
      badgeColor: "var(--amber-warning)",
      glowColor: "var(--amber-glow)",
      borderColor: "var(--border-amber)",
      icon: "⚖️",
    };
  };

  const theme = getVerdictTheme(verdict);

  return (
    <div
      className="forensic-card verdict-card animate-fade-in"
      style={{
        borderColor: theme.borderColor,
        boxShadow: `0 0 25px ${theme.glowColor}`,
      }}
    >
      <div className="verdict-main-row">
        <div>
          <div className="verdict-tag font-mono">PRIMARY VERDICT</div>

          <div className="verdict-title">
            {verdict}
          </div>
        </div>

        <div
          className="verdict-icon-badge font-mono"
          style={{
            background: theme.glowColor,
            borderColor: theme.badgeColor,
          }}
        >
          <span className="badge-icon">{theme.icon}</span>
        </div>
      </div>

      <div className="verdict-metrics-grid font-mono">
        <div className="metric-box">
          <div className="metric-label">CONFIDENCE</div>

          <div className="metric-value">
            {isInsufficient
              ? "N/A"
              : `${confidence.toFixed(2)}%`}
          </div>
        </div>

        <div className="metric-box">
          <div className="metric-label">RELIABILITY</div>

          <div className="metric-value">
            {isInsufficient
              ? "N/A"
              : `${reliability.toFixed(2)}%`}
          </div>
        </div>

        <div className="metric-box">
          <div className="metric-label">
            RELIABILITY GRADE
          </div>

          <div
            className="metric-value grade-val"
            style={{ color: theme.badgeColor }}
          >
            {reliabilityGrade}
          </div>
        </div>
      </div>

      {isInsufficient && (
        <div className="insufficient-note font-mono">
          <span>!</span>
          <div>
            <strong>INSUFFICIENT LINGUISTIC EVIDENCE</strong>
            <p>
              Provide a longer text sample for reliable AI
              detection.
            </p>
          </div>
        </div>
      )}

      <style>{`
        .verdict-card {
          margin-bottom: 24px;
          background: rgba(18, 22, 36, 0.85);
          padding: 24px 28px;
        }

        .verdict-main-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
          gap: 16px;
        }

        .verdict-tag {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: var(--text-muted);
          margin-bottom: 4px;
        }

        .verdict-title {
          font-size: 28px;
          font-weight: 800;
          letter-spacing: -0.01em;
          color: var(--text-primary);
        }

        .verdict-icon-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          border-radius: var(--radius-md);
          border: 1px solid;
          font-size: 24px;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
          flex-shrink: 0;
        }

        .verdict-metrics-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          padding-top: 16px;
          border-top: 1px solid var(--border-subtle);
        }

        .metric-box {
          background: rgba(10, 13, 20, 0.5);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 10px 14px;
        }

        .metric-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          margin-bottom: 2px;
        }

        .metric-value {
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .grade-val {
          font-size: 16px;
          font-weight: 800;
        }

        .insufficient-note {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 16px;
          padding: 12px 14px;
          border: 1px solid rgba(255, 170, 0, 0.3);
          background: rgba(255, 170, 0, 0.05);
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          font-size: 11px;
        }

        .insufficient-note > span {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border: 1px solid var(--amber-warning);
          border-radius: 50%;
          color: var(--amber-warning);
          font-weight: 800;
        }

        .insufficient-note strong {
          color: var(--amber-warning);
          font-size: 10px;
          letter-spacing: 0.08em;
        }

        .insufficient-note p {
          margin: 3px 0 0;
          color: var(--text-muted);
        }

        @media (max-width: 640px) {
          .verdict-metrics-grid {
            grid-template-columns: 1fr;
          }

          .verdict-title {
            font-size: 22px;
          }
        }
      `}</style>
    </div>
  );
};