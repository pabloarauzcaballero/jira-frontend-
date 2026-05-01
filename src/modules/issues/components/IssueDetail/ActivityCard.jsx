import AddCommentBox from "./AddCommentBox";
import ActivityItem from "./ActivityItem";

export default function ActivityCard({ currentUser, activities = [] }) {
  return (
    <article className="issue-card-panel">
      <h2 className="issue-card-title">Actualizaciones</h2>

      <AddCommentBox currentUser={currentUser} />

      <div className="issue-activity-list">
        {activities.map((activity) => (
          <ActivityItem key={activity.id} activity={activity} />
        ))}
      </div>
    </article>
  );
}
