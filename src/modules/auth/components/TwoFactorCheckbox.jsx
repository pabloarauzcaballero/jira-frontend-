export default function TwoFactorCheckbox({ checked, onChange, disabled = false }) {
  return (
    <div className="signup-2fa-row">
      <input
        id="twoFactorAuth"
        name="is_two_factors"
        type="checkbox"
        className="form-check-input"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        disabled={disabled}
      />

      <label className="signup-2fa-label" htmlFor="twoFactorAuth">
        Activar autenticación en dos pasos
      </label>
    </div>
  );
}