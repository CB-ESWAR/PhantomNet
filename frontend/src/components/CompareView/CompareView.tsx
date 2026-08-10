import React, { useState } from "react";
import { analyzeText, AnalyzeResponse } from "../../services/api";

export const CompareView: React.FC = () => {
  const [textA, setTextA] = useState("");
  const [textB, setTextB] = useState("");
  const [resultA, setResultA] = useState<AnalyzeResponse | null>(null);
  const [resultB, setResultB] = useState<AnalyzeResponse | null>(null);
  const [isComparing, setIsComparing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCompare = async () => {
    if (!textA.trim() || !textB.trim()) {
      setError("Please input text in both Sample A and Sample B to run comparison.");
      return;
    }

    setIsComparing(true);
    setError(null);

    try {
      const [resA, resB] = await Promise.all([
        analyzeText(textA),
        analyzeText(textB),
      ]);
      setResultA(resA);
      setResultB(resB);
    } catch (err: any) {
      setError(err.message || "Comparison failed. Ensure backend engine is online.");
    } finally {
      setIsComparing(false);
    }
  };

  return (
    <div className="compare-container animate-fade-in">
      <div className="compare-header">
        <h2 className="compare-title text-gradient">Comparative Forensic Analysis</h2>
        <p className="compare-subtitle">Evaluate two text samples side-by-side across independent engine signals.</p>
      </div>

      {error && (
        <div className="error-banner font-mono">
          <span>⚠️ {error}</span>
        </div>
      )}

      <div className="compare-inputs-grid">
        {/* Sample A */}
        <div className="forensic-card sample-card">
          <div className="sample-label font-mono">SAMPLE A</div>
          <textarea
            className="compare-textarea font-mono"
            placeholder="Paste text sample A..."
            value={textA}
            onChange={(e) => setTextA(e.target.value)}
            rows={6}
          />
        </div>

        {/* Sample B */}
        <div className="forensic-card sample-card">
          <div className="sample-label font-mono">SAMPLE B</div>
          <textarea
            className="compare-textarea font-mono"
            placeholder="Paste text sample B..."
            value={textB}
            onChange={(e) => setTextB(e.target.value)}
            rows={6}
          />
        </div>
      </div>

      <div className="compare-cta-row">
        <button
          className="btn-primary"
          onClick={handleCompare}
          disabled={isComparing || !textA.trim() || !textB.trim()}
        >
          {isComparing ? "RUNNING COMPARISON..." : "COMPARE SAMPLES"}
        </button>
      </div>

      {/* Comparison Results Grid */}
      {resultA && resultB && (
        <div className="compare-results-grid animate-fade-in">
          <div className="forensic-card result-subcard">
            <div className="subcard-title font-mono text-cyan">SAMPLE A VERDICT</div>
            <h3 className="res-verdict">{resultA.verdict}</h3>
            <div className="res-stat font-mono">AI PROBABILITY: {resultA.aiProbability.toFixed(2)}%</div>
            <div className="res-stat font-mono">HUMAN PROBABILITY: {resultA.humanProbability.toFixed(2)}%</div>
            <div className="res-stat font-mono">RELIABILITY: {resultA.reliabilityGrade} ({resultA.reliability.toFixed(2)}%)</div>
          </div>

          <div className="forensic-card result-subcard">
            <div className="subcard-title font-mono text-cyan">SAMPLE B VERDICT</div>
            <h3 className="res-verdict">{resultB.verdict}</h3>
            <div className="res-stat font-mono">AI PROBABILITY: {resultB.aiProbability.toFixed(2)}%</div>
            <div className="res-stat font-mono">HUMAN PROBABILITY: {resultB.humanProbability.toFixed(2)}%</div>
            <div className="res-stat font-mono">RELIABILITY: {resultB.reliabilityGrade} ({resultB.reliability.toFixed(2)}%)</div>
          </div>
        </div>
      )}

      <style>{`
        .compare-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 20px 0;
        }

        .compare-header {
          text-align: center;
          margin-bottom: 28px;
        }

        .compare-title {
          font-size: 30px;
          font-weight: 800;
          margin-bottom: 6px;
        }

        .compare-subtitle {
          color: var(--text-secondary);
          font-size: 15px;
        }

        .error-banner {
          background: rgba(255, 51, 102, 0.1);
          border: 1px solid var(--crimson-danger);
          padding: 12px 16px;
          border-radius: var(--radius-md);
          color: var(--crimson-danger);
          margin-bottom: 20px;
          font-size: 13px;
        }

        .compare-inputs-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        .sample-card {
          padding: 16px 20px;
          background: rgba(18, 22, 36, 0.7);
        }

        .sample-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--cyan-primary);
          margin-bottom: 10px;
        }

        .compare-textarea {
          width: 100%;
          background: transparent;
          border: none;
          outline: none;
          color: var(--text-primary);
          font-size: 13px;
          line-height: 1.6;
          resize: vertical;
        }

        .compare-cta-row {
          display: flex;
          justify-content: center;
          margin-bottom: 30px;
        }

        .compare-results-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .result-subcard {
          background: rgba(18, 22, 36, 0.85);
          padding: 20px;
        }

        .subcard-title {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          margin-bottom: 8px;
        }

        .res-verdict {
          font-size: 22px;
          font-weight: 800;
          margin-bottom: 12px;
        }

        .res-stat {
          font-size: 12px;
          color: var(--text-secondary);
          margin-bottom: 4px;
        }

        @media (max-width: 768px) {
          .compare-inputs-grid, .compare-results-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
