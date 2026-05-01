import TagsInput from "./TagsInputs";

export default function IssueMetadataFields({
  status,
  prioridad,
  acciones = [],
  criteriosAceptacion = [],
  statuses = [],
  priorities = [],
  onChange,
}) {
  return (
    <section>
      <h2 className="create-issue-section-title">Datos compatibles con PostgreSQL</h2>

      <div className="create-issue-grid-2">
        <div>
          <label className="create-issue-label" htmlFor="status">
            Status
          </label>

          <select
            id="status"
            className="form-select create-issue-input"
            value={status}
            onChange={(event) => onChange("status", event.target.value)}
          >
            {statuses.map((currentStatus) => (
              <option key={currentStatus.value} value={currentStatus.value}>
                {currentStatus.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="create-issue-label" htmlFor="prioridad">
            Prioridad
          </label>

          <select
            id="prioridad"
            className="form-select create-issue-input"
            value={prioridad}
            onChange={(event) => onChange("prioridad", event.target.value)}
          >
            {priorities.map((currentPriority) => (
              <option key={currentPriority.value} value={currentPriority.value}>
                {currentPriority.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <TagsInput
        label="Acciones del ticket"
        inputId="acciones"
        placeholder="Agregar acción y presionar Enter..."
        tags={acciones}
        onChange={(newActions) => onChange("acciones", newActions)}
      />

      <TagsInput
        label="Criterios de aceptación"
        inputId="criterios_aceptacion"
        placeholder="Agregar criterio y presionar Enter..."
        tags={criteriosAceptacion}
        onChange={(newCriteria) =>
          onChange("criterios_aceptacion", newCriteria)
        }
      />
    </section>
  );
}
