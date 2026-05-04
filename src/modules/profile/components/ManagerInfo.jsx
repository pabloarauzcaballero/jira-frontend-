export default function ManagerInfo({ manager }) {
  return (
    <div>
      <span className="profile-detail-label">Manager</span>

      <div className="d-flex align-items-center gap-2">
        <div className="profile-manager-avatar">{manager.initials}</div>
        <p className="profile-detail-value">{manager.name}</p>
      </div>
    </div>
  );
}