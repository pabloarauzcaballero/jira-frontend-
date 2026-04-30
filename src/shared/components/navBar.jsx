import "../styles/navBar.css";
import "../styles/avatar.css";

export default function NavBar() {
  return (
    <header className="app-topbar fixed-top bg-white shadow-sm d-flex align-items-center justify-content-between px-3">
      <div className="d-flex align-items-center gap-3">
        <span className="fs-5 fw-bold text-primary">JIssueTracker</span>

        <div className="position-relative d-none d-md-block">
          <span
            className="material-symbols-outlined position-absolute top-50 translate-middle-y text-secondary"
            style={{ left: "10px", fontSize: "18px" }}
          >
            search
          </span>

          <input
            className="form-control form-control-sm search-input"
            placeholder="Search..."
            type="text"
          />
        </div>
      </div>

      <div className="d-flex align-items-center gap-2">
        <button
          type="button"
          className="btn btn-sm btn-light rounded-circle d-flex align-items-center justify-content-center position-relative"
        >
          <span className="material-symbols-outlined text-secondary">
            notifications
          </span>

          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill text-bg-primary">
            5
          </span>
        </button>

        <button
          type="button"
          className="btn btn-sm btn-light rounded-circle d-flex align-items-center justify-content-center"
        >
          <span className="material-symbols-outlined text-secondary">help</span>
        </button>

        <img
          className="avatar ms-1"
          alt="User profile"
          src="https://i.pravatar.cc/80?img=12"
        />
      </div>
    </header>
  );
}