import ButtonActionGroup from "../../../shared/components/actions/ButtonActionGroup";
import { useProjectsContext } from "../context/ProjectsContext";

export default function ProjectsHeader() {
  const { currentProjects, recentProjects, actions } = useProjectsContext();
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
          <div className="d-flex flex-row align-items-center gap-2">
            <ButtonActionGroup actions={actions.header} />
          </div>
        </div>

        <p className="projects-header-description mb-0">
          Proyectos leídos con el shape de la tabla proyecto: id_proyecto, descripción, estado_registro, auditoría y versión.
        </p>

        <span className="projects-header-counter">{totalProjects} proyectos disponibles</span>
      </div>
    </section>
  );
}
