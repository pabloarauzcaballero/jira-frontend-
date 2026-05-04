export default function SummaryField({ value, onChange }) {
  return (
    <section>
      <input
        id="nombre"
        type="text"
        className="form-control create-issue-input"
        placeholder="Nombre del ticket *"
        aria-label="Nombre del ticket"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </section>
  );
}
