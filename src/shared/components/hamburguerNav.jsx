import "../styles/hamburguerNav.css";

const navigationItems = [
  { key: "projects", icon: "inventory_2", label: "Proyectos" },
  { key: "board", icon: "view_kanban", label: "Tablero" },
  { key: "create-issue", icon: "add_task", label: "Crear ticket" },
  { key: "issue-detail", icon: "bug_report", label: "Detalle ticket" },
  { key: "project-members", icon: "groups", label: "Asignaciones" },
  { key: "create-project", icon: "add_box", label: "Crear proyecto" },
];

export default function HamburguerNav({ activeView = "board", onNavigate, onLogout }) {
  return (
    <aside className="app-sidebar d-flex flex-column py-3">
      <nav className="flex-grow-1">
        {navigationItems.map((item) => (
          <button
            key={item.key}
            type="button"
            className={`sidebar-link ${activeView === item.key ? "active" : ""}`}
            onClick={() => onNavigate?.(item.key)}
          >
            <span
              className="material-symbols-outlined"
              style={
                activeView === item.key
                  ? { fontVariationSettings: "'FILL' 1" }
                  : undefined
              }
            >
              {item.icon}
            </span>
            <span className="sidebar-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <nav className="border-top pt-2">
        <button
          type="button"
          className={`sidebar-link ${activeView === "profile" ? "active" : ""}`}
          onClick={() => onNavigate?.("profile")}
        >
          <span className="material-symbols-outlined">settings</span>
          <span className="sidebar-label">Perfil</span>
        </button>

        <button type="button" className="sidebar-link text-danger" onClick={onLogout}>
          <span className="material-symbols-outlined">logout</span>
          <span className="sidebar-label">Cerrar sesión</span>
        </button>
      </nav>
    </aside>
  );
}
