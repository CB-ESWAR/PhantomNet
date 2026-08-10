import React, { useState } from "react";
import { supabase } from "../../lib/supabase";

interface AuthProps {
  onAuthenticated: () => void;
}

export const Auth: React.FC<AuthProps> = ({ onAuthenticated }) => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) throw error;

        onAuthenticated();
      } else {
        const { data, error } = await supabase.auth.signUp({
  email: email.trim(),
  password,
  options: {
  emailRedirectTo: "http://172.16.209.26:5173",
},
});

        if (error) throw error;

        if (data.session) {
          onAuthenticated();
        } else {
          setMessage(
            "Account created. Please check your email to confirm your account."
          );
        }
      }
    } catch (err: any) {
      setError(err.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-grid" />

      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <span>◈</span>
          </div>

          <div className="auth-brand">PHANTOMNET</div>

          <h1>
            {mode === "login"
              ? "Welcome back."
              : "Create your account."}
          </h1>

          <p>
            {mode === "login"
              ? "Access your forensic linguistic intelligence workspace."
              : "Create your account to start analyzing text."}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="auth-field">
            <label>EMAIL ADDRESS</label>

            <input
              type="email"
              placeholder="analyst@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="auth-field">
            <label>PASSWORD</label>

            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={
                mode === "login" ? "current-password" : "new-password"
              }
            />
          </div>

          {error && <div className="auth-error">{error}</div>}

          {message && <div className="auth-success">{message}</div>}

          <button
            className="auth-submit"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "AUTHENTICATING..."
              : mode === "login"
              ? "ENTER PHANTOMNET"
              : "CREATE ACCOUNT"}
          </button>
        </form>

        <div className="auth-switch">
          <span>
            {mode === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
          </span>

          <button
            type="button"
            onClick={() => {
              setMode(mode === "login" ? "signup" : "login");
              setError("");
              setMessage("");
            }}
          >
            {mode === "login" ? "CREATE ACCOUNT" : "SIGN IN"}
          </button>
        </div>

        <div className="auth-footer">
          <span>PHANTOMNET v1.0.0</span>
          <span>FORENSIC LINGUISTIC INTELLIGENCE</span>
        </div>
      </div>

      <style>{`
        .auth-page {
          min-height: 100vh;
          background: #07090e;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 30px 20px;
          position: relative;
          overflow: hidden;
          color: #f1f5f9;
        }

        .auth-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(0, 240, 255, 0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.035) 1px, transparent 1px);
          background-size: 42px 42px;
          pointer-events: none;
        }

        .auth-card {
          width: 100%;
          max-width: 470px;
          background: rgba(15, 19, 30, 0.96);
          border: 1px solid rgba(100, 116, 139, 0.3);
          border-radius: 14px;
          padding: 38px;
          position: relative;
          z-index: 1;
          box-shadow:
            0 0 40px rgba(0, 240, 255, 0.05),
            0 25px 80px rgba(0, 0, 0, 0.45);
        }

        .auth-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .auth-logo {
          width: 54px;
          height: 54px;
          margin: 0 auto 14px;
          border: 1px solid #00eaff;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #00eaff;
          font-size: 27px;
          box-shadow: 0 0 20px rgba(0, 234, 255, 0.15);
        }

        .auth-brand {
          color: #00eaff;
          font-family: monospace;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.18em;
          margin-bottom: 18px;
        }

        .auth-header h1 {
          margin: 0 0 8px;
          font-size: 28px;
          font-weight: 800;
        }

        .auth-header p {
          margin: 0;
          color: #94a3b8;
          font-size: 13px;
          line-height: 1.6;
        }

        .auth-field {
          margin-bottom: 18px;
        }

        .auth-field label {
          display: block;
          margin-bottom: 7px;
          color: #64748b;
          font-family: monospace;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
        }

        .auth-field input {
          width: 100%;
          box-sizing: border-box;
          background: #0a0e17;
          border: 1px solid #263044;
          border-radius: 8px;
          padding: 13px 14px;
          color: #f8fafc;
          font-size: 14px;
          outline: none;
          transition: 0.2s;
        }

        .auth-field input:focus {
          border-color: #00eaff;
          box-shadow: 0 0 12px rgba(0, 234, 255, 0.1);
        }

        .auth-field input::placeholder {
          color: #475569;
        }

        .auth-error,
        .auth-success {
          padding: 11px 13px;
          border-radius: 7px;
          font-size: 12px;
          margin-bottom: 16px;
        }

        .auth-error {
          color: #ff6688;
          background: rgba(255, 51, 102, 0.08);
          border: 1px solid rgba(255, 51, 102, 0.25);
        }

        .auth-success {
          color: #34d399;
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.25);
        }

        .auth-submit {
          width: 100%;
          border: 0;
          border-radius: 8px;
          padding: 14px;
          background: linear-gradient(90deg, #00d9ff, #008cff);
          color: #031018;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: 0.2s;
        }

        .auth-submit:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 0 22px rgba(0, 217, 255, 0.25);
        }

        .auth-submit:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }

        .auth-switch {
          margin-top: 22px;
          padding-top: 20px;
          border-top: 1px solid #1e293b;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 7px;
          flex-wrap: wrap;
          color: #64748b;
          font-size: 12px;
        }

        .auth-switch button {
          border: 0;
          background: none;
          color: #00eaff;
          cursor: pointer;
          font-family: monospace;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.06em;
        }

        .auth-footer {
          margin-top: 25px;
          display: flex;
          justify-content: space-between;
          color: #334155;
          font-family: monospace;
          font-size: 8px;
          letter-spacing: 0.06em;
        }

        @media (max-width: 520px) {
          .auth-card {
            padding: 28px 22px;
          }

          .auth-footer {
            flex-direction: column;
            gap: 5px;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default Auth;