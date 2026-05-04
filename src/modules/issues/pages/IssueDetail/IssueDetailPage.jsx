import "../../styles/IssueDetail.css";

import IssueDetailHeader from "../../components/IssueDetail/IssueDetailHeader";
import DescriptionCard from "../../components/IssueDetail/DescriptionCard";
import ActivityCard from "../../components/IssueDetail/ActivityCard";
import StatusAssigneeCard from "../../components/IssueDetail/StatusAssigneeCard";
import DetailsCard from "../../components/IssueDetail/DetailsCard";
import EditTicketModal from "../../components/IssueDetail/EditTicketModal";
import ChangeStatusModal from "../../components/IssueDetail/ChangeStatusModal";
import { IssueDetailProvider, useIssueDetailContext } from "../../context/IssueDetailContext";
import LoadingState from "../../../../shared/components/loading/LoadingState";

function IssueDetailContent({
  priorities = [],
  statuses = [],
  isEditOpen = false,
  isStatusOpen = false,
  isSavingTicket = false,
  isChangingStatus = false,
  onCloseEdit,
  onCloseStatus,
  onSubmitEdit,
  onSubmitStatus,
}) {
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
    

      <EditTicketModal
        issue={issue}
        priorities={priorities}
        isOpen={isEditOpen}
        isSaving={isSavingTicket}
        onClose={onCloseEdit}
        onSubmit={onSubmitEdit}
      />

      <ChangeStatusModal
        issue={issue}
        statuses={statuses}
        isOpen={isStatusOpen}
        isSaving={isChangingStatus}
        onClose={onCloseStatus}
        onSubmit={onSubmitStatus}
      />
    </section>
  );
}

export default function IssueDetailPage(props) {
  if (props.isLoading) {
    return <LoadingState title="Cargando ticket" message="Obteniendo el detalle y las actualizaciones del ticket..." />;
  }

  return (
    <IssueDetailProvider {...props}>
      <IssueDetailContent {...props} />
    </IssueDetailProvider>
  );
}
