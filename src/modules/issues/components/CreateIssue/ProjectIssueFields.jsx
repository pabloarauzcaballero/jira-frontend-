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
        <select
          id="id_proyecto"
          className="form-select create-issue-input"
          aria-label="Proyecto"
          value={idProyecto}
          onChange={(event) => onChange("id_proyecto", event.target.value)}
        >
          {projects.length === 0 ? (
            <option value="">Sin proyectos disponibles</option>
          ) : (
            projects.map((currentProject) => (
              <option key={currentProject.value} value={currentProject.value}>
                {currentProject.label}
              </option>
            ))
          )}
        </select>
      </div>

      <div>
        <select
          id="id_usuario"
          className="form-select create-issue-input"
          aria-label="Usuario asignado"
          value={idUsuario}
          onChange={(event) => onChange("id_usuario", event.target.value)}
        >
          {users.length === 0 ? (
            <option value="">Sin usuarios disponibles</option>
          ) : (
            users.map((user) => (
              <option key={user.value} value={user.value}>
                {user.label}
              </option>
            ))
          )}
        </select>
      </div>
    </section>
  );
}
