import ButtonActionGroup from "../../../../shared/components/actions/ButtonActionGroup";
import IssueActionBar from "./IssueActionBar";
import { useIssueDetailContext } from "../../context/IssueDetailContext";

export default function IssueDetailHeader() {
  const { issue, actions } = useIssueDetailContext();

  return (
    <header className="issue-detail-header">
      <div className="issue-detail-breadcrumb">
        <ButtonActionGroup
          actions={actions.navigation}
          contextPayload={issue}
          className="d-inline-flex"
        />

        <span>/</span>
        <a href="#">{issue.workspace}</a>
        <span>/</span>
        <a href="#">{issue.projectName}</a>
        <span>/</span>
        <span className="fw-semibold">{issue.key}</span>
      </div>

      <div className="issue-detail-title-row">
        <div>
          <h1 className="issue-detail-title">{issue.title}</h1>

          <div className="issue-detail-meta">
            <span className="issue-detail-type">{issue.type}</span>
            <span>{issue.createdAt}</span>
          </div>
        </div>

        <IssueActionBar />
      </div>
    </header>
  );
}
