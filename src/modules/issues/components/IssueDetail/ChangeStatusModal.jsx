import { useEffect, useState } from "react";

export default function ChangeStatusModal({
  issue,
  statuses = [],
  isOpen = false,
  isSaving = false,
  onClose,
  onSubmit,
}) {
  const [status, setStatus] = useState("PENDIENTE");

  useEffect(() => {
    if (!isOpen) return;
    setStatus(issue?.statusValue ?? statuses[0]?.value ?? "PENDIENTE");
  }, [isOpen, issue, statuses]);

  if (!isOpen) return null;

  function handleSubmit(event) {
    event.preventDefault();
    if (!status || isSaving) return;
    onSubmit?.(status);
  }

  return (
    <div className="issue-modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div
        className="issue-modal-card issue-modal-card-sm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="change-status-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="issue-modal-header">
          <div>
            <p className="issue-modal-eyebrow mb-1">Estado</p>
            <h2 id="change-status-title" className="issue-modal-title">
              Cambiar estado
            </h2>
          </div>

          <button type="button" className="issue-modal-close" onClick={onClose} aria-label="Cerrar">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form className="issue-modal-form" onSubmit={handleSubmit}>
          <select
            className="form-select create-issue-input"
            aria-label="Nuevo estado del ticket"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            {statuses.map((currentStatus) => (
              <option key={currentStatus.value} value={currentStatus.value}>
                {currentStatus.label}
              </option>
            ))}
          </select>

          <div className="issue-modal-actions">
            <button type="button" className="btn btn-light border" onClick={onClose} disabled={isSaving}>
              Cancelar
            </button>
            <button
              type="submit"
              className="btn btn-primary d-inline-flex align-items-center gap-2"
              disabled={!status || isSaving}
            >
              {isSaving && <span className="button-spinner" aria-hidden="true" />}
              Actualizar estado
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
