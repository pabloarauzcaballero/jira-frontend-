import "../styles/login.css";

import LoginCard from "../components/LoginCard";

export default function LoginPage({
  appName = "Mini Issue Tracker",
  subtitle = "Log in to your account to continue",
  icon = "bug_report",
  links = [],
  onLogin,
  isLoading = false,
}) {
  return (
    <main className="login-page">
      <LoginCard
        appName={appName}
        subtitle={subtitle}
        icon={icon}
        links={links}
        onLogin={onLogin}
        isLoading={isLoading}
      />
    </main>
  );
}