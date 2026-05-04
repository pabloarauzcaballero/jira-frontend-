import { useEffect, useState } from "react";

export default function EditTicketModal({
  issue,
  priorities = [],
  isOpen = false,
  isSaving = false,
  onClose,
  onSubmit,
}) {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    prioridad: "MEDIA",
  });

  useEffect(() => {
    if (!isOpen) return;

    setFormData({
      nombre: issue?.nombre ?? issue?.title ?? "",
      descripcion: issue?.descripcion ?? issue?.description?.paragraphs?.[0] ?? "",
      prioridad: issue?.priorityValue ?? "MEDIA",
    });
  }, [isOpen, issue]);

  if (!isOpen) return null;

  const cleanName = formData.nombre.trim();
  const cleanDescription = formData.descripcion.trim();

  function handleChange(field, value) {
    setFormData((currentData) => ({ ...currentData, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!cleanName || !cleanDescription || isSaving) return;

    onSubmit?.({
      nombre: cleanName,
      descripcion: cleanDescription,
      prioridad: formData.prioridad,
    });
  }

  return (
    <div className="issue-modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div
        className="issue-modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-ticket-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="issue-modal-header">
          <div>
            <p className="issue-modal-eyebrow mb-1">Ticket</p>
            <h2 id="edit-ticket-title" className="issue-modal-title">
              Editar ticket
            </h2>
          </div>

          <button type="button" className="issue-modal-close" onClick={onClose} aria-label="Cerrar">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form className="issue-modal-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control create-issue-input"
            placeholder="Nombre del ticket *"
            aria-label="Nombre del ticket"
            value={formData.nombre}
            onChange={(event) => handleChange("nombre", event.target.value)}
          />

          <textarea
            rows="6"
            className="form-control create-issue-input issue-modal-textarea"
            placeholder="Descripción del ticket *"
            aria-label="Descripción del ticket"
            value={formData.descripcion}
            onChange={(event) => handleChange("descripcion", event.target.value)}
          />

          <select
            className="form-select create-issue-input"
            aria-label="Prioridad del ticket"
            value={formData.prioridad}
            onChange={(event) => handleChange("prioridad", event.target.value)}
          >
            {priorities.map((priority) => (
              <option key={priority.value} value={priority.value}>
                {priority.label}
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
              disabled={!cleanName || !cleanDescription || isSaving}
            >
              {isSaving && <span className="button-spinner" aria-hidden="true" />}
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
