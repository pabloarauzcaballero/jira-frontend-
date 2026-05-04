import "../../styles/IssueDetail.css";

import IssueDetailHeader from "../../components/IssueDetail/IssueDetailHeader";
import DescriptionCard from "../../components/IssueDetail/DescriptionCard";
import ActivityCard from "../../components/IssueDetail/ActivityCard";
import StatusAssigneeCard from "../../components/IssueDetail/StatusAssigneeCard";
import DetailsCard from "../../components/IssueDetail/DetailsCard";
import { IssueDetailProvider, useIssueDetailContext } from "../../context/IssueDetailContext";
import LoadingState from "../../../../shared/components/loading/LoadingState";

function IssueDetailContent() {
  const { issue, currentUser, activities } = useIssueDetailContext();

  return (
    <section className="issue-detail-page">
      <IssueDetailHeader />

      <div className="issue-detail-layout">
        <div className="issue-detail-main">
          <DescriptionCard description={issue.description} />

          <ActivityCard currentUser={currentUser} activities={activities} />
        </div>

        <aside className="issue-detail-sidebar">
          <StatusAssigneeCard status={issue.status} assignee={issue.assignee} />

          <DetailsCard issue={issue} />
        </aside>
      </div>
    </section>
  );
}

export default function IssueDetailPage(props) {
  if (props.isLoading) {
    return <LoadingState title="Cargando ticket" message="Obteniendo el detalle y las actualizaciones del ticket..." />;
  }

  return (
    <IssueDetailProvider {...props}>
      <IssueDetailContent />
    </IssueDetailProvider>
  );
}
