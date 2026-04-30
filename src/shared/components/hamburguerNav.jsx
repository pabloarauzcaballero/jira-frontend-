import "../styles/hamburguerNav.css";

export default function HamburguerNav() {
  return (
    <aside className="app-sidebar d-flex flex-column py-3">
      <nav className="flex-grow-1">
        <a className="sidebar-link" href="#">
          <span className="material-symbols-outlined">inventory_2</span>
          <span className="sidebar-label">Projects</span>
        </a>

        <a className="sidebar-link" href="#">
          <span className="material-symbols-outlined">bug_report</span>
          <span className="sidebar-label">Issues</span>
        </a>

        <a className="sidebar-link active" href="#">
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            view_kanban
          </span>
          <span className="sidebar-label">Boards</span>
        </a>

        <a className="sidebar-link" href="#">
          <span className="material-symbols-outlined">analytics</span>
          <span className="sidebar-label">Reports</span>
        </a>
      </nav>

      <nav className="border-top pt-2">
        <a className="sidebar-link" href="#">
          <span className="material-symbols-outlined">settings</span>
          <span className="sidebar-label">Settings</span>
        </a>
      </nav>
    </aside>
  );
}