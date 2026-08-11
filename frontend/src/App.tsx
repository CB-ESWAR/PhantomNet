import React, { useEffect, useState } from "react";
import "./styles/index.css";

import { useAnalysis } from "./hooks/useAnalysis";
import { supabase } from "./lib/supabase";

import { Auth } from "./components/Auth/Auth";
import { Header } from "./components/Header/Header";
import { AccountView } from "./components/AccountView/AccountView";

import { AnalysisConsole } from "./components/AnalysisConsole/AnalysisConsole";
import { AnalysisProgress } from "./components/AnalysisProgress/AnalysisProgress";
import { VerdictCard } from "./components/VerdictCard/VerdictCard";
import { ProbabilitySpectrum } from "./components/ProbabilitySpectrum/ProbabilitySpectrum";
import { SignalAnalysis } from "./components/SignalAnalysis/SignalAnalysis";
import { ModelSimilarity } from "./components/ModelSimilarity/ModelSimilarity";
import { EvidencePanel } from "./components/EvidencePanel/EvidencePanel";
import { RecommendationPanel } from "./components/RecommendationPanel/RecommendationPanel";

import { CompareView } from "./components/CompareView/CompareView";
import { HistoryView } from "./components/HistoryView/HistoryView";
import { DocsView } from "./components/DocsView/DocsView";

import { AnalyzeResponse } from "./services/api";

export function App() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [activeTab, setActiveTab] = useState("analyze");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);

  const {
    text,
    setText,
    status,
    scanningSignal,
    result,
    error,
    engineOnline,
    runAnalysis,
    runFileAnalysis,
    clearConsole,
    prefillSample,
    refreshEngineHealth,
  } = useAnalysis();

  const [historyList, setHistoryList] = useState<
    {
      text: string;
      result: AnalyzeResponse;
      timestamp: string;
    }[]
  >([]);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setIsAuthenticated(!!session);
      setAuthChecking(false);
    };

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleExecuteAnalysis = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const { data: remainingCredits, error } =
    await supabase.rpc("use_credit");

  if (error) {
    console.error("Credit error:", error);
    alert("Unable to verify credits. Please try again.");
    return;
  }

  if (remainingCredits === -1) {
    alert("No credits remaining.");
    return;
  }

  window.dispatchEvent(
    new Event("phantomnet-credits-updated")
  );

  await runAnalysis();
};
const handleExecuteFileAnalysis = async (file: File) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const { data: remainingCredits, error } =
    await supabase.rpc("use_credit");

  if (error) {
    console.error("Credit error:", error);
    alert("Unable to verify credits. Please try again.");
    return;
  }

  if (remainingCredits === -1) {
    alert("No credits remaining.");
    return;
  }

  window.dispatchEvent(
    new Event("phantomnet-credits-updated")
  );

  await runFileAnalysis(file);
};

  useEffect(() => {
    if (status === "success" && result && text.trim()) {
      const now = new Date().toLocaleTimeString();

      setHistoryList((prev) => [
        {
          text,
          result,
          timestamp: now,
        },
        ...prev.filter((item) => item.text !== text),
      ]);
    }
  }, [status, result, text]);

  const handleSelectHistoryItem = (
    selectedText: string,
    _selectedResult: AnalyzeResponse
  ) => {
    prefillSample(selectedText);
    setActiveTab("analyze");
  };

  const handleClearHistory = () => {
    setHistoryList([]);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();

    setIsAuthenticated(false);
    setActiveTab("analyze");
    setHistoryList([]);
    clearConsole();
  };

  if (authChecking) {
    return (
      <div className="auth-loading-screen">
        <div className="auth-loading-box">

          <div className="auth-loading-logo">
            ◈
          </div>

          <div className="auth-loading-title font-mono">
            PHANTOMNET
          </div>

          <div className="auth-loading-status font-mono">
            INITIALIZING SECURE SESSION...
          </div>

        </div>

        <style>{`
          .auth-loading-screen {
            min-height: 100vh;
            background: #07090e;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #f8fafc;
          }

          .auth-loading-box {
            text-align: center;
          }

          .auth-loading-logo {
            width: 55px;
            height: 55px;
            margin: 0 auto 15px;
            border: 1px solid #00eaff;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #00eaff;
            font-size: 26px;
            box-shadow: 0 0 25px rgba(0, 234, 255, 0.12);
          }

          .auth-loading-title {
            color: #00eaff;
            font-size: 15px;
            font-weight: 900;
            letter-spacing: 0.15em;
            margin-bottom: 8px;
          }

          .auth-loading-status {
            color: #64748b;
            font-size: 9px;
            letter-spacing: 0.08em;
          }
        `}</style>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Auth
        onAuthenticated={() => {
          setIsAuthenticated(true);
          setActiveTab("analyze");
        }}
      />
    );
  }

  return (
    <div
  className={`app-container theme-${theme}`}
  data-theme={theme}
>

      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        engineOnline={engineOnline}
      />

      <main className="main-content">

        {activeTab === "profile" && (
          <AccountView
            mode="profile"
            engineOnline={engineOnline}
            onBack={() => setActiveTab("analyze")}
          />
        )}

        {activeTab === "settings" && (
          <AccountView
            mode="settings"
            engineOnline={engineOnline}
            onBack={() => setActiveTab("analyze")}
          />
        )}

        {activeTab === "analyze" && (
          <div className="workspace-view">

            <AnalysisConsole
              text={text}
              setText={setText}
              onAnalyze={handleExecuteAnalysis}
              onAnalyzeFile={handleExecuteFileAnalysis}
              onClear={clearConsole}
              onPrefillSample={prefillSample}
              isAnalyzing={status === "scanning"}
            />

            {status === "error" && error && (
              <div className="error-card forensic-card animate-fade-in">

                <div className="error-icon font-mono">
                  ⚠️
                </div>

                <div className="error-body">

                  <h4 className="error-title font-mono">
                    ANALYSIS ENGINE ERROR
                  </h4>

                  <p className="error-message">
                    {error}
                  </p>

                </div>

                <button
                  className="btn-secondary font-mono"
                  onClick={() => refreshEngineHealth()}
                >
                  RETRY CONNECTION
                </button>

              </div>
            )}

            {status === "scanning" && (
              <AnalysisProgress
                currentSignal={scanningSignal}
              />
            )}

            {status === "success" && result && (
              <div className="results-container">

                <VerdictCard
                  verdict={result.verdict}
                  confidence={result.confidence}
                  reliability={result.reliability}
                  reliabilityGrade={result.reliabilityGrade}
                />

                <ProbabilitySpectrum
                  aiProbability={result.aiProbability}
                  humanProbability={result.humanProbability}
                  verdict={result.verdict}
                />

                <SignalAnalysis
                  scores={result.engineScores}
                />

                <ModelSimilarity
                  similarity={result.modelSimilarity}
                />

                <EvidencePanel
                  evidence={result.evidence}
                />

                <RecommendationPanel
                  recommendation={result.recommendation}
                />

              </div>
            )}

          </div>
        )}

        {activeTab === "compare" && (
          <CompareView />
        )}

        {activeTab === "history" && (
          <HistoryView
            historyList={historyList}
            onSelectHistoryItem={handleSelectHistoryItem}
            onClearHistory={handleClearHistory}
          />
        )}

        {activeTab === "documentation" && (
          <DocsView />
        )}

      </main>

      <footer className="footer-container">

  <div className="footer-inner font-mono">

    <span>
      PHANTOMNET v1.0.0 — FORENSIC LINGUISTIC INTELLIGENCE ENGINE
    </span>

    <span>
      C++ ENGINE CORE • FASTAPI INTEGRATION
    </span>

    <span className="footer-social">
      Built with <span className="heart">♥</span> by Eswar
      <a
        href="https://www.linkedin.com/in/eswar-chandra-reddy-82a5062b6"
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn
      </a>
      <a
        href="https://www.instagram.com/c_b_eswar_07/?hl=en"
        target="_blank"
        rel="noopener noreferrer"
      >
        Instagram
      </a>
      <a
        href="https://github.com/CB-ESWAR"
        target="_blank"
        rel="noopener noreferrer"
      >
        GitHub
      </a>
    </span>

  </div>

</footer>

      <style>{`
        .app-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        .main-content {
          flex: 1;
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          padding: 32px 24px;
        }

        .workspace-view {
          width: 100%;
        }

        .error-card {
          display: flex;
          align-items: center;
          gap: 16px;
          background: rgba(255, 51, 102, 0.08);
          border: 1px solid var(--crimson-danger);
          padding: 20px 24px;
          margin-bottom: 28px;
          box-shadow: 0 0 20px rgba(255, 51, 102, 0.15);
        }

        .error-icon {
          font-size: 24px;
        }

        .error-body {
          flex: 1;
        }

        .error-title {
          font-size: 12px;
          font-weight: 800;
          color: var(--crimson-danger);
          letter-spacing: 0.08em;
          margin-bottom: 4px;
        }

        .error-message {
          font-size: 14px;
          color: var(--text-primary);
        }

        .results-container {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .footer-container {
          border-top: 1px solid var(--border-subtle);
          background: rgba(7, 9, 14, 0.9);
          padding: 16px 24px;
          margin-top: 40px;
        }

        .footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          display: flex;
          justify-content: space-between;
          gap: 20px;
          font-size: 10px;
          color: var(--text-muted);
          letter-spacing: 0.1em;
        }
          .footer-social {
  display: flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;
}

.footer-social a {
  color: #00eaff;
  text-decoration: none;
  transition: 0.2s;
}

.footer-social a:hover {
  color: #ffffff;
  text-shadow: 0 0 8px rgba(0, 234, 255, 0.5);
}

.heart {
  color: #ff4d6d;
  font-size: 12px;
}

        @media (max-width: 640px) {

          .main-content {
            padding: 16px 12px;
          }

          .footer-inner {
            flex-direction: column;
            gap: 6px;
            text-align: center;
          }

          .error-card {
            flex-direction: column;
            align-items: flex-start;
          }

        }
      `}</style>

    </div>
  );
}

export default App;