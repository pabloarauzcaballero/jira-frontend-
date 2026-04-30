export default function IssueActionBar({ onEdit, onDelete, onChangeStatus }) {
  return (
    <div className="issue-action-bar">
      <button
        type="button"
        className="btn btn-sm btn-light border d-flex align-items-center gap-1"
        onClick={onEdit}
      >
        <span className="material-symbols-outlined">edit</span>
        Edit
      </button>

      <button
        type="button"
        className="btn btn-sm btn-primary d-flex align-items-center gap-1"
        onClick={onChangeStatus}
      >
        Change Status
        <span className="material-symbols-outlined">expand_more</span>
      </button>

      <button
        type="button"
        className="btn btn-sm btn-light border text-danger d-flex align-items-center justify-content-center"
        onClick={onDelete}
        aria-label="Delete issue"
      >
        <span className="material-symbols-outlined">delete</span>
      </button>
    </div>
  );
}