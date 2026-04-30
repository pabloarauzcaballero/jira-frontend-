export default function ProfileHeader({ title, description }) {
  return (
    <header className="profile-header">
      <div className="profile-breadcrumb">
        <span>Settings</span>
        <span className="material-symbols-outlined">chevron_right</span>
        <span>Profile</span>
      </div>

      <div className="profile-header-main">
        <div>
          <h1 className="profile-title">{title}</h1>
          <p className="profile-description">{description}</p>
        </div>

        <button className="btn btn-sm btn-primary d-flex align-items-center gap-1">
          <span className="material-symbols-outlined">edit</span>
          Edit Profile
        </button>
      </div>
    </header>
  );
}