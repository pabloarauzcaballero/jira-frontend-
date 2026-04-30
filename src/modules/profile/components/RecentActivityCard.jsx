import ActivityItem from "./ActivityItem";

export default function RecentActivityCard({ activities = [] }) {
  return (
    <article className="profile-card">
      <h3 className="profile-card-title profile-activity-title">
        <span className="material-symbols-outlined">history</span>
        Recent Activity
      </h3>

      <div className="profile-activity-list">
        {activities.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </div>

      <button type="button" className="profile-history-button">
        View Full History
      </button>
    </article>
  );
}