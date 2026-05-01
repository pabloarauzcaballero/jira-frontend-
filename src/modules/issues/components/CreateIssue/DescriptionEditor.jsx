export default function DescriptionEditor({ value, onChange }) {
  return (
    <section>
      <label className="create-issue-label" htmlFor="descripcion">
        Descripción
      </label>

      <div className="create-issue-editor">
        <div className="create-issue-editor-toolbar">
          <select className="create-issue-editor-select">
            <option>Texto normal</option>
            <option>Encabezado 1</option>
            <option>Encabezado 2</option>
            <option>Bloque de código</option>
          </select>

          <span className="create-issue-toolbar-separator" />

          {[
            "format_bold",
            "format_italic",
            "format_underlined",
            "format_list_bulleted",
            "format_list_numbered",
            "link",
          ].map((icon) => (
            <button key={icon} type="button" className="create-issue-tool-btn">
              <span className="material-symbols-outlined">{icon}</span>
            </button>
          ))}
        </div>

        <textarea
          id="descripcion"
          rows="8"
          className="create-issue-editor-area"
          placeholder="Describe el problema, contexto y resultado esperado..."
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
    </section>
  );
}
