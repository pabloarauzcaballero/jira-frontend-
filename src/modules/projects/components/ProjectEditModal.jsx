import { useState } from "react";

import { estadoRegistroOptions } from "../../../shared/data/databaseOptions";

export default function ProjectEditModal({ project, isSaving = false, onClose, onSubmit }) {
  const [formData, setFormData] = useState(() => ({
    nombre: project?.nombre ?? project?.name ?? "",
    descripcion: project?.descripcion ?? project?.description ?? "",
    estado_registro: project?.estado_registro ?? project?.status ?? "ACTIVO",
  }));

  function handleChange(field, value) {
    setFormData((currentData) => ({ ...currentData, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit?.({
      ...formData,
      nombre: formData.nombre.trim(),
      descripcion: formData.descripcion.trim(),
    });
  }

  return (
    <div className="project-edit-modal-root" role="dialog" aria-modal="true">
      <div className="project-edit-modal-backdrop" onClick={isSaving ? undefined : onClose} />

      <form className="project-edit-modal-card" onSubmit={handleSubmit}>
        <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
          <div>
            <h2 className="h5 fw-bold mb-1">Editar proyecto</h2>
            <p className="text-secondary mb-0 small">Actualiza el nombre, descripción y estado del proyecto.</p>
          </div>

          <button
            type="button"
            className="btn btn-sm btn-light border"
            onClick={onClose}
            disabled={isSaving}
            aria-label="Cerrar edición de proyecto"
          >
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
              close
            </span>
          </button>
        </div>

        <div className="d-flex flex-column gap-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nombre del proyecto"
            aria-label="Nombre del proyecto"
            value={formData.nombre}
            onChange={(event) => handleChange("nombre", event.target.value)}
            disabled={isSaving}
            required
          />

          <textarea
            className="form-control"
            rows="4"
            placeholder="Descripción del proyecto"
            aria-label="Descripción del proyecto"
            value={formData.descripcion}
            onChange={(event) => handleChange("descripcion", event.target.value)}
            disabled={isSaving}
            required
          />

          <select
            className="form-select"
            aria-label="Estado del proyecto"
            value={formData.estado_registro}
            onChange={(event) => handleChange("estado_registro", event.target.value)}
            disabled={isSaving}
          >
            {estadoRegistroOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="d-flex justify-content-end gap-2 mt-4">
          <button type="button" className="btn btn-light border" onClick={onClose} disabled={isSaving}>
            Cancelar
          </button>

          <button type="submit" className="btn btn-primary d-flex align-items-center gap-2" disabled={isSaving}>
            {isSaving && <span className="button-spinner" aria-hidden="true" />}
            {isSaving ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>
      </form>
    </div>
  );
}
