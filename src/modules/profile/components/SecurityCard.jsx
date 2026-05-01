import ButtonActionGroup from "../../../shared/components/actions/ButtonActionGroup";
import { useProfileContext } from "../context/ProfileContext";

export default function SecurityCard({ security }) {
  const { actions, profileData } = useProfileContext();

  return (
    <article className="profile-card">
      <h3 className="profile-card-title">
        <span className="material-symbols-outlined">lock</span>
        Security
      </h3>

      <div className="profile-security-row">
        <div>
          <p className="profile-security-title">Two-Factor Auth</p>
          <p className="profile-security-description">{security.twoFactorLabel}</p>
        </div>

        <div
          className={`profile-toggle ${security.twoFactorEnabled ? "active" : ""}`}
          role="status"
          aria-label="Estado actual de Two-Factor Auth"
        >
          <span></span>
        </div>
      </div>

      <div className="d-flex flex-column gap-2 mt-3">
        <ButtonActionGroup
          actions={actions.security}
          contextPayload={profileData.user}
          className="d-flex flex-column gap-2"
          defaultButtonClassName="profile-link-button"
        />
      </div>
    </article>
  );
}
