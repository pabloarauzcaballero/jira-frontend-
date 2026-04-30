export default function ActivityItem({ activity }) {
  return (
    <div className="issue-activity-item">
      <img
        src={activity.user.avatarUrl}
        alt={activity.user.name}
        className="issue-user-avatar"
      />

      <div>
        <div className="issue-activity-header">
          <span className="fw-semibold">{activity.user.name}</span>

          <span className="text-secondary small">
            {activity.action} • {activity.date}
          </span>
        </div>

        {activity.comment && (
          <p className="issue-activity-comment">{activity.comment}</p>
        )}

        {activity.status && (
          <span className="issue-status-chip small">
            {activity.status}
          </span>
        )}

        {activity.comment && (
          <button type="button" className="issue-reply-btn">
            Reply
          </button>
        )}
      </div>
    </div>
  );
}