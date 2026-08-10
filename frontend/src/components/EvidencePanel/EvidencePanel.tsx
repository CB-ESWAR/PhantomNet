import React from "react";

interface EvidencePanelProps {
  evidence: string[];
}

export const EvidencePanel: React.FC<EvidencePanelProps> = ({ evidence }) => {
  return (
    <div className="forensic-card evidence-card animate-fade-in">
      <div className="evidence-header font-mono">
        <div className="evidence-title">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00f0ff" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
          FORENSIC EVIDENCE
        </div>
        <div className="evidence-tag">EXTRACTED ENGINE SIGNALS & FINDINGS</div>
      </div>

      {evidence && evidence.length > 0 ? (
        <div className="evidence-list">
          {evidence.map((item, idx) => (
            <div key={idx} className="evidence-item">
              <span className="evidence-badge font-mono">SIGNAL #{idx + 1}</span>
              <p className="evidence-text">{item}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="evidence-empty font-mono">
          <span className="empty-icon font-mono">⚡</span>
          <span>No specific forensic evidence signals extracted for this sample.</span>
        </div>
      )}

      <style>{`
        .evidence-card {
          margin-bottom: 24px;
          background: rgba(18, 22, 36, 0.85);
          padding: 24px 28px;
        }

        .evidence-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .evidence-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: var(--cyan-primary);
        }

        .evidence-tag {
          font-size: 10px;
          color: var(--text-muted);
          letter-spacing: 0.08em;
        }

        .evidence-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .evidence-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          background: rgba(10, 13, 20, 0.5);
          border: 1px solid var(--border-subtle);
          border-left: 3px solid var(--cyan-primary);
          border-radius: var(--radius-sm);
          padding: 12px 16px;
        }

        .evidence-badge {
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: var(--cyan-primary);
          background: rgba(0, 240, 255, 0.08);
          border: 1px solid rgba(0, 240, 255, 0.2);
          padding: 4px 8px;
          border-radius: 4px;
          white-space: nowrap;
        }

        .evidence-text {
          font-size: 14px;
          color: var(--text-primary);
          line-height: 1.5;
        }

        .evidence-empty {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: rgba(10, 13, 20, 0.4);
          border: 1px dashed var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 24px;
          font-size: 12px;
          color: var(--text-muted);
        }
      `}</style>
    </div>
  );
};
