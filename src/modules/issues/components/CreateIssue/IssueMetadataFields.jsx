import TagsInput from "./TagsInputs";

export default function IssueMetadataFields({
  status,
  assignee,
  priority,
  tags,
  statuses = [],
  priorities = [],
  onChange,
}) {
  return (
    <section>
      <h2 className="create-issue-section-title">Details</h2>

      <div className="create-issue-grid-2">
        <div>
          <label className="create-issue-label" htmlFor="status">
            Status
          </label>

          <select
            id="status"
            className="form-select create-issue-input"
            value={status}
            onChange={(event) => onChange("status", event.target.value)}
          >
            {statuses.map((currentStatus) => (
              <option key={currentStatus.value} value={currentStatus.value}>
                {currentStatus.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="create-issue-label" htmlFor="priority">
            Priority
          </label>

          <select
            id="priority"
            className="form-select create-issue-input"
            value={priority}
            onChange={(event) => onChange("priority", event.target.value)}
          >
            {priorities.map((currentPriority) => (
              <option key={currentPriority.value} value={currentPriority.value}>
                {currentPriority.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="create-issue-label" htmlFor="assignee">
            Assignee
          </label>

          <div className="create-issue-assignee">
            <span className="material-symbols-outlined">person</span>

            <input
              id="assignee"
              type="text"
              placeholder="Search users..."
              value={assignee}
              onChange={(event) => onChange("assignee", event.target.value)}
            />

            <span className="material-symbols-outlined">search</span>
          </div>
        </div>

      </div>

      <TagsInput
        tags={tags}
        onChange={(newTags) => onChange("tags", newTags)}
      />
    </section>
  );
}