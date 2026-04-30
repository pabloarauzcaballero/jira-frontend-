export default function FormActions({ onSubmit, onCancel }) {
  return (
    <footer className="create-project-actions">
      <button
        type="button"
        className="btn create-project-cancel-btn"
        onClick={onCancel}
      >
        Cancel
      </button>

      <button
        type="button"
        className="btn create-project-submit-btn"
        onClick={onSubmit}
      >
        Create Project
      </button>
    </footer>
  );
}