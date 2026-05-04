export default function CreateProjectHeader() {
  return (
    <header className="create-project-header">
      <nav aria-label="breadcrumb" className="create-project-breadcrumb">
        <a href="#">Proyectos</a>

        <span
          className="material-symbols-outlined"
          style={{ fontSize: "14px" }}
        >
          chevron_right
        </span>

        <span>Crear nuevo</span>
      </nav>

      <h1 className="create-project-title">Crear proyecto</h1>

      <p className="create-project-description">
        Define la información base del proyecto y agrega los miembros que participarán en el equipo.
      </p>
    </header>
  );
}
