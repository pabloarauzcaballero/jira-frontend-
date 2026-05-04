import LoginBrand from "./LoginBrand";
import LoginForm from "./LoginForm";
import LoginLinks from "./LoginLinks";

export default function LoginCard({
  appName,
  subtitle,
  icon,
  links = [],
  onLogin,
  isLoading = false,
}) {
  return (
    <section className="login-card">
      <LoginBrand appName={appName} subtitle={subtitle} icon={icon} />

      <LoginForm onLogin={onLogin} isLoading={isLoading} />

      <LoginLinks links={links} />
    </section>
  );
}