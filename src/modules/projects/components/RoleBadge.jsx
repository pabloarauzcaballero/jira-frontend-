export default function RoleBadge({ rol = "Sin rol" }) {
  const normalizedRole = rol.toLowerCase();

  const badgeClass = {
    admin: "bg-primary-subtle text-primary",
    editor: "bg-success-subtle text-success",
    viewer: "bg-secondary-subtle text-secondary",
    owner: "bg-warning-subtle text-warning",
  };

  const currentClass =
    badgeClass[normalizedRole] ?? "bg-light text-dark border";

  return (
    <span className={`badge rounded-pill ${currentClass}`}>
      {rol}
    </span>
  );
}