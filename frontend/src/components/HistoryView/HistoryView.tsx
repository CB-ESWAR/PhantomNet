import React from "react";
import { AnalyzeResponse } from "../../services/api";

interface HistoryViewProps {
  historyList: { text: string; result: AnalyzeResponse; timestamp: string }[];
  onSelectHistoryItem: (text: string, result: AnalyzeResponse) => void;
  onClearHistory: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  historyList,
  onSelectHistoryItem,
  onClearHistory,
}) => {
  return (
    <div className="history-container animate-fade-in">
      <div className="history-header">
        <div>
          <h2 className="history-title text-gradient">Forensic Session History</h2>
          <p className="history-subtitle">Log of recent text analyses conducted during your session.</p>
        </div>

        {historyList.length > 0 && (
          <button className="btn-secondary font-mono" onClick={onClearHistory}>
            CLEAR HISTORY
          </button>
        )}
      </div>

      {historyList.length > 0 ? (
        <div className="history-list">
          {historyList.map((item, index) => (
            <div
              key={index}
              className="forensic-card history-card interactive"
              onClick={() => onSelectHistoryItem(item.text, item.result)}
            >
              <div className="history-item-top font-mono">
                <span className="history-verdict text-cyan">{item.result.verdict}</span>
                <span className="history-time">{item.timestamp}</span>
              </div>

              <p className="history-snippet">
                "{item.text.slice(0, 140)}{item.text.length > 140 ? "..." : ""}"
              </p>

              <div className="history-item-bottom font-mono">
                <span>AI: {item.result.aiProbability.toFixed(1)}%</span>
                <span>HUMAN: {item.result.humanProbability.toFixed(1)}%</span>
                <span>RELIABILITY: {item.result.reliabilityGrade}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="forensic-card empty-history font-mono">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
          <span>No analysis history recorded in this session yet. Run an analysis on the Primary Workspace to record entries.</span>
        </div>
      )}

      <style>{`
        .history-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 20px 0;
        }

        .history-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .history-title {
          font-size: 28px;
          font-weight: 800;
        }

        .history-subtitle {
          color: var(--text-secondary);
          font-size: 14px;
        }

        .history-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .history-card {
          cursor: pointer;
          padding: 16px 20px;
          background: rgba(18, 22, 36, 0.7);
        }

        .history-item-top {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          font-size: 11px;
          font-weight: 700;
        }

        .history-verdict {
          letter-spacing: 0.08em;
        }

        .history-time {
          color: var(--text-muted);
        }

        .history-snippet {
          font-size: 13px;
          color: var(--text-primary);
          margin-bottom: 12px;
          font-style: italic;
        }

        .history-item-bottom {
          display: flex;
          gap: 20px;
          font-size: 11px;
          color: var(--text-muted);
        }

        .empty-history {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 32px;
          color: var(--text-muted);
          font-size: 13px;
          justify-content: center;
          text-align: center;
        }
      `}</style>
    </div>
  );
};
