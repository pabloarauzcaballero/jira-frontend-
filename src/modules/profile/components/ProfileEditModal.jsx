import { useEffect, useMemo, useState } from "react";

function buildInitialForm(user = {}) {
  return {
    nombre: user.nombre ?? user.name ?? "",
    email: user.email ?? "",
    telefono: user.telefono ?? user.phone ?? "",
    timezone: user.timezone ?? "America/La_Paz",
    posicion_principal: user.posicion_principal ?? user.position ?? "",
    is_two_factors: Boolean(user.is_two_factors ?? user.isTwoFactors ?? false),
  };
}

export default function ProfileEditModal({
  isOpen = false,
  user = {},
  timezones = [],
  isSaving = false,
  onClose,
  onSubmit,
}) {
  const initialForm = useMemo(() => buildInitialForm(user), [user]);
  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData(initialForm);
      setError("");
    }
  }, [initialForm, isOpen]);

  if (!isOpen) return null;

  function handleChange(field, value) {
    setFormData((currentData) => ({
      ...currentData,
      [field]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.nombre.trim()) {
      setError("El nombre es obligatorio.");
      return;
    }

    if (!formData.email.trim()) {
      setError("El correo electrónico es obligatorio.");
      return;
    }

    setError("");

    onSubmit?.({
      nombre: formData.nombre.trim(),
      email: formData.email.trim(),
      telefono: formData.telefono.trim() || null,
      timezone: formData.timezone,
      posicion_principal: formData.posicion_principal.trim() || null,
      is_two_factors: Boolean(formData.is_two_factors),
    });
  }

  return (
    <div className="profile-edit-modal-root" role="dialog" aria-modal="true">
      <button
        type="button"
        className="profile-edit-modal-backdrop"
        aria-label="Cerrar edición de perfil"
        onClick={onClose}
        disabled={isSaving}
      />

      <section className="profile-edit-modal-card shadow-lg">
        <header className="profile-edit-modal-header">
          <div>
            <p className="profile-edit-eyebrow mb-1">Perfil</p>
            <h2 className="h5 fw-bold mb-0">Editar información personal</h2>
          </div>

          <button
            type="button"
            className="btn btn-sm btn-light border rounded-circle profile-edit-close"
            onClick={onClose}
            disabled={isSaving}
            aria-label="Cerrar"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </header>

        <form className="profile-edit-modal-body" onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-12">
              <label className="form-label fw-semibold" htmlFor="profile-nombre">
                Nombre completo
              </label>
              <input
                id="profile-nombre"
                type="text"
                className="form-control"
                value={formData.nombre}
                onChange={(event) => handleChange("nombre", event.target.value)}
                disabled={isSaving}
                required
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold" htmlFor="profile-email">
                Correo electrónico
              </label>
              <input
                id="profile-email"
                type="email"
                className="form-control"
                value={formData.email}
                onChange={(event) => handleChange("email", event.target.value)}
                disabled={isSaving}
                required
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold" htmlFor="profile-telefono">
                Teléfono
              </label>
              <input
                id="profile-telefono"
                type="tel"
                className="form-control"
                value={formData.telefono}
                onChange={(event) => handleChange("telefono", event.target.value)}
                disabled={isSaving}
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold" htmlFor="profile-timezone">
                Zona horaria
              </label>
              <select
                id="profile-timezone"
                className="form-select"
                value={formData.timezone}
                onChange={(event) => handleChange("timezone", event.target.value)}
                disabled={isSaving}
              >
                {(timezones.length ? timezones : [{ value: "America/La_Paz", label: "America/La_Paz" }]).map(
                  (timezone) => (
                    <option key={timezone.value} value={timezone.value}>
                      {timezone.label}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fw-semibold" htmlFor="profile-position">
                Posición principal
              </label>
              <input
                id="profile-position"
                type="text"
                className="form-control"
                value={formData.posicion_principal}
                onChange={(event) => handleChange("posicion_principal", event.target.value)}
                disabled={isSaving}
              />
            </div>

            <div className="col-12">
              <label className="profile-edit-check">
                <input
                  type="checkbox"
                  checked={formData.is_two_factors}
                  onChange={(event) => handleChange("is_two_factors", event.target.checked)}
                  disabled={isSaving}
                />
                <span>Autenticación de dos factores activa</span>
              </label>
            </div>
          </div>

          {error && <p className="profile-edit-error mb-0 mt-3">{error}</p>}

          <footer className="profile-edit-modal-footer">
            <button type="button" className="btn btn-light border" onClick={onClose} disabled={isSaving}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSaving}>
              {isSaving ? (
                <>
                  <span className="button-spinner" aria-hidden="true" />
                  Guardando...
                </>
              ) : (
                "Guardar cambios"
              )}
            </button>
          </footer>
        </form>
      </section>
    </div>
  );
}
