import React, { useState } from "react";

interface SignupViewProps {
  onSignup: () => void;
  onLogin: () => void;
}

export const SignupView: React.FC<SignupViewProps> = ({
  onSignup,
  onLogin,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Please complete all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");

    // Temporary frontend flow.
    // Real authentication will be connected with Supabase next.
    onSignup();
  };

  return (
    <div className="signup-page">
      <div className="signup-grid" />

      <div className="signup-container">

        <div className="signup-brand">
          <div className="brand-mark">PN</div>

          <div>
            <div className="brand-name">PHANTOMNET</div>
            <div className="brand-subtitle font-mono">
              FORENSIC LINGUISTIC INTELLIGENCE
            </div>
          </div>
        </div>

        <div className="signup-card">

          <div className="signup-header">
            <div className="signup-kicker font-mono">
              INITIALIZE IDENTITY
            </div>

            <h1>Create your account.</h1>

            <p>
              Create a PhantomNet account to access your forensic
              analysis workspace.
            </p>
          </div>

          {error && (
            <div className="signup-error font-mono">
              ⚠ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="field">
              <label className="font-mono">
                FULL NAME
              </label>

              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            </div>

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
              <label className="font-mono">
                PASSWORD
              </label>

              <input
                type="password"
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>

            <div className="field">
              <label className="font-mono">
                CONFIRM PASSWORD
              </label>

              <input
                type="password"
                placeholder="Repeat your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>

            <button
              type="submit"
              className="signup-primary"
              disabled={
                !name.trim() ||
                !email.trim() ||
                !password ||
                !confirmPassword
              }
            >
              <span>CREATE PHANTOMNET ACCOUNT</span>
              <span className="signup-arrow">→</span>
            </button>

          </form>

          <div className="signup-divider">
            <span />
            <span className="font-mono">ALREADY REGISTERED?</span>
            <span />
          </div>

          <button
            type="button"
            className="login-button-secondary"
            onClick={onLogin}
          >
            BACK TO LOGIN
          </button>

          <div className="signup-benefits">

            <div className="benefit">
              <span>⚡</span>
              <div>
                <strong>20 INITIAL CREDITS</strong>
                <small>Start analyzing immediately</small>
              </div>
            </div>

            <div className="benefit">
              <span>◈</span>
              <div>
                <strong>FORENSIC WORKSPACE</strong>
                <small>Save and review your analyses</small>
              </div>
            </div>

          </div>

        </div>

        <div className="signup-footer font-mono">
          PHANTOMNET v1.0.0
          <span>•</span>
          SECURE ANALYSIS PLATFORM
        </div>

      </div>

      <style>{`
        .signup-page {
          min-height: 100vh;
          width: 100%;
          background: #07090e;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: 30px 20px;
        }

        .signup-grid {
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

        .signup-grid::after {
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

        .signup-container {
          width: 100%;
          max-width: 460px;
          position: relative;
          z-index: 2;
        }

        .signup-brand {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 22px;
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
          box-shadow: 0 0 20px rgba(0, 240, 255, 0.08);
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

        .signup-card {
          background:
            linear-gradient(
              145deg,
              rgba(18, 22, 36, 0.97),
              rgba(10, 13, 20, 0.97)
            );
          border: 1px solid rgba(148, 163, 184, 0.14);
          border-radius: 14px;
          padding: 30px;
          box-shadow:
            0 30px 80px rgba(0, 0, 0, 0.45),
            0 0 40px rgba(0, 240, 255, 0.035);
          backdrop-filter: blur(18px);
        }

        .signup-header {
          margin-bottom: 22px;
        }

        .signup-kicker {
          color: var(--cyan-primary);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.14em;
          margin-bottom: 8px;
        }

        .signup-header h1 {
          font-size: 29px;
          line-height: 1.15;
          margin: 0 0 8px;
          font-weight: 800;
        }

        .signup-header p {
          color: var(--text-secondary);
          font-size: 13px;
          line-height: 1.6;
          margin: 0;
        }

        .signup-error {
          background: rgba(255, 51, 102, 0.08);
          border: 1px solid rgba(255, 51, 102, 0.35);
          color: #ff6688;
          padding: 10px 12px;
          border-radius: 7px;
          font-size: 9px;
          margin-bottom: 16px;
        }

        .field {
          margin-bottom: 15px;
        }

        .field label {
          display: block;
          color: var(--text-muted);
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.1em;
          margin-bottom: 7px;
        }

        .field input {
          width: 100%;
          box-sizing: border-box;
          background: rgba(5, 8, 13, 0.75);
          border: 1px solid rgba(148, 163, 184, 0.16);
          border-radius: 8px;
          color: var(--text-primary);
          padding: 12px 14px;
          font-size: 13px;
          outline: none;
          transition: all 180ms ease;
        }

        .field input::placeholder {
          color: #475569;
        }

        .field input:focus {
          border-color: rgba(0, 240, 255, 0.55);
          box-shadow: 0 0 0 3px rgba(0, 240, 255, 0.07);
        }

        .signup-primary {
          width: 100%;
          border: 1px solid rgba(0, 240, 255, 0.6);
          border-radius: 8px;
          padding: 13px 15px;
          margin-top: 3px;
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
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.07em;
          cursor: pointer;
          transition: all 180ms ease;
        }

        .signup-primary:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 0 24px rgba(0, 240, 255, 0.2);
        }

        .signup-primary:disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }

        .signup-arrow {
          font-size: 18px;
        }

        .signup-divider {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 21px 0 15px;
        }

        .signup-divider span:first-child,
        .signup-divider span:last-child {
          height: 1px;
          flex: 1;
          background: rgba(148, 163, 184, 0.12);
        }

        .signup-divider span:nth-child(2) {
          color: var(--text-muted);
          font-size: 8px;
          white-space: nowrap;
        }

        .login-button-secondary {
          width: 100%;
          background: transparent;
          border: 1px solid rgba(148, 163, 184, 0.2);
          color: var(--text-primary);
          border-radius: 8px;
          padding: 11px;
          font-family: monospace;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.08em;
          cursor: pointer;
          transition: all 180ms ease;
        }

        .login-button-secondary:hover {
          border-color: rgba(0, 240, 255, 0.4);
          color: var(--cyan-primary);
          background: rgba(0, 240, 255, 0.04);
        }

        .signup-benefits {
          display: flex;
          flex-direction: column;
          gap: 9px;
          margin-top: 20px;
          padding-top: 18px;
          border-top: 1px solid rgba(148, 163, 184, 0.1);
        }

        .benefit {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .benefit > span {
          width: 26px;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(0, 240, 255, 0.2);
          color: var(--cyan-primary);
          border-radius: 6px;
          font-size: 11px;
        }

        .benefit div {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .benefit strong {
          font-family: monospace;
          font-size: 8px;
          letter-spacing: 0.06em;
        }

        .benefit small {
          color: var(--text-muted);
          font-size: 9px;
        }

        .signup-footer {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-top: 17px;
          color: #475569;
          font-size: 8px;
          letter-spacing: 0.08em;
        }

        @media (max-width: 520px) {
          .signup-page {
            padding: 18px 14px;
          }

          .signup-card {
            padding: 23px 19px;
          }

          .signup-header h1 {
            font-size: 25px;
          }

          .signup-footer {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </div>
  );
};