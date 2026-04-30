export default function CreateProjectHeader() {
  return (
    <header className="create-project-header">
      <nav aria-label="breadcrumb" className="create-project-breadcrumb">
        <a href="#">Projects</a>

        <span
          className="material-symbols-outlined"
          style={{ fontSize: "14px" }}
        >
          chevron_right
        </span>

        <span>Create new</span>
      </nav>

      <h1 className="create-project-title">Create Project</h1>

      <p className="create-project-description">
        Configure your new workspace and add initial team members.
      </p>
    </header>
  );
}