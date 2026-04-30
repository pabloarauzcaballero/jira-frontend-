import DetailRow from "./DetailsRow";

export default function DetailsCard({ issue }) {
  return (
    <article className="issue-side-card">
      <h2 className="issue-side-title">Details</h2>

      <dl className="issue-details-list">
        <DetailRow label="Priority">
          <span className="d-flex align-items-center gap-1">
            <span className="material-symbols-outlined text-warning">
              keyboard_double_arrow_up
            </span>
            {issue.priority}
          </span>
        </DetailRow>

        <DetailRow label="Project">{issue.projectShortName}</DetailRow>

        <DetailRow label="Reporter">
          <span className="d-flex align-items-center gap-2">
            <img
              src={issue.reporter.avatarUrl}
              alt={issue.reporter.name}
              className="issue-reporter-avatar"
            />
            {issue.reporter.name}
          </span>
        </DetailRow>

        <DetailRow label="Created">{issue.createdDate}</DetailRow>
        <DetailRow label="Updated">{issue.updatedAt}</DetailRow>
      </dl>
    </article>
  );
}