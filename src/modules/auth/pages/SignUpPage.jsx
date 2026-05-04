import "../styles/signup.css";

import SignUpCard from "../components/SignUpCard";
import AuthFooter from "../components/AuthFooter";

export default function SignUpPage({
  appName = "Mini Issue Tracker",
  subtitle = "Get started with your collaborative workspace.",
  icon = "bug_report",
  timezones = [],
  footerLinks = [],
  onSignUp,
  isLoading = false,
}) {
  return (
    <div className="signup-layout">
      <main className="signup-page">
        <SignUpCard
          appName={appName}
          subtitle={subtitle}
          icon={icon}
          timezones={timezones}
          onSignUp={onSignUp}
          isLoading={isLoading}
        />
      </main>

      <AuthFooter links={footerLinks} />
    </div>
  );
}