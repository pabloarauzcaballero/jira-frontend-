import ButtonActionGroup from "../../../shared/components/actions/ButtonActionGroup";
import { useProjectMembersContext } from "../context/ProjectMembersContext";

export default function ProjectHeader() {
  const { project, projectName, projectDescription, actions, onEditProject } = useProjectMembersContext();

  return (
    <section className="mb-4 main-header-container">
      <div className="d-flex align-items-center text-secondary small mb-2">
        <span>Proyectos</span>

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

        <div className="d-flex flex-row gap-2 flex-wrap">
          <ButtonActionGroup actions={actions.header} />

          {typeof onEditProject === "function" && project && (
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1"
              onClick={() => onEditProject(project)}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "16px" }}
              >
                edit
              </span>
              Editar proyecto
            </button>
          )}
        </div>
      </div>

      <p className="text-secondary mb-0 mt-2 text-justify">
        {projectDescription}
      </p>
    </section>
  );
}
