export default function SummaryField({ value, onChange }) {
  return (
    <section>
      <label className="create-issue-label" htmlFor="nombre">
        Nombre del ticket <span className="text-danger">*</span>
      </label>

      <input
        id="nombre"
        type="text"
        className="form-control create-issue-input"
        placeholder="Ej. Corregir flujo de autenticación..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </section>
  );
}
