export default function RoleBadge({ rol = "Sin posición" }) {
  const normalizedRole = rol.toLowerCase();

  const badgeClass = {
    "administradora de proyecto": "bg-primary-subtle text-primary",
    "project manager": "bg-primary-subtle text-primary",
    "backend developer": "bg-success-subtle text-success",
    "frontend developer": "bg-info-subtle text-info",
    "qa tester": "bg-warning-subtle text-warning",
    admin: "bg-primary-subtle text-primary",
    editor: "bg-success-subtle text-success",
    viewer: "bg-secondary-subtle text-secondary",
  };

  const currentClass =
    badgeClass[normalizedRole] ?? "bg-light text-dark border";

  return (
    <span className={`badge rounded-pill ${currentClass}`}>
      {rol}
    </span>
  );
}
