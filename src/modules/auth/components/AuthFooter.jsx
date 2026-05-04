export default function AuthFooter({ links = [] }) {
  return (
    <footer className="auth-footer">
      <div className="auth-footer-inner">
        <span>© 2024 IssueTracker Inc. All rights reserved.</span>

        <div className="auth-footer-links">
          {links.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}