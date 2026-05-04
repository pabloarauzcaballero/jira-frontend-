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
      <h2 className="create-issue-section-title">Configuración</h2>

      <div className="create-issue-grid-2">
        <div>
          <select
            id="status"
            className="form-select create-issue-input"
            aria-label="Estado del ticket"
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
          <select
            id="prioridad"
            className="form-select create-issue-input"
            aria-label="Prioridad del ticket"
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
