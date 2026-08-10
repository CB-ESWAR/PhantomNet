import React from "react";

export const DocsView: React.FC = () => {
  return (
    <div className="docs-container animate-fade-in">
      <div className="docs-header">
        <h2 className="docs-title text-gradient">PhantomNet Engine Architecture & API Spec</h2>
        <p className="docs-subtitle">
          Technical reference for the multi-parameter C++ forensic text analysis engine.
        </p>
      </div>

      <div className="docs-sections">
        {/* Signal Matrix Section */}
        <div className="forensic-card docs-card">
          <h3 className="doc-section-title text-cyan font-mono">1. ENGINE SIGNAL MATRIX</h3>
          <p className="doc-p">
            PhantomNet evaluates text samples across 5 independent dimension vectors to calculate an un-spoofable authorship probability score:
          </p>

          <ul className="doc-ul font-mono">
            <li><strong>Stylometric Signal (0.00–1.00):</strong> Evaluates sentence length variance, parts-of-speech distributions, and lexical richness.</li>
            <li><strong>Statistical Signal (0.00–1.00):</strong> Measures word-transition entropy and perplexity fluctuations.</li>
            <li><strong>Readability Signal (0.00–1.00):</strong> Calculates automated readability indexes (Flesch-Kincaid, Gunning Fog).</li>
            <li><strong>Fingerprint Signal (0.00–1.00):</strong> Stylistic n-gram hash comparisons against known model signatures.</li>
            <li><strong>Similarity Signal (0.00–1.00):</strong> High-dimensional embedding distance alignment with modern LLM output spaces.</li>
          </ul>
        </div>

        {/* API Endpoint Contract */}
        <div className="forensic-card docs-card">
          <h3 className="doc-section-title text-cyan font-mono">2. BACKEND API CONTRACT</h3>
          <p className="doc-p">
            The FastAPI service wraps the native C++ executable executable and exposes the following contract:
          </p>

          <div className="api-box font-mono">
            <div className="api-method"><span className="post-badge">POST</span> http://127.0.0.1:8000/analyze</div>
            <pre className="code-block">{`// Request Body
{
  "text": "String sample to analyze..."
}

// Response Contract (200 OK)
{
  "verdict": "Mixed Characteristics",
  "aiProbability": 61.59,
  "humanProbability": 38.41,
  "confidence": 53.96,
  "reliability": 53.96,
  "reliabilityGrade": "Low",
  "engineScores": {
    "stylometric": 0.75,
    "statistical": 0.48,
    "readability": 0.58,
    "fingerprint": 0.46,
    "similarity": 1.00
  },
  "modelSimilarity": {
    "gpt": 41.11,
    "claude": 48.06,
    "gemini": 47.83,
    "deepseek": 45.85,
    "copilot": 44.60,
    "mistral": 47.00,
    "llama": 46.94
  },
  "evidence": [ ... ],
  "recommendation": "..."
}`}</pre>
          </div>
        </div>
      </div>

      <style>{`
        .docs-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 20px 0;
        }

        .docs-header {
          text-align: center;
          margin-bottom: 28px;
        }

        .docs-title {
          font-size: 30px;
          font-weight: 800;
          margin-bottom: 6px;
        }

        .docs-subtitle {
          color: var(--text-secondary);
          font-size: 15px;
        }

        .docs-sections {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .docs-card {
          background: rgba(18, 22, 36, 0.85);
          padding: 24px;
        }

        .doc-section-title {
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.08em;
          margin-bottom: 12px;
        }

        .doc-p {
          color: var(--text-secondary);
          font-size: 14px;
          line-height: 1.6;
          margin-bottom: 14px;
        }

        .doc-ul {
          display: flex;
          flex-direction: column;
          gap: 10px;
          font-size: 12px;
          color: var(--text-primary);
          padding-left: 20px;
        }

        .api-box {
          background: rgba(10, 13, 20, 0.6);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 16px;
        }

        .api-method {
          font-size: 13px;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .post-badge {
          background: rgba(0, 240, 255, 0.15);
          color: var(--cyan-primary);
          border: 1px solid var(--cyan-primary);
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 11px;
        }

        .code-block {
          color: #a5f3fc;
          font-size: 12px;
          line-height: 1.5;
          overflow-x: auto;
        }
      `}</style>
    </div>
  );
};
