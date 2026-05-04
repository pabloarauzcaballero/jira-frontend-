export default function SignUpBrand({ appName, subtitle }) {
  return (
    <header className="signup-brand">
      <div className="signup-brand-icon">
        <img src="/logo.png" alt="Logo" />
      </div>

      <h1 className="signup-title">{appName}</h1>

      <p className="signup-subtitle">{subtitle}</p>
    </header>
  );
}