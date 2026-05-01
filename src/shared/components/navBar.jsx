import "../styles/navBar.css";
import "../styles/avatar.css";

import ButtonActionGroup from "./actions/ButtonActionGroup";
import { useSessionContext } from "../context/SessionContext";
import { API_ENDPOINTS } from "../services/apiEndpoints";

export default function NavBar() {
  const { currentUser } = useSessionContext();

  const topbarActions = [
    {
      id: "topbar.notifications",
      label: "",
      icon: "notifications",
      endpoint: API_ENDPOINTS.ticketActualizacion.list,
      method: "GET",
      className:
        "btn btn-sm btn-light rounded-circle d-flex align-items-center justify-content-center position-relative",
      successMessage: "Consulta de notificaciones preparada.",
    },
    {
      id: "topbar.help",
      label: "",
      icon: "help",
      endpoint: null,
      className:
        "btn btn-sm btn-light rounded-circle d-flex align-items-center justify-content-center",
      successMessage: "Ayuda contextual preparada.",
    },
  ];

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

          <input className="form-control form-control-sm search-input" placeholder="Search..." type="text" />
        </div>
      </div>

      <div className="d-flex align-items-center gap-2">
        <div className="position-relative">
          <ButtonActionGroup actions={[topbarActions[0]]} className="d-flex" />
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill text-bg-primary">
            5
          </span>
        </div>

        <ButtonActionGroup actions={[topbarActions[1]]} className="d-flex" />

        <img
          className="avatar ms-1"
          alt={currentUser?.nombre || "User profile"}
          src={currentUser?.avatarUrl || "https://i.pravatar.cc/80?img=12"}
        />
      </div>
    </header>
  );
}
