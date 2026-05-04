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
        />
      </main>

      <AuthFooter links={footerLinks} />
    </div>
  );
}