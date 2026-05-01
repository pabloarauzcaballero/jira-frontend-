import DetailRow from "./DetailsRow";

export default function DetailsCard({ issue }) {
  return (
    <article className="issue-side-card">
      <h2 className="issue-side-title">Detalles</h2>

      <dl className="issue-details-list">
        <DetailRow label="Prioridad">
          <span className="d-flex align-items-center gap-1">
            <span className="material-symbols-outlined text-warning">
              keyboard_double_arrow_up
            </span>
            {issue.priority}
          </span>
        </DetailRow>

        <DetailRow label="Proyecto">{issue.projectShortName}</DetailRow>
        <DetailRow label="Estado registro">{issue.estado_registro}</DetailRow>

        <DetailRow label="Creador">
          <span className="d-flex align-items-center gap-2">
            <img
              src={issue.reporter.avatarUrl}
              alt={issue.reporter.name}
              className="issue-reporter-avatar"
            />
            {issue.reporter.name}
          </span>
        </DetailRow>

        <DetailRow label="Creado">{issue.createdDate}</DetailRow>
        <DetailRow label="Actualizado">{issue.updatedAt}</DetailRow>
      </dl>
    </article>
  );
}
