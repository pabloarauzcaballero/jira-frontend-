import "../../styles/IssueDetail.css";

import IssueDetailHeader from "../../components/IssueDetail/IssueDetailHeader";
import DescriptionCard from "../../components/IssueDetail/DescriptionCard";
import ActivityCard from "../../components/IssueDetail/ActivityCard";
import StatusAssigneeCard from "../../components/IssueDetail/StatusAssigneeCard";
import DetailsCard from "../../components/IssueDetail/DetailsCard";

export default function IssueDetailPage({
  issue,
  currentUser,
  activities = [],
  onEdit,
  onDelete,
  onChangeStatus,
  onPostComment,
}) {
  return (
    <section className="issue-detail-page">
      <IssueDetailHeader
        issue={issue}
        onEdit={onEdit}
        onDelete={onDelete}
        onChangeStatus={onChangeStatus}
      />

      <div className="issue-detail-layout">
        <div className="issue-detail-main">
          <DescriptionCard description={issue.description} />

          <ActivityCard
            currentUser={currentUser}
            activities={activities}
            onPostComment={onPostComment}
          />
        </div>

        <aside className="issue-detail-sidebar">
          <StatusAssigneeCard
            status={issue.status}
            assignee={issue.assignee}
          />

          <DetailsCard issue={issue} />
        </aside>
      </div>
    </section>
  );
}