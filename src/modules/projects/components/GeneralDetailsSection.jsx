export default function GeneralDetailsSection({ projectData, onProjectChange }) {
  return (
    <section>
      <h2 className="create-project-section-title">General Details</h2>

      <div className="mb-3">
        <label className="form-label create-project-label" htmlFor="projectName">
          Project Name <span className="text-danger">*</span>
        </label>

        <input
          id="projectName"
          type="text"
          className="form-control create-project-input"
          placeholder="e.g. Q3 Marketing Launch"
          value={projectData.projectName}
          onChange={(event) =>
            onProjectChange("projectName", event.target.value)
          }
        />
      </div>

      <div>
        <label className="form-label create-project-label" htmlFor="projectDesc">
          Description
        </label>

        <textarea
          id="projectDesc"
          rows="4"
          className="form-control create-project-input"
          placeholder="Briefly describe the purpose of this project..."
          value={projectData.description}
          onChange={(event) =>
            onProjectChange("description", event.target.value)
          }
        />
      </div>
    </section>
  );
}   