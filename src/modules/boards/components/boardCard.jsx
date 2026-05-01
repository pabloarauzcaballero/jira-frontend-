import { formatDbLabel } from "../../../shared/data/databaseOptions.js";

export default function BoardCard({ issue, status }) {
  if (!issue) {
    return null;
  }

  const priorityClass = {
    CRITICA: "text-danger",
    ALTA: "text-danger",
    MEDIA: "text-warning",
    BAJA: "text-success",
    high: "text-danger",
    medium: "text-warning",
    low: "text-success",
  };

  const priorityIcon = {
    CRITICA: "priority_high",
    ALTA: "keyboard_double_arrow_up",
    MEDIA: "keyboard_arrow_up",
    BAJA: "drag_handle",
    high: "keyboard_double_arrow_up",
    medium: "keyboard_arrow_up",
    low: "drag_handle",
  };

  return (
    <article className={`issue-card ${status === "EN_PROGRESO" ? "in-progress" : ""}`}>
      <div>
        <p className="issue-title">{issue.title}</p>

        <p className="issue-description">{issue.description}</p>
      </div>

      <div className="issue-footer">
        <div className="d-flex align-items-center gap-2">
          <span
            className={`material-symbols-outlined issue-priority ${
              priorityClass[issue.priority] || "text-secondary"
            }`}
            title={`Prioridad: ${formatDbLabel(issue.priority)}`}
          >
            {priorityIcon[issue.priority] || "drag_handle"}
          </span>

          <span className="issue-key">{issue.issueKey}</span>
        </div>

        {issue.assigneeUrl ? (
          <img
            className="issue-avatar"
            src={issue.assigneeUrl}
            alt={issue.assigneeName ?? "Usuario asignado"}
          />
        ) : (
          <span className="text-secondary small">Sin asignar</span>
        )}
      </div>
    </article>
  );
}
