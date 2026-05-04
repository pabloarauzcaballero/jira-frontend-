import "./loadingState.css";

export default function LoadingState({
  title = "Cargando",
  message = "Preparando la información...",
  variant = "page",
  compact = false,
}) {
  return (
    <div className={`loading-state loading-state-${variant} ${compact ? "loading-state-compact" : ""}`} role="status" aria-live="polite">
      <div className="loading-state-spinner" aria-hidden="true" />

      <div className="loading-state-copy">
        <p className="loading-state-title">{title}</p>
        {message && <p className="loading-state-message">{message}</p>}
      </div>
    </div>
  );
}
