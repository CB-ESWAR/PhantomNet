import React from "react";
import { ModelSimilarity as ModelSimilarityType } from "../../services/api";

interface ModelSimilarityProps {
  similarity: ModelSimilarityType;
}

export const ModelSimilarity: React.FC<ModelSimilarityProps> = ({ similarity }) => {
  const modelList = [
    { name: "GPT", score: similarity.gpt, color: "#10a37f" },
    { name: "Claude", score: similarity.claude, color: "#d97706" },
    { name: "Gemini", score: similarity.gemini, color: "#2563eb" },
    { name: "DeepSeek", score: similarity.deepseek, color: "#0284c7" },
    { name: "Copilot", score: similarity.copilot, color: "#00f0ff" },
    { name: "Mistral", score: similarity.mistral, color: "#ff7000" },
    { name: "Llama", score: similarity.llama, color: "#8b5cf6" },
  ];

  return (
    <div className="forensic-card model-sim-card animate-fade-in">
      <div className="model-sim-header font-mono">
        <div className="model-sim-title">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2">
            <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
          </svg>
          MODEL PROFILE SIMILARITY
        </div>
        <div className="model-sim-tag">AI ARCHITECTURE COMPARATIVE PROFILES</div>
      </div>

      <div className="models-grid">
        {modelList.map((m) => {
          const widthPct = Math.min(Math.max(m.score, 0), 100);
          return (
            <div key={m.name} className="model-row font-mono">
              <div className="model-meta">
                <span className="model-name">{m.name}</span>
                <span className="model-score-num">{m.score.toFixed(2)}%</span>
              </div>

              <div className="model-track">
                <div
                  className="model-fill"
                  style={{
                    width: `${widthPct}%`,
                    background: `linear-gradient(90deg, ${m.color}88 0%, ${m.color} 100%)`,
                    boxShadow: `0 0 10px ${m.color}44`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Mandatory Explanatory Note */}
      <div className="model-disclaimer font-mono">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffaa00" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <span>
          Model similarity represents stylistic resemblance and should not be interpreted as proof of authorship.
        </span>
      </div>

      <style>{`
        .model-sim-card {
          margin-bottom: 24px;
          background: rgba(18, 22, 36, 0.85);
          padding: 24px 28px;
        }

        .model-sim-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .model-sim-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--cyan-primary);
        }

        .model-sim-tag {
          font-size: 10px;
          color: var(--text-muted);
          letter-spacing: 0.08em;
        }

        .models-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 20px;
        }

        .model-row {
          background: rgba(10, 13, 20, 0.4);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 10px 14px;
        }

        .model-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 6px;
        }

        .model-name {
          font-size: 12px;
          font-weight: 700;
          color: var(--text-primary);
          letter-spacing: 0.05em;
        }

        .model-score-num {
          font-size: 13px;
          font-weight: 700;
          color: var(--text-secondary);
        }

        .model-track {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.04);
          border-radius: 3px;
          overflow: hidden;
        }

        .model-fill {
          height: 100%;
          border-radius: 3px;
          transition: width 600ms ease;
        }

        .model-disclaimer {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 170, 0, 0.05);
          border: 1px solid var(--border-amber);
          border-radius: var(--radius-sm);
          padding: 10px 14px;
          font-size: 11px;
          color: var(--amber-warning);
          line-height: 1.4;
        }

        .model-disclaimer svg {
          flex-shrink: 0;
        }
      `}</style>
    </div>
  );
};
