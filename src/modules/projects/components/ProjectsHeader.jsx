export default function ProjectsHeader({
  totalProjects = 0,
}) {

  return (
    <section className="projects-header">
      <div className="d-flex align-items-center gap-1 text-secondary small fw-semibold mb-2">
        <span>Projects</span>

        <span
          className="material-symbols-outlined"
          style={{ fontSize: "16px" }}
        >
          chevron_right
        </span>

        <span>Workspace</span>
      </div>

      <div className="d-flex flex-column align-items-start gap-3">
          <div className="d-flex flex-row w-100 justify-content-between">
            <h1 className="h4 fw-bold mb-1">Proyectos</h1>
            <div className="d-flex flex-row align-items-center gap-2">
              <button className="btn btn-sm btn-light border d-flex align-items-center gap-1">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "16px" }}
                >
                  filter_list
                </span>
                Filtros
              </button>

              <div className="vr mx-1 d-none d-md-block"></div>

              <button className="btn btn-sm btn-primary px-3 d-flex align-items-center gap-1">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "16px" }}
                >
                  add
                </span>
                Crear proyecto
              </button>
            </div>
          </div>

          <p className="projects-header-description mb-0">
            Aqui veras todos los proyectos en los que estas trabajando, asi como los proyectos recientes a los que has accedido.
          </p>

          <span className="projects-header-counter">
            {totalProjects} proyectos disponibles
          </span>
        </div>
    </section>
  );
}