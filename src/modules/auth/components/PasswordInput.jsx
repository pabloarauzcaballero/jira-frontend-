import { useState } from "react";

export default function PasswordInput({ id, label, value, onChange }) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label className="signup-label" htmlFor={id}>
        {label}
      </label>

      <div className="signup-password-wrapper">
        <input
          id={id}
          type={visible ? "text" : "password"}
          className="form-control signup-input signup-password-input"
          placeholder="••••••••"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />

        <button
          type="button"
          className="signup-password-toggle"
          onClick={() => setVisible((currentValue) => !currentValue)}
        >
          <span className="material-symbols-outlined">
            {visible ? "visibility_off" : "visibility"}
          </span>
        </button>
      </div>
    </div>
  );
}