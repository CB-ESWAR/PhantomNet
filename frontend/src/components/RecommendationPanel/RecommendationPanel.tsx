import React from "react";

interface RecommendationPanelProps {
  recommendation: string;
}

export const RecommendationPanel: React.FC<RecommendationPanelProps> = ({ recommendation }) => {
  return (
    <div className="forensic-card recommendation-card animate-fade-in">
      <div className="recommendation-header font-mono">
        <div className="recommendation-title">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          EXPERT CONCLUSION & RECOMMENDATION
        </div>
        <div className="recommendation-tag">FINAL ENGINE ASSESSMENT REPORT</div>
      </div>

      <div className="recommendation-content font-mono">
        <div className="quote-mark">“</div>
        <p className="recommendation-text">{recommendation}</p>
      </div>

      <style>{`
        .recommendation-card {
          margin-bottom: 24px;
          background: rgba(18, 22, 36, 0.85);
          border: 1px solid var(--border-cyan);
          padding: 24px 28px;
          box-shadow: 0 0 20px rgba(0, 240, 255, 0.08);
        }

        .recommendation-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .recommendation-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--cyan-primary);
        }

        .recommendation-tag {
          font-size: 10px;
          color: var(--text-muted);
          letter-spacing: 0.08em;
        }

        .recommendation-content {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          background: rgba(10, 13, 20, 0.6);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 18px 22px;
        }

        .quote-mark {
          font-size: 32px;
          line-height: 1;
          color: var(--cyan-primary);
          opacity: 0.8;
          font-family: Georgia, serif;
        }

        .recommendation-text {
          font-size: 14px;
          color: var(--text-primary);
          line-height: 1.6;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};
