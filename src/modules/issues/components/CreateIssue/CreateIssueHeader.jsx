export default function CreateIssueHeader() {
  return (
    <header className="create-issue-header">
      <nav className="create-issue-breadcrumb">
        <a href="#">Projects</a>

        <span className="material-symbols-outlined">chevron_right</span>

        <a href="#">PROJ-X</a>

        <span className="material-symbols-outlined">chevron_right</span>

        <span>Create Issue</span>
      </nav>

      <h1 className="create-issue-title">
        <span className="create-issue-title-icon">
          <span className="material-symbols-outlined">task</span>
        </span>
        Create Issue
      </h1>
    </header>
  );
}