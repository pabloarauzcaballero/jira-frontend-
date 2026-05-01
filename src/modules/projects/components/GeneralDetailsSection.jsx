export default function GeneralDetailsSection({
  projectData,
  estadoRegistroOptions = [],
  onProjectChange,
}) {
  return (
    <section>
      <h2 className="create-project-section-title">Datos del proyecto</h2>

      <div className="mb-3">
        <label className="form-label create-project-label" htmlFor="descripcion">
          Descripción <span className="text-danger">*</span>
        </label>

        <textarea
          id="descripcion"
          rows="4"
          className="form-control create-project-input"
          placeholder="Describe el objetivo del proyecto..."
          value={projectData.descripcion}
          onChange={(event) =>
            onProjectChange("descripcion", event.target.value)
          }
        />
      </div>

      <div>
        <label className="form-label create-project-label" htmlFor="estado_registro">
          Estado de registro
        </label>

        <select
          id="estado_registro"
          className="form-select create-project-input"
          value={projectData.estado_registro}
          onChange={(event) =>
            onProjectChange("estado_registro", event.target.value)
          }
        >
          {estadoRegistroOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}
