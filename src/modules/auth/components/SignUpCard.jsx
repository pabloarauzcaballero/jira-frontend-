import { Link } from "react-router-dom";

import SignUpBrand from "./SignUpBrand";
import SignUpForm from "./SignUpForm";

export default function SignUpCard({
  appName,
  subtitle,
  icon,
  timezones = [],
  onSignUp,
}) {
  return (
    <section className="signup-card">
      <SignUpBrand appName={appName} subtitle={subtitle} icon={icon} />

      <SignUpForm timezones={timezones} onSignUp={onSignUp} />

      <div className="signup-login-link-wrapper">
        <p className="signup-login-text">
          Already have an account?{" "}
          <Link to="/login" className="signup-login-link">
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
}
