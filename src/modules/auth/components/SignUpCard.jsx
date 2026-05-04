import { Link } from "react-router-dom";

import SignUpBrand from "./SignUpBrand";
import SignUpForm from "./SignUpForm";

export default function SignUpCard({
  appName,
  subtitle,
  icon,
  timezones = [],
  onSignUp,
  isLoading = false,
}) {
  return (
    <section className="signup-card">
      <SignUpBrand appName={appName} subtitle={subtitle} icon={icon} />

      <SignUpForm timezones={timezones} onSignUp={onSignUp} isLoading={isLoading} />

      <div className="signup-login-link-wrapper">
        <p className="signup-login-text">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="signup-login-link">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </section>
  );
}
