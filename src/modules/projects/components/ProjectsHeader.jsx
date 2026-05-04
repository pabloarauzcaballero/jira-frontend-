import { useAppActionContext } from "../../../shared/context/AppActionContext";
import { useProjectsContext } from "../context/ProjectsContext";

export default function ProjectsHeader() {
  const { currentProjects, recentProjects } = useProjectsContext();
  const { executeAction } = useAppActionContext();
  const totalProjects = currentProjects.length + recentProjects.length;

  return (
    <section className="projects-header">
      <div className="d-flex align-items-center gap-1 text-secondary small fw-semibold mb-2">
        <span>Proyectos</span>
        <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
          chevron_right
        </span>
        <span>Workspace</span>
      </div>

      <div className="d-flex flex-column align-items-start gap-3">
        <div className="d-flex flex-row w-100 justify-content-between">
          <h1 className="h4 fw-bold mb-1">Proyectos</h1>
          <button
            type="button"
            className="btn btn-sm btn-primary px-3 d-flex align-items-center gap-1"
            onClick={() => executeAction({ id: "projects.create.navigate", type: "navigate", to: "create-project" })}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
              add
            </span>
            Nuevo proyecto
          </button>
        </div>

        <p className="projects-header-description mb-0">
          Administra tus proyectos activos, su estado y el equipo relacionado desde una vista limpia del workspace.
        </p>

        <span className="projects-header-counter">{totalProjects} proyectos disponibles</span>
      </div>
    </section>
  );
}
