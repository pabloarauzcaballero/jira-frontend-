export default function CreateIssueHeader() {
  return (
    <header className="create-issue-header">
      <nav className="create-issue-breadcrumb">
        <a href="#">Proyectos</a>

        <span className="material-symbols-outlined">chevron_right</span>

        <span>Ticket</span>

        <span className="material-symbols-outlined">chevron_right</span>

        <span>Crear ticket</span>
      </nav>

      <h1 className="create-issue-title">
        <span className="create-issue-title-icon">
          <span className="material-symbols-outlined">task</span>
        </span>
        Crear ticket
      </h1>
    </header>
  );
}
