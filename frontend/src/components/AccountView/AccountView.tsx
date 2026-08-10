import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

interface AccountViewProps {
  mode: "profile" | "settings";
  engineOnline: boolean | null;
  onBack: () => void;
}

interface Profile {
  full_name: string;
  email: string;
  credits: number;
}

export const AccountView: React.FC<AccountViewProps> = ({
  mode,
  engineOnline,
  onBack,
}) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("full_name,email,credits")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error("Account profile error:", error);
      setLoading(false);
      return;
    }

    setProfile({
      full_name:
        data.full_name ||
        user.email?.split("@")[0] ||
        "User",
      email: data.email || user.email || "",
      credits: data.credits ?? 0,
    });

    setLoading(false);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="account-page">
        <div className="account-loading">
          LOADING ACCOUNT...
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="account-page">
        <div className="account-error">
          Unable to load account information.
        </div>

        <button
          className="account-back-button"
          onClick={onBack}
        >
          ← Back to Analysis
        </button>
      </div>
    );
  }

  const displayName =
    profile.full_name?.trim() || "User";

  const initial =
    displayName.charAt(0).toUpperCase();

  if (mode === "settings") {
    return (
      <main className="account-page">
        <div className="account-container">

          <div className="account-heading">
            <span className="account-eyebrow">
              SYSTEM CONFIGURATION
            </span>

            <h1>Settings</h1>

            <p>
              Manage your PhantomNet account and
              application preferences.
            </p>
          </div>

          <section className="settings-card">

            <div className="settings-row">
              <div>
                <h3>Account</h3>
                <p>
                  Authenticated PhantomNet account
                </p>
              </div>

              <span className="settings-value">
                ACTIVE
              </span>
            </div>

            <div className="settings-divider" />

            <div className="settings-row">
              <div>
                <h3>Email</h3>
                <p>
                  Your registered email address
                </p>
              </div>

              <span className="settings-email">
                {profile.email}
              </span>
            </div>

            <div className="settings-divider" />

            <div className="settings-row">
              <div>
                <h3>Analysis Engine</h3>
                <p>
                  Connection status
                </p>
              </div>

              <span
                className={`engine-badge ${
                  engineOnline
                    ? "engine-online"
                    : "engine-offline"
                }`}
              >
                <span className="small-dot" />

                {engineOnline
                  ? "ONLINE"
                  : "OFFLINE"}
              </span>
            </div>

            <div className="settings-divider" />

            <div className="settings-row">
              <div>
                <h3>Account Type</h3>
                <p>
                  Current PhantomNet plan
                </p>
              </div>

              <span className="plan-badge">
                FREE
              </span>
            </div>

            <div className="settings-divider" />

            <div className="settings-row danger-row">
              <div>
                <h3>Sign out</h3>
                <p>
                  End your current PhantomNet
                  session.
                </p>
              </div>

              <button
                className="settings-logout"
                onClick={logout}
              >
                Logout
              </button>
            </div>

          </section>

          <button
            className="account-back-button"
            onClick={onBack}
          >
            ← Back to Analysis
          </button>

        </div>

        <style>{`
          .account-page {
            width: 100%;
            min-height: calc(100vh - 72px);
            padding: 55px 24px 80px;
          }

          .account-container {
            width: 100%;
            max-width: 1000px;
            margin: 0 auto;
          }

          .account-heading {
            margin-bottom: 30px;
          }

          .account-eyebrow {
            color: var(--cyan-primary);
            font-family: monospace;
            font-size: 10px;
            letter-spacing: 0.18em;
          }

          .account-heading h1 {
            margin: 8px 0 0;
            color: var(--text-primary);
            font-size: 42px;
            font-weight: 900;
          }

          .account-heading p {
            margin-top: 10px;
            color: var(--text-muted);
            font-size: 14px;
          }

          .settings-card {
            padding: 10px 28px;
            border: 1px solid var(--border-subtle);
            border-radius: 16px;
            background: rgba(12, 16, 25, 0.92);
            box-shadow:
              0 20px 60px rgba(0, 0, 0, 0.25);
          }

          .settings-row {
            min-height: 90px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
          }

          .settings-row h3 {
            margin: 0;
            color: var(--text-primary);
            font-size: 14px;
          }

          .settings-row p {
            margin: 6px 0 0;
            color: var(--text-muted);
            font-size: 11px;
          }

          .settings-value {
            padding: 7px 12px;
            border: 1px solid rgba(0, 240, 255, 0.2);
            border-radius: 999px;
            color: var(--cyan-primary);
            font-family: monospace;
            font-size: 9px;
          }

          .settings-email {
            max-width: 300px;
            overflow: hidden;
            text-overflow: ellipsis;
            color: var(--text-secondary);
            font-family: monospace;
            font-size: 11px;
          }

          .settings-divider {
            height: 1px;
            background: var(--border-subtle);
          }

          .engine-badge {
            display: flex;
            align-items: center;
            gap: 7px;
            font-family: monospace;
            font-size: 9px;
          }

          .engine-online {
            color: var(--cyan-primary);
          }

          .engine-offline {
            color: var(--crimson-danger);
          }

          .small-dot {
            width: 7px;
            height: 7px;
            border-radius: 50%;
            background: currentColor;
            box-shadow: 0 0 8px currentColor;
          }

          .plan-badge {
            padding: 7px 14px;
            border: 1px solid rgba(0, 240, 255, 0.2);
            border-radius: 999px;
            color: var(--cyan-primary);
            font-family: monospace;
            font-size: 9px;
          }

          .danger-row h3 {
            color: var(--crimson-danger);
          }

          .settings-logout {
            padding: 10px 18px;
            border: 1px solid rgba(255, 51, 102, 0.3);
            border-radius: 8px;
            background: rgba(255, 51, 102, 0.06);
            color: var(--crimson-danger);
            cursor: pointer;
            font-size: 11px;
            font-weight: 700;
          }

          .settings-logout:hover {
            background: rgba(255, 51, 102, 0.12);
          }

          .account-back-button {
            margin-top: 22px;
            padding: 11px 16px;
            border: 1px solid var(--border-cyan);
            border-radius: 8px;
            background: rgba(0, 240, 255, 0.04);
            color: var(--cyan-primary);
            cursor: pointer;
            font-size: 11px;
          }

          .account-loading,
          .account-error {
            max-width: 1000px;
            margin: 100px auto;
            color: var(--text-muted);
            font-family: monospace;
            text-align: center;
          }

          .account-error {
            color: var(--crimson-danger);
          }

          @media (max-width: 650px) {
            .account-page {
              padding: 35px 16px;
            }

            .account-heading h1 {
              font-size: 32px;
            }

            .settings-card {
              padding: 8px 18px;
            }

            .settings-row {
              align-items: flex-start;
              flex-direction: column;
              justify-content: center;
            }

            .settings-email {
              max-width: 100%;
            }
          }
        `}</style>
      </main>
    );
  }

  return (
    <main className="account-page">
      <div className="account-container">

        <div className="account-heading">
          <span className="account-eyebrow">
            USER IDENTITY
          </span>

          <h1>Your Profile</h1>

          <p>
            Your PhantomNet account information
            and analysis credits.
          </p>
        </div>

        <div className="profile-grid">

          <section className="profile-card">

            <div className="profile-avatar">
              {initial}
            </div>

            <h2>{displayName}</h2>

            <p className="profile-email-main">
              {profile.email}
            </p>

            <div className="profile-status">
              <span className="small-dot" />
              ACCOUNT ACTIVE
            </div>

          </section>

          <section className="credits-card">

            <span className="credits-label">
              AVAILABLE CREDITS
            </span>

            <div className="credits-number">
              <span>⚡</span>
              {profile.credits}
            </div>

            <p>
              Credits available for PhantomNet
              forensic analysis.
            </p>

            <div className="credits-progress">
              <div
                className="credits-progress-fill"
                style={{
                  width: `${Math.min(
                    profile.credits * 5,
                    100
                  )}%`,
                }}
              />
            </div>

            <span className="free-plan">
              FREE PLAN
            </span>

          </section>

        </div>

        <section className="details-card">

          <div className="details-title">
            ACCOUNT DETAILS
          </div>

          <div className="details-row">
            <span>Name</span>
            <strong>{displayName}</strong>
          </div>

          <div className="details-row">
            <span>Email</span>
            <strong>{profile.email}</strong>
          </div>

          <div className="details-row">
            <span>Credits</span>
            <strong className="cyan-text">
              ⚡ {profile.credits}
            </strong>
          </div>

          <div className="details-row">
            <span>Engine</span>
            <strong
              className={
                engineOnline
                  ? "cyan-text"
                  : "red-text"
              }
            >
              {engineOnline
                ? "ONLINE"
                : "OFFLINE"}
            </strong>
          </div>

        </section>

        <button
          className="account-back-button"
          onClick={onBack}
        >
          ← Back to Analysis
        </button>

      </div>

      <style>{`
        .account-page {
          width: 100%;
          min-height: calc(100vh - 72px);
          padding: 55px 24px 80px;
        }

        .account-container {
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
        }

        .account-heading {
          margin-bottom: 30px;
        }

        .account-eyebrow {
          color: var(--cyan-primary);
          font-family: monospace;
          font-size: 10px;
          letter-spacing: 0.18em;
        }

        .account-heading h1 {
          margin: 8px 0 0;
          color: var(--text-primary);
          font-size: 42px;
          font-weight: 900;
        }

        .account-heading p {
          margin-top: 10px;
          color: var(--text-muted);
          font-size: 14px;
        }

        .profile-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .profile-card,
        .credits-card,
        .details-card {
          border: 1px solid var(--border-subtle);
          border-radius: 16px;
          background: rgba(12, 16, 25, 0.92);
          box-shadow:
            0 20px 60px rgba(0, 0, 0, 0.25);
        }

        .profile-card {
          min-height: 300px;
          padding: 35px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .profile-avatar {
          width: 90px;
          height: 90px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 18px;
          border-radius: 50%;
          background:
            linear-gradient(
              135deg,
              #0088ff,
              #00f0ff
            );
          color: #031018;
          font-size: 34px;
          font-weight: 900;
          box-shadow:
            0 0 35px rgba(0, 240, 255, 0.15);
        }

        .profile-card h2 {
          margin: 0;
          color: var(--text-primary);
          font-size: 22px;
        }

        .profile-email-main {
          margin: 7px 0 16px;
          color: var(--text-muted);
          font-family: monospace;
          font-size: 11px;
        }

        .profile-status {
          display: flex;
          align-items: center;
          gap: 7px;
          color: var(--cyan-primary);
          font-family: monospace;
          font-size: 9px;
        }

        .small-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: currentColor;
          box-shadow: 0 0 8px currentColor;
        }

        .credits-card {
          min-height: 300px;
          padding: 35px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .credits-label {
          color: var(--text-muted);
          font-family: monospace;
          font-size: 10px;
          letter-spacing: 0.14em;
        }

        .credits-number {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 18px;
          color: var(--cyan-primary);
          font-family: monospace;
          font-size: 64px;
          font-weight: 900;
        }

        .credits-number span {
          font-size: 35px;
        }

        .credits-card p {
          max-width: 330px;
          color: var(--text-muted);
          font-size: 12px;
          line-height: 1.6;
        }

        .credits-progress {
          height: 7px;
          margin-top: 20px;
          overflow: hidden;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.06);
        }

        .credits-progress-fill {
          height: 100%;
          border-radius: inherit;
          background:
            linear-gradient(
              90deg,
              #0088ff,
              #00f0ff
            );
        }

        .free-plan {
          margin-top: 9px;
          color: var(--text-muted);
          font-family: monospace;
          font-size: 9px;
        }

        .details-card {
          margin-top: 20px;
          padding: 24px 28px;
        }

        .details-title {
          margin-bottom: 10px;
          color: var(--cyan-primary);
          font-family: monospace;
          font-size: 10px;
          letter-spacing: 0.14em;
        }

        .details-row {
          display: flex;
          justify-content: space-between;
          padding: 15px 0;
          border-top: 1px solid var(--border-subtle);
          color: var(--text-muted);
          font-size: 12px;
        }

        .details-row strong {
          color: var(--text-secondary);
          font-family: monospace;
          font-size: 11px;
        }

        .cyan-text {
          color: var(--cyan-primary) !important;
        }

        .red-text {
          color: var(--crimson-danger) !important;
        }

        .account-back-button {
          margin-top: 22px;
          padding: 11px 16px;
          border: 1px solid var(--border-cyan);
          border-radius: 8px;
          background: rgba(0, 240, 255, 0.04);
          color: var(--cyan-primary);
          cursor: pointer;
          font-size: 11px;
        }

        @media (max-width: 700px) {
          .profile-grid {
            grid-template-columns: 1fr;
          }

          .account-page {
            padding: 35px 16px;
          }

          .account-heading h1 {
            font-size: 32px;
          }
        }
      `}</style>
    </main>
  );
};