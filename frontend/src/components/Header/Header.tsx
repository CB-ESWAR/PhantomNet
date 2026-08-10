import React from "react";
import { UserProfile } from "../UserProfile/UserProfile";

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  engineOnline: boolean | null;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  engineOnline,
}) => {
  const tabs = [
    {
      id: "analyze",
      label: "Analyze",
    },
    {
      id: "compare",
      label: "Compare",
    },
    {
      id: "history",
      label: "History",
    },
    {
      id: "documentation",
      label: "Documentation",
    },
  ];

  return (
    <header className="phantom-header">
      <div className="header-inner">

        <div
          className="brand"
          onClick={() => onTabChange("analyze")}
        >
          <div className="brand-icon">
            ◈
          </div>

          <div className="brand-text">
            <div className="brand-name">
              PHANTOMNET
            </div>

            <div className="brand-subtitle font-mono">
              FORENSIC AI INTELLIGENCE
            </div>
          </div>
        </div>

        <nav className="header-nav">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`nav-button ${
                activeTab === tab.id ? "active" : ""
              }`}
              onClick={() => onTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="header-right">

          <div
            className={`engine-status ${
              engineOnline === true
                ? "online"
                : engineOnline === false
                ? "offline"
                : "checking"
            } font-mono`}
          >
            <span className="status-dot" />

            {engineOnline === true
              ? "ENGINE ONLINE"
              : engineOnline === false
              ? "ENGINE OFFLINE"
              : "CHECKING ENGINE"}
          </div>

          <UserProfile onNavigate={onTabChange} />

        </div>

      </div>

      <style>{`
        .phantom-header {
          position: sticky;
          top: 0;
          z-index: 100;
          width: 100%;
          background: rgba(7, 9, 14, 0.92);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border-subtle);
        }

        .header-inner {
          width: 100%;
          min-height: 72px;
          padding: 0 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          min-width: 250px;
        }

        .brand-icon {
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border-cyan);
          border-radius: 10px;
          color: var(--cyan-primary);
          font-size: 24px;
          background: rgba(0, 240, 255, 0.04);
          box-shadow:
            0 0 18px rgba(0, 240, 255, 0.12);
        }

        .brand-name {
          color: var(--text-primary);
          font-size: 20px;
          font-weight: 900;
          letter-spacing: 0.06em;
        }

        .brand-subtitle {
          margin-top: 2px;
          color: var(--text-muted);
          font-size: 8px;
          letter-spacing: 0.2em;
        }

        .header-nav {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 4px;
          border: 1px solid var(--border-subtle);
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.025);
        }

        .nav-button {
          border: 1px solid transparent;
          background: transparent;
          color: var(--text-secondary);
          padding: 10px 18px;
          border-radius: 7px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .nav-button:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.04);
        }

        .nav-button.active {
          color: var(--cyan-primary);
          border-color: var(--border-cyan);
          background: rgba(0, 240, 255, 0.06);
          box-shadow:
            0 0 12px rgba(0, 240, 255, 0.08);
        }

        .header-right {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 12px;
          min-width: 300px;
        }

        .engine-status {
          min-width: 145px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 9px 13px;
          border: 1px solid var(--border-subtle);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.025);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
        }

        .engine-status.online {
          color: var(--cyan-primary);
        }

        .engine-status.offline {
          color: var(--crimson-danger);
        }

        .engine-status.checking {
          color: var(--amber-warning);
        }

        .status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: currentColor;
          box-shadow: 0 0 10px currentColor;
        }

        @media (max-width: 1100px) {
          .header-inner {
            padding: 0 16px;
            gap: 12px;
          }

          .brand {
            min-width: auto;
          }

          .header-right {
            min-width: auto;
          }

          .engine-status {
            min-width: auto;
          }
        }

        @media (max-width: 900px) {
          .brand-subtitle {
            display: none;
          }

          .brand-name {
            font-size: 16px;
          }

          .header-nav {
            flex: 1;
            justify-content: center;
          }

          .nav-button {
            padding: 9px 10px;
          }

          .engine-status {
            min-width: auto;
            padding: 9px;
            font-size: 0;
          }

          .engine-status .status-dot {
            font-size: initial;
          }
        }

        @media (max-width: 700px) {
          .header-inner {
            gap: 8px;
          }

          .header-right {
            gap: 6px;
          }

          .engine-status {
            display: none;
          }

          .nav-button {
            font-size: 10px;
            padding: 8px 7px;
          }
        }

        @media (max-width: 600px) {
          .brand-text {
            display: none;
          }

          .header-nav {
            gap: 2px;
          }

          .nav-button {
            font-size: 9px;
            padding: 8px 5px;
          }
        }
      `}</style>
    </header>
  );
};