export default function ProjectIssueFields({
  project,
  issueType,
  projects = [],
  issueTypes = [],
  onChange,
}) {
  return (
    <section className="create-issue-grid-2">
      <div>
        <label className="create-issue-label" htmlFor="project">
          Project <span className="text-danger">*</span>
        </label>

        <select
          id="project"
          className="form-select create-issue-input"
          value={project}
          onChange={(event) => onChange("project", event.target.value)}
        >
          {projects.map((currentProject) => (
            <option key={currentProject.value} value={currentProject.value}>
              {currentProject.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="create-issue-label" htmlFor="issueType">
          Issue Type <span className="text-danger">*</span>
        </label>

        <select
          id="issueType"
          className="form-select create-issue-input"
          value={issueType}
          onChange={(event) => onChange("issueType", event.target.value)}
        >
          {issueTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}