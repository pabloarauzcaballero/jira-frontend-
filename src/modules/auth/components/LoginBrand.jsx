export default function LoginBrand({ appName, subtitle, icon }) {
  return (
    <header className="login-brand">
      <div className="login-brand-icon">
        <span
          className="material-symbols-outlined"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {icon}
        </span>
      </div>

      <h1 className="login-title">{appName}</h1>

      <p className="login-subtitle">{subtitle}</p>
    </header>
  );
}