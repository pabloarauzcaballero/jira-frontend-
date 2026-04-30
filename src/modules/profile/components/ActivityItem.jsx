export default function ActivityItem({ activity }) {
  return (
    <div className="profile-activity-item">
      <div className={`profile-activity-icon ${activity.tone || "primary"}`}>
        <span className="material-symbols-outlined">{activity.icon}</span>
      </div>

      <div>
        <p className="profile-activity-text">
          <span className="fw-semibold">{activity.userName}</span>{" "}
          {activity.action}{" "}
          {activity.issue && (
            <a href="#" className="profile-activity-link">
              {activity.issue}
            </a>
          )}
        </p>

        {activity.comment && (
          <p className="profile-activity-comment">
            "{activity.comment}"
          </p>
        )}

        {activity.statusChange && (
          <div className="profile-status-change">
            <span>{activity.statusChange.from}</span>

            <span className="material-symbols-outlined">arrow_forward</span>

            <span className="active">{activity.statusChange.to}</span>
          </div>
        )}

        <span className="profile-activity-date">{activity.date}</span>
      </div>
    </div>
  );
}