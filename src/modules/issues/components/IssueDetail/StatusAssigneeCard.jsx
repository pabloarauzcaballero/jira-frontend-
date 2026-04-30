export default function StatusAssigneeCard({ status, assignee }) {
  return (
    <article className="issue-side-card">
      <div className="issue-side-block">
        <div className="issue-side-label">Status</div>

        <span className="issue-status-badge">
          <span className="material-symbols-outlined">sync</span>
          {status}
        </span>
      </div>

      <div className="issue-side-divider" />

      <div className="issue-side-block">
        <div className="issue-side-label">Assignee</div>

        <div className="issue-assignee">
          <img
            src={assignee.avatarUrl}
            alt={assignee.name}
            className="issue-assignee-avatar"
          />

          <div>
            <div className="fw-semibold">{assignee.name}</div>
            <div className="text-secondary small">{assignee.role}</div>
          </div>
        </div>
      </div>
    </article>
  );
}