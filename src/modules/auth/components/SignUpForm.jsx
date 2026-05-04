import { useState } from "react";

import PasswordInput from "./PasswordInput";
import TwoFactorCheckbox from "./TwoFactorCheckbox";

export default function SignUpForm({ timezones = [], onSignUp, isLoading = false }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    timezone: timezones[0]?.value || "America/La_Paz",
    primaryPosition: "",
    password: "",
    confirmPassword: "",
    isTwoFactors: false,
  });

  const [error, setError] = useState("");

  function handleChange(field, value) {
    setFormData((currentData) => ({
      ...currentData,
      [field]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setError("");

    const payload = {
      nombre: formData.fullName.trim(),
      email: formData.email.trim(),
      telefono: formData.phone.trim(),
      timezone: formData.timezone,
      posicion_principal: formData.primaryPosition.trim(),
      password: formData.password,
      password_hash: formData.password,
      is_two_factors: formData.isTwoFactors,
    };

    onSignUp?.(payload);
  }

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <div>
        <input
          id="fullName"
          type="text"
          className="form-control signup-input"
          placeholder="Nombre completo"
          aria-label="Nombre completo"
          value={formData.fullName}
          onChange={(event) => handleChange("fullName", event.target.value)}
          disabled={isLoading}
        />
      </div>

      <div>
        <input
          id="email"
          type="email"
          className="form-control signup-input"
          placeholder="Correo electrónico"
          aria-label="Correo electrónico"
          value={formData.email}
          onChange={(event) => handleChange("email", event.target.value)}
          disabled={isLoading}
        />
      </div>

      <div>
        <input
          id="phone"
          name="telefono"
          type="tel"
          className="form-control signup-input"
          placeholder="Teléfono"
          aria-label="Teléfono"
          value={formData.phone}
          onChange={(event) => handleChange("phone", event.target.value)}
          disabled={isLoading}
        />
      </div>

      <div>
        <select
          id="timezone"
          name="timezone"
          className="form-select signup-input"
          aria-label="Zona horaria"
          value={formData.timezone}
          onChange={(event) => handleChange("timezone", event.target.value)}
          disabled={isLoading}
        >
          {timezones.map((timezone) => (
            <option key={timezone.value} value={timezone.value}>
              {timezone.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <input
          id="primaryPosition"
          name="posicion_principal"
          type="text"
          className="form-control signup-input"
          placeholder="Posición principal"
          aria-label="Posición principal"
          value={formData.primaryPosition}
          onChange={(event) =>
            handleChange("primaryPosition", event.target.value)
          }
          disabled={isLoading}
        />
      </div>

      <PasswordInput
        id="password"
        label="Contraseña"
        value={formData.password}
        onChange={(value) => handleChange("password", value)}
        isLoading={isLoading}
      />

      <PasswordInput
        id="confirmPassword"
        label="Confirmar contraseña"
        value={formData.confirmPassword}
        onChange={(value) => handleChange("confirmPassword", value)}
        isLoading={isLoading}
      />

      <TwoFactorCheckbox
        checked={formData.isTwoFactors}
        onChange={(value) => handleChange("isTwoFactors", value)}
        disabled={isLoading}
      />

      {error && <p className="signup-error">{error}</p>}

      <button type="submit" className="btn signup-submit-btn" disabled={isLoading}>
        {isLoading ? (
          <>
            <span className="button-spinner" aria-hidden="true" />
            Creando cuenta...
          </>
        ) : (
          "Crear cuenta"
        )}
      </button>
    </form>
  );
}