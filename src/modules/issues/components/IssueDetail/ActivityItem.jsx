export default function ActivityItem({ activity }) {
  const user = activity.user ?? {};

  return (
    <div className="issue-activity-item">
      {user.avatarUrl ? (
        <img src={user.avatarUrl} alt={user.name} className="issue-user-avatar" />
      ) : (
        <div className="issue-user-avatar issue-user-avatar-fallback" aria-label={user.name}>
          {user.initials || "?"}
        </div>
      )}

      <div>
        <div className="issue-activity-header">
          <span className="fw-semibold">{user.name}</span>

          <span className="text-secondary small">
            {activity.action} • {activity.date}
          </span>
        </div>

        {activity.comment && <p className="issue-activity-comment">{activity.comment}</p>}

        {activity.status && <span className="issue-status-chip small">{activity.status}</span>}
      </div>
    </div>
  );
}
