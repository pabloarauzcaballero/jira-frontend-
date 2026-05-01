export default function ProjectIssueFields({
  idProyecto,
  idUsuario,
  projects = [],
  users = [],
  onChange,
}) {
  return (
    <section className="create-issue-grid-2">
      <div>
        <label className="create-issue-label" htmlFor="id_proyecto">
          Proyecto <span className="text-danger">*</span>
        </label>

        <select
          id="id_proyecto"
          className="form-select create-issue-input"
          value={idProyecto}
          onChange={(event) => onChange("id_proyecto", event.target.value)}
        >
          {projects.map((currentProject) => (
            <option key={currentProject.value} value={currentProject.value}>
              {currentProject.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="create-issue-label" htmlFor="id_usuario">
          Usuario asignado <span className="text-danger">*</span>
        </label>

        <select
          id="id_usuario"
          className="form-select create-issue-input"
          value={idUsuario}
          onChange={(event) => onChange("id_usuario", event.target.value)}
        >
          {users.map((user) => (
            <option key={user.value} value={user.value}>
              {user.label}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}
