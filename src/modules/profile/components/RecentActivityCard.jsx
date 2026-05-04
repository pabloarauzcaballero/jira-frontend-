import ActivityItem from "./ActivityItem";

export default function RecentActivityCard({ activities = [] }) {
  return (
    <article className="profile-card">
      <h3 className="profile-card-title profile-activity-title">
        <span className="material-symbols-outlined">history</span>
        Recent Activity
      </h3>

      <div className="profile-activity-list">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))
        ) : (
          <p className="text-secondary small mb-0">
            Conecta el endpoint de actividad para mostrar movimientos recientes.
          </p>
        )}
      </div>

      <button type="button" className="profile-history-button">
        View Full History
      </button>
    </article>
  );
}
