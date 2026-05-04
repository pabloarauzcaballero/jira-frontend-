import { useState } from "react";

export default function LoginForm({ onLogin, isLoading = false }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(field, value) {
    setFormData((currentData) => ({
      ...currentData,
      [field]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const payload = {
      email: formData.email.trim(),
      password: formData.password,
    };

    onLogin?.(payload);
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="form-control login-input"
          placeholder="Correo electrónico"
          aria-label="Correo electrónico"
          value={formData.email}
          onChange={(event) => handleChange("email", event.target.value)}
          disabled={isLoading}
        />
      </div>

      <div>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="form-control login-input"
          placeholder="Contraseña"
          aria-label="Contraseña"
          value={formData.password}
          onChange={(event) => handleChange("password", event.target.value)}
          disabled={isLoading}
        />
      </div>

      <button type="submit" className="btn login-submit-btn" disabled={isLoading}>
        {isLoading ? (
          <>
            <span className="button-spinner" aria-hidden="true" />
            Iniciando sesión...
          </>
        ) : (
          "Iniciar sesión"
        )}
      </button>
    </form>
  );
}