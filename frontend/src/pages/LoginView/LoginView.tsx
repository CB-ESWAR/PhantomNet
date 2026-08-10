import React, { useState } from "react";

interface LoginViewProps {
  onLogin: () => void;
  onSignup: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({
  onLogin,
  onSignup,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      return;
    }

    // Temporary UI flow.
    // Real authentication will be connected later.
    onLogin();
  };

  return (
    <div className="login-page">
      <div className="login-grid" />

      <div className="login-container">

        <div className="login-brand">
          <div className="brand-mark">
            PN
          </div>

          <div>
            <div className="brand-name">
              PHANTOMNET
            </div>

            <div className="brand-subtitle font-mono">
              FORENSIC LINGUISTIC INTELLIGENCE
            </div>
          </div>
        </div>

        <div className="login-card">

          <div className="login-card-header">
            <div className="login-kicker font-mono">
              SECURE ACCESS
            </div>

            <h1>
              Welcome back.
            </h1>

            <p>
              Sign in to access your PhantomNet analysis workspace.
            </p>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="field">
              <label className="font-mono">
                EMAIL ADDRESS
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div className="field">
              <div className="password-label-row">
                <label className="font-mono">
                  PASSWORD
                </label>

                <button
                  type="button"
                  className="forgot-button font-mono"
                >
                  FORGOT PASSWORD?
                </button>
              </div>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              className="login-button"
              disabled={!email.trim() || !password.trim()}
            >
              <span>
                ACCESS PHANTOMNET
              </span>

              <span className="login-arrow">
                →
              </span>
            </button>

          </form>

          <div className="login-divider">
            <span />
            <span className="font-mono">
              NEW TO PHANTOMNET?
            </span>
            <span />
          </div>

          <button
            type="button"
            className="signup-button"
            onClick={onSignup}
          >
            CREATE ACCOUNT
          </button>

          <div className="login-security font-mono">
            <span className="status-dot" />
            SECURE FORENSIC WORKSPACE
          </div>

        </div>

        <div className="login-footer font-mono">
          PHANTOMNET v1.0.0
          <span>•</span>
          C++ ENGINE
          <span>•</span>
          FASTAPI
          <span>•</span>
          REACT
        </div>

      </div>

      <style>{`
        .login-page {
          min-height: 100vh;
          width: 100%;
          background: #07090e;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: 32px 20px;
        }

        .login-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.35;
          background-image:
            linear-gradient(
              rgba(0, 240, 255, 0.035) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(0, 240, 255, 0.035) 1px,
              transparent 1px
            );
          background-size: 42px 42px;
        }

        .login-grid::after {
          content: "";
          position: absolute;
          width: 700px;
          height: 700px;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          background: radial-gradient(
            circle,
            rgba(0, 240, 255, 0.07),
            transparent 65%
          );
        }

        .login-container {
          width: 100%;
          max-width: 440px;
          position: relative;
          z-index: 2;
        }

        .login-brand {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 24px;
        }

        .brand-mark {
          width: 46px;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(0, 240, 255, 0.55);
          background: rgba(0, 240, 255, 0.07);
          color: var(--cyan-primary);
          font-family: monospace;
          font-weight: 900;
          letter-spacing: -0.08em;
          box-shadow:
            0 0 20px rgba(0, 240, 255, 0.08);
        }

        .brand-name {
          font-size: 18px;
          font-weight: 900;
          letter-spacing: 0.12em;
        }

        .brand-subtitle {
          color: var(--text-muted);
          font-size: 8px;
          letter-spacing: 0.12em;
          margin-top: 3px;
        }

        .login-card {
          background:
            linear-gradient(
              145deg,
              rgba(18, 22, 36, 0.96),
              rgba(10, 13, 20, 0.96)
            );
          border: 1px solid rgba(148, 163, 184, 0.14);
          border-radius: 14px;
          padding: 32px;
          box-shadow:
            0 30px 80px rgba(0, 0, 0, 0.45),
            0 0 40px rgba(0, 240, 255, 0.035);
          backdrop-filter: blur(18px);
        }

        .login-card-header {
          margin-bottom: 28px;
        }

        .login-kicker {
          color: var(--cyan-primary);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.14em;
          margin-bottom: 9px;
        }

        .login-card-header h1 {
          font-size: 30px;
          line-height: 1.15;
          margin: 0 0 8px;
          font-weight: 800;
        }

        .login-card-header p {
          color: var(--text-secondary);
          font-size: 13px;
          line-height: 1.6;
          margin: 0;
        }

        .field {
          margin-bottom: 19px;
        }

        .field label {
          display: block;
          color: var(--text-muted);
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.1em;
          margin-bottom: 8px;
        }

        .password-label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .password-label-row label {
          margin-bottom: 8px;
        }

        .forgot-button {
          background: none;
          border: none;
          padding: 0;
          color: var(--cyan-primary);
          font-size: 8px;
          letter-spacing: 0.05em;
          cursor: pointer;
        }

        .forgot-button:hover {
          text-decoration: underline;
        }

        .field input {
          width: 100%;
          box-sizing: border-box;
          background: rgba(5, 8, 13, 0.75);
          border: 1px solid rgba(148, 163, 184, 0.16);
          border-radius: 8px;
          color: var(--text-primary);
          padding: 13px 14px;
          font-size: 13px;
          outline: none;
          transition:
            border-color 180ms ease,
            box-shadow 180ms ease;
        }

        .field input::placeholder {
          color: #475569;
        }

        .field input:focus {
          border-color: rgba(0, 240, 255, 0.55);
          box-shadow:
            0 0 0 3px rgba(0, 240, 255, 0.07);
        }

        .login-button {
          width: 100%;
          border: 1px solid rgba(0, 240, 255, 0.6);
          border-radius: 8px;
          padding: 13px 15px;
          margin-top: 4px;
          background: linear-gradient(
            90deg,
            rgba(0, 136, 255, 0.8),
            rgba(0, 240, 255, 0.8)
          );
          color: #031017;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: monospace;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.07em;
          cursor: pointer;
          transition: all 180ms ease;
        }

        .login-button:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow:
            0 0 24px rgba(0, 240, 255, 0.2);
        }

        .login-button:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }

        .login-arrow {
          font-size: 18px;
        }

        .login-divider {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 24px 0 18px;
        }

        .login-divider span:first-child,
        .login-divider span:last-child {
          height: 1px;
          flex: 1;
          background: rgba(148, 163, 184, 0.12);
        }

        .login-divider span:nth-child(2) {
          color: var(--text-muted);
          font-size: 8px;
          white-space: nowrap;
        }

        .signup-button {
          width: 100%;
          background: transparent;
          border: 1px solid rgba(148, 163, 184, 0.2);
          color: var(--text-primary);
          border-radius: 8px;
          padding: 12px;
          font-family: monospace;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.08em;
          cursor: pointer;
          transition: all 180ms ease;
        }

        .signup-button:hover {
          border-color: rgba(0, 240, 255, 0.4);
          color: var(--cyan-primary);
          background: rgba(0, 240, 255, 0.04);
        }

        .login-security {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          color: var(--text-muted);
          font-size: 8px;
          letter-spacing: 0.08em;
          margin-top: 22px;
        }

        .status-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px rgba(16, 185, 129, 0.7);
        }

        .login-footer {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 18px;
          color: #475569;
          font-size: 8px;
          letter-spacing: 0.08em;
        }

        @media (max-width: 520px) {
          .login-page {
            padding: 20px 14px;
          }

          .login-card {
            padding: 24px 20px;
          }

          .login-card-header h1 {
            font-size: 26px;
          }

          .login-footer {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </div>
  );
};