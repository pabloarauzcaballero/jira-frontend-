import { useState } from "react";

export default function PasswordInput({ id, label, value, onChange, isLoading = false }) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <div className="signup-password-wrapper">
        <input
          id={id}
          type={visible ? "text" : "password"}
          className="form-control signup-input signup-password-input"
          placeholder={label}
          aria-label={label}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          disabled={isLoading}
        />

        <button
          type="button"
          className="signup-password-toggle"
          onClick={() => setVisible((currentValue) => !currentValue)}
          disabled={isLoading}
          aria-label={visible ? "Ocultar contraseña" : "Mostrar contraseña"}
        >
          <span className="material-symbols-outlined">
            {visible ? "visibility_off" : "visibility"}
          </span>
        </button>
      </div>
    </div>
  );
}