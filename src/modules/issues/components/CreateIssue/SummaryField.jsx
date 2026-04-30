export default function SummaryField({ value, onChange }) {
  return (
    <section>
      <label className="create-issue-label" htmlFor="summary">
        Summary <span className="text-danger">*</span>
      </label>

      <input
        id="summary"
        type="text"
        className="form-control create-issue-input"
        placeholder="Brief summary of the issue..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </section>
  );
}