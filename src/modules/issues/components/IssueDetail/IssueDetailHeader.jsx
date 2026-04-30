import IssueActionBar from "./IssueActionBar";

export default function IssueDetailHeader({
  issue,
  onEdit,
  onDelete,
  onChangeStatus,
}) {
  return (
    <header className="issue-detail-header">
      <div className="issue-detail-breadcrumb">
        <button type="button" className="issue-detail-back-btn">
          <span className="material-symbols-outlined">arrow_back</span>
          Back
        </button>

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

        <IssueActionBar
          onEdit={onEdit}
          onDelete={onDelete}
          onChangeStatus={onChangeStatus}
        />
      </div>
    </header>
  );
}