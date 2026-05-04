import { useState } from "react";

import PasswordInput from "./PasswordInput";
import TwoFactorCheckbox from "./TwoFactorCheckbox";

export default function SignUpForm({ timezones = [], onSignUp }) {
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
        <label className="signup-label" htmlFor="fullName">
          Full Name
        </label>

        <input
          id="fullName"
          type="text"
          className="form-control signup-input"
          placeholder="John Doe"
          value={formData.fullName}
          onChange={(event) => handleChange("fullName", event.target.value)}
        />
      </div>

      <div>
        <label className="signup-label" htmlFor="email">
          Email Address
        </label>

        <input
          id="email"
          type="email"
          className="form-control signup-input"
          placeholder="name@company.com"
          value={formData.email}
          onChange={(event) => handleChange("email", event.target.value)}
        />
      </div>

      <div>
        <label className="signup-label" htmlFor="phone">
          Phone Number
        </label>

        <input
          id="phone"
          name="telefono"
          type="tel"
          className="form-control signup-input"
          placeholder="+591..."
          value={formData.phone}
          onChange={(event) => handleChange("phone", event.target.value)}
        />
      </div>

      <div>
        <label className="signup-label" htmlFor="timezone">
          Timezone
        </label>

        <select
          id="timezone"
          name="timezone"
          className="form-select signup-input"
          value={formData.timezone}
          onChange={(event) => handleChange("timezone", event.target.value)}
        >
          {timezones.map((timezone) => (
            <option key={timezone.value} value={timezone.value}>
              {timezone.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="signup-label" htmlFor="primaryPosition">
          Primary Position
        </label>

        <input
          id="primaryPosition"
          name="posicion_principal"
          type="text"
          className="form-control signup-input"
          placeholder="e.g. Lead Developer"
          value={formData.primaryPosition}
          onChange={(event) =>
            handleChange("primaryPosition", event.target.value)
          }
        />
      </div>

      <PasswordInput
        id="password"
        label="Password"
        value={formData.password}
        onChange={(value) => handleChange("password", value)}
      />

      <PasswordInput
        id="confirmPassword"
        label="Confirm Password"
        value={formData.confirmPassword}
        onChange={(value) => handleChange("confirmPassword", value)}
      />

      <TwoFactorCheckbox
        checked={formData.isTwoFactors}
        onChange={(value) => handleChange("isTwoFactors", value)}
      />

      {error && <p className="signup-error">{error}</p>}

      <button type="submit" className="btn signup-submit-btn">
        Create account
      </button>
    </form>
  );
}