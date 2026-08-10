import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

interface Profile {
  id: string;
  full_name: string;
  email: string;
  avatar_url: string | null;
  credits: number;
}

interface UserProfileProps {
  onNavigate?: (tab: string) => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  onNavigate,
}) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
  loadProfile();

  const handleCreditsUpdate = () => {
    loadProfile();
  };

  window.addEventListener(
    "phantomnet-credits-updated",
    handleCreditsUpdate
  );

  return () => {
    window.removeEventListener(
      "phantomnet-credits-updated",
      handleCreditsUpdate
    );
  };
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
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error("Profile loading error:", error);
      setLoading(false);
      return;
    }

    if (data) {
      setProfile(data);
    }

    setLoading(false);
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error);
      return;
    }

    window.location.reload();
  };

  const navigate = (tab: string) => {
    setOpen(false);
    onNavigate?.(tab);
  };

  if (loading) {
    return (
      <div className="user-profile-loading">
        Loading...
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  const displayName =
    profile.full_name?.trim() ||
    profile.email?.split("@")[0] ||
    "User";

  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="user-profile-wrapper">

      <button
        type="button"
        className="user-profile-button"
        onClick={() => setOpen(!open)}
      >
        <div className="user-avatar">
          {profile.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt={displayName}
            />
          ) : (
            initial
          )}
        </div>

        <div className="user-info">
          <span className="user-name">
            {displayName}
          </span>

          <span className="user-credits">
            ⚡ {profile.credits} credits
          </span>
        </div>

        <span className="profile-arrow">
          {open ? "▲" : "▼"}
        </span>
      </button>

      {open && (
        <div className="profile-dropdown">

          <div className="profile-header">

            <div className="large-avatar">
              {profile.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={displayName}
                />
              ) : (
                initial
              )}
            </div>

            <div className="profile-user-details">

              <div className="profile-name">
                {displayName}
              </div>

              <div className="profile-email">
                {profile.email}
              </div>

            </div>
          </div>

          <div className="profile-divider" />

          <div className="profile-credit-card">
            <span>AVAILABLE CREDITS</span>

            <strong>
              ⚡ {profile.credits}
            </strong>
          </div>

          <button
            type="button"
            className="profile-menu-item"
            onClick={() => navigate("profile")}
          >
            <span>👤</span>
            <span>Profile</span>
          </button>

          <button
            type="button"
            className="profile-menu-item"
            onClick={() => navigate("history")}
          >
            <span>📊</span>
            <span>Analysis History</span>
          </button>

          <button
            type="button"
            className="profile-menu-item"
            onClick={() => navigate("settings")}
          >
            <span>⚙</span>
            <span>Settings</span>
          </button>

          <div className="profile-divider" />

          <button
            type="button"
            className="logout-button"
            onClick={logout}
          >
            <span>↪</span>
            <span>Logout</span>
          </button>

        </div>
      )}

      <style>{`
        .user-profile-wrapper {
          position: relative;
          z-index: 1000;
        }

        .user-profile-button {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 7px 10px;
          min-width: 190px;
          background: rgba(15, 20, 32, 0.95);
          border: 1px solid rgba(0, 240, 255, 0.18);
          border-radius: 10px;
          cursor: pointer;
          color: white;
          transition: all 0.2s ease;
        }

        .user-profile-button:hover {
          border-color: rgba(0, 240, 255, 0.55);
          box-shadow:
            0 0 18px rgba(0, 240, 255, 0.1);
        }

        .user-avatar,
        .large-avatar {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: linear-gradient(
            135deg,
            #0088ff,
            #00f0ff
          );
          color: #031018;
          font-weight: 900;
          overflow: hidden;
          flex-shrink: 0;
        }

        .user-avatar {
          width: 34px;
          height: 34px;
          font-size: 14px;
        }

        .large-avatar {
          width: 48px;
          height: 48px;
          font-size: 20px;
        }

        .user-avatar img,
        .large-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .user-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          flex: 1;
          min-width: 0;
        }

        .user-name {
          max-width: 125px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 12px;
          font-weight: 800;
        }

        .user-credits {
          margin-top: 2px;
          font-size: 9px;
          color: #00f0ff;
          font-family: monospace;
        }

        .profile-arrow {
          font-size: 8px;
          color: #718096;
        }

        .profile-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          width: 300px;
          padding: 14px;
          background: rgba(10, 14, 24, 0.99);
          border: 1px solid rgba(0, 240, 255, 0.25);
          border-radius: 14px;
          box-shadow:
            0 25px 60px rgba(0, 0, 0, 0.65),
            0 0 30px rgba(0, 240, 255, 0.08);
          backdrop-filter: blur(20px);
        }

        .profile-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px;
        }

        .profile-user-details {
          min-width: 0;
        }

        .profile-name {
          font-size: 14px;
          font-weight: 800;
          color: #f5f7ff;
        }

        .profile-email {
          margin-top: 4px;
          font-size: 10px;
          color: #718096;
          word-break: break-all;
        }

        .profile-divider {
          height: 1px;
          margin: 10px 0;
          background: rgba(255, 255, 255, 0.08);
        }

        .profile-credit-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
          padding: 11px 12px;
          border-radius: 9px;
          background: rgba(0, 240, 255, 0.05);
          border: 1px solid rgba(0, 240, 255, 0.12);
        }

        .profile-credit-card span {
          font-size: 9px;
          color: #718096;
          letter-spacing: 0.08em;
        }

        .profile-credit-card strong {
          color: #00f0ff;
          font-size: 13px;
          font-family: monospace;
        }

        .profile-menu-item,
        .logout-button {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 12px;
          border: 0;
          border-radius: 8px;
          background: transparent;
          text-align: left;
          cursor: pointer;
          font-size: 12px;
          transition: all 0.15s ease;
        }

        .profile-menu-item {
          color: #cbd5e1;
        }

        .profile-menu-item:hover {
          background: rgba(255, 255, 255, 0.06);
          color: white;
        }

        .logout-button {
          color: #ff3366;
        }

        .logout-button:hover {
          background: rgba(255, 51, 102, 0.08);
        }

        .user-profile-loading {
          color: #718096;
          font-size: 11px;
        }

        @media (max-width: 700px) {
          .user-profile-button {
            min-width: auto;
          }

          .user-info {
            display: none;
          }

          .profile-dropdown {
            right: -10px;
            width: 290px;
          }
        }
      `}</style>

    </div>
  );
};