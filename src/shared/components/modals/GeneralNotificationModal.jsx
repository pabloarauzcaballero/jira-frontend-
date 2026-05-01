import "./generalNotificationModal.css";

const VARIANT_CONFIG = {
  success: {
    icon: "check_circle",
    headerClass: "modal-header-success",
    iconClass: "text-success",
    defaultTitle: "Operación completada",
  },
  error: {
    icon: "error",
    headerClass: "modal-header-error",
    iconClass: "text-danger",
    defaultTitle: "Ocurrió un error",
  },
  warning: {
    icon: "warning",
    headerClass: "modal-header-warning",
    iconClass: "text-warning",
    defaultTitle: "Atención",
  },
  info: {
    icon: "info",
    headerClass: "modal-header-info",
    iconClass: "text-primary",
    defaultTitle: "Información",
  },
  confirm: {
    icon: "help",
    headerClass: "modal-header-confirm",
    iconClass: "text-primary",
    defaultTitle: "Confirmar acción",
  },
};

function formatDetails(details) {
  if (!details) return null;

  if (typeof details === "string") return details;

  try {
    return JSON.stringify(details, null, 2);
  } catch {
    return String(details);
  }
}

export default function GeneralNotificationModal({ modal, onClose, onConfirm }) {
  if (!modal?.isOpen) return null;

  const config = VARIANT_CONFIG[modal.variant] ?? VARIANT_CONFIG.info;
  const details = formatDetails(modal.details);
  const isConfirm = modal.variant === "confirm" || typeof modal.onConfirm === "function";

  return (
    <div className="general-modal-root" role="dialog" aria-modal="true">
      <div className="general-modal-backdrop" onClick={onClose} />

      <section className="general-modal-card shadow-lg">
        <header className={`general-modal-header ${config.headerClass}`}>
          <div className="d-flex align-items-center gap-2">
            <span className={`material-symbols-outlined ${config.iconClass}`}>
              {config.icon}
            </span>
            <h2 className="h6 fw-bold mb-0">{modal.title || config.defaultTitle}</h2>
          </div>

          <button
            type="button"
            className="btn btn-sm btn-light border rounded-circle general-modal-close"
            onClick={onClose}
            aria-label="Cerrar modal"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </header>

        <div className="general-modal-body">
          {modal.message && <p className="mb-0 text-secondary">{modal.message}</p>}

          {details && (
            <pre className="general-modal-details mt-3 mb-0">{details}</pre>
          )}
        </div>

        <footer className="general-modal-footer">
          {isConfirm ? (
            <>
              <button type="button" className="btn btn-light border" onClick={onClose}>
                {modal.cancelLabel || "Cancelar"}
              </button>

              <button
                type="button"
                className={modal.confirmClassName || "btn btn-primary"}
                onClick={onConfirm}
              >
                {modal.confirmLabel || "Confirmar"}
              </button>
            </>
          ) : (
            <button type="button" className="btn btn-primary" onClick={onClose}>
              {modal.closeLabel || "Entendido"}
            </button>
          )}
        </footer>
      </section>
    </div>
  );
}
