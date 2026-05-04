import { useState } from "react";

export default function LoginForm({ onLogin }) {
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
        <label className="login-label" htmlFor="email">
          Email address
        </label>

        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="form-control login-input"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(event) => handleChange("email", event.target.value)}
        />
      </div>

      <div>
        <label className="login-label" htmlFor="password">
          Password
        </label>

        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="form-control login-input"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(event) => handleChange("password", event.target.value)}
        />
      </div>

      <button type="submit" className="btn login-submit-btn">
        Log in
      </button>
    </form>
  );
}