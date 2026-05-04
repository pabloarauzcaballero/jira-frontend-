export default function TwoFactorCheckbox({ checked, onChange }) {
  return (
    <div className="signup-2fa-row">
      <input
        id="twoFactorAuth"
        name="is_two_factors"
        type="checkbox"
        className="form-check-input"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />

      <label className="signup-2fa-label" htmlFor="twoFactorAuth">
        Enable Two-Factor Authentication
      </label>
    </div>
  );
}