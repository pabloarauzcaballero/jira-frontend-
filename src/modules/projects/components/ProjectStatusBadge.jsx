export default function ProjectStatusBadge({ status = "Active" }) {
  const normalizedStatus = status.toLowerCase();

  const statusClass = {
    active: "project-status-active",
    "on hold": "project-status-hold",
    archived: "project-status-archived",
  };

  return (
    <span
      className={`project-status ${
        statusClass[normalizedStatus] ?? "project-status-default"
      }`}
    >
      {status}
    </span>
  );
}