export default function SecurityCard({ security }) {
  return (
    <article className="profile-card">
      <h3 className="profile-card-title">
        <span className="material-symbols-outlined">lock</span>
        Security
      </h3>

      <div className="profile-security-row">
        <div>
          <p className="profile-security-title">Two-Factor Auth</p>
          <p className="profile-security-description">
            {security.twoFactorLabel}
          </p>
        </div>

        <button
          type="button"
          className={`profile-toggle ${
            security.twoFactorEnabled ? "active" : ""
          }`}
          aria-label="Two factor authentication"
        >
          <span></span>
        </button>
      </div>

      <div className="d-flex flex-column gap-2 mt-3">
        {security.actions?.map((action) => (
          <button
            key={action}
            type="button"
            className="profile-link-button"
          >
            {action}
          </button>
        ))}
      </div>
    </article>
  );
}