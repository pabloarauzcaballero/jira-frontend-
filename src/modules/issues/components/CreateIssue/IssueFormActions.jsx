export default function IssueFormActions({ onSubmit, onCancel }) {
  return (
    <div className="create-issue-actions">
      <button type="button" className="btn create-issue-cancel-btn" onClick={onCancel}>
        Cancel
      </button>

      <button type="button" className="btn create-issue-submit-btn" onClick={onSubmit}>
        Create Issue
      </button>
    </div>
  );
}