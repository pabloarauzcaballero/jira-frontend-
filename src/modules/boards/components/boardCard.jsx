export default function BoardCard({ issue, status }) {
  if (!issue) {
    return null;
  }

  const priorityClass = {
    high: "text-danger",
    medium: "text-warning",
    low: "text-success",
  };

  const priorityIcon = {
    high: "keyboard_double_arrow_up",
    medium: "keyboard_arrow_up",
    low: "keyboard_arrow_up",
  };

  return (
    <article className={`issue-card ${status === "in-progress" ? "in-progress" : ""}`}>
      <p className="issue-title">{issue.title}</p>

      <p className="issue-description">{issue.description}</p>

      <div className="issue-footer">
        <div className="d-flex align-items-center gap-2">
          <span
            className={`material-symbols-outlined issue-priority ${
              priorityClass[issue.priority] || "text-secondary"
            }`}
          >
            {priorityIcon[issue.priority] || "drag_handle"}
          </span>

          <span className="issue-key">{issue.issueKey}</span>
        </div>

        {issue.assigneeUrl && (
          <img
            className="issue-avatar"
            src={issue.assigneeUrl}
            alt="Assignee"
          />
        )}
      </div>
    </article>
  );
}