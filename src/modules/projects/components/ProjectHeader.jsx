export default function ProjectHeader({
  projectName = "Proyecto sin nombre",
  projectDescription = "Sin descripción del proyecto.",
}) {
  return (
    <section className="mb-4 main-header-container">
      <div className="d-flex align-items-center text-secondary small mb-2">
        <a href="#" className="text-decoration-none text-secondary">
          Proyectos
        </a>

        <span
          className="material-symbols-outlined mx-1"
          style={{ fontSize: "14px" }}
        >
          chevron_right
        </span>

        <span>{projectName}</span>
      </div>

      <div className="inner-header">
        <h1 className="h4 fw-bold mb-0">{projectName}</h1>

        <div className="d-flex flex-row gap-2">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "16px" }}
            >
              person_add
            </span>
            Añadir miembro
          </button>

          <button
            type="button"
            className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "16px" }}
            >
              update
            </span>
            Modificar proyecto
          </button>
        </div>
      </div>

      <p className="text-secondary mb-0 mt-2 text-justify">
        {projectDescription}
      </p>
    </section>
  );
}