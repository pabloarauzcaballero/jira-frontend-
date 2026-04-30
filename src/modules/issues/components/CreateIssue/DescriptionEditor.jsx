export default function DescriptionEditor({ value, onChange }) {
  return (
    <section>
      <label className="create-issue-label" htmlFor="description">
        Description
      </label>

      <div className="create-issue-editor">
        <div className="create-issue-editor-toolbar">
          <select className="create-issue-editor-select">
            <option>Normal text</option>
            <option>Heading 1</option>
            <option>Heading 2</option>
            <option>Code block</option>
          </select>

          <span className="create-issue-toolbar-separator" />

          {[
            "format_bold",
            "format_italic",
            "format_underlined",
            "format_list_bulleted",
            "format_list_numbered",
            "link",
            "image",
          ].map((icon) => (
            <button key={icon} type="button" className="create-issue-tool-btn">
              <span className="material-symbols-outlined">{icon}</span>
            </button>
          ))}
        </div>

        <textarea
          id="description"
          rows="8"
          className="create-issue-editor-area"
          placeholder="Describe the issue in detail..."
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
    </section>
  );
}