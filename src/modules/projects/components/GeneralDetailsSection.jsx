export default function GeneralDetailsSection({
  projectData,
  estadoRegistroOptions = [],
  onProjectChange,
}) {
  return (
    <section>
      <h2 className="create-project-section-title">Datos del proyecto</h2>

      <div className="mb-3">
        <input
          id="nombre"
          type="text"
          className="form-control create-project-input"
          placeholder="Nombre del proyecto *"
          aria-label="Nombre del proyecto"
          value={projectData.nombre}
          onChange={(event) => onProjectChange("nombre", event.target.value)}
        />
      </div>

      <div className="mb-3">
        <textarea
          id="descripcion"
          rows="4"
          className="form-control create-project-input"
          placeholder="Descripción del proyecto *"
          aria-label="Descripción del proyecto"
          value={projectData.descripcion}
          onChange={(event) =>
            onProjectChange("descripcion", event.target.value)
          }
        />
      </div>

      <div>
        <select
          id="estado_registro"
          className="form-select create-project-input"
          aria-label="Estado de registro"
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
