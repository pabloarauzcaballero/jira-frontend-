import { Link } from "react-router-dom";

export default function LoginLinks({ links = [] }) {
  if (links.length === 0) return null;

  return (
    <footer className="login-links">
      {links.map((link) =>
        link.to ? (
          <Link key={link.label} to={link.to} className="login-link">
            {link.label}
          </Link>
        ) : (
          <a key={link.label} href={link.href} className="login-link">
            {link.label}
          </a>
        )
      )}
    </footer>
  );
}
