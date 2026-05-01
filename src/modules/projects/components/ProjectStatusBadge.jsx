import { formatDbLabel } from "../../../shared/data/databaseOptions.js";

export default function ProjectStatusBadge({ status = "ACTIVO" }) {
  const normalizedStatus = String(status).toUpperCase();

  const statusClass = {
    ACTIVO: "project-status-active",
    INACTIVO: "project-status-hold",
    ELIMINADO: "project-status-archived",
  };

  return (
    <span
      className={`project-status ${
        statusClass[normalizedStatus] ?? "project-status-default"
      }`}
    >
      {formatDbLabel(status)}
    </span>
  );
}
