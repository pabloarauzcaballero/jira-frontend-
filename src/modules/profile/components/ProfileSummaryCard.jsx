    import ProfileTag from "./ProfileTag";

export default function ProfileSummaryCard({ user }) {
  return (
    <article className="profile-card profile-summary-card">
      <div className="profile-avatar-wrapper">
        <img
          src={user.avatarUrl}
          alt={user.name}
          className="profile-avatar"
        />

        <button
          type="button"
          className="profile-avatar-overlay"
          aria-label="Change profile photo"
        >
          <span className="material-symbols-outlined">photo_camera</span>
        </button>
      </div>

      <h2 className="profile-user-name">{user.name}</h2>
      <p className="profile-user-position">{user.position}</p>

      <div className="d-flex justify-content-center flex-wrap gap-2">
        {user.tags?.map((tag) => (
          <ProfileTag key={tag} label={tag} />
        ))}
      </div>
    </article>
  );
}