export default function MemberAvatar({ nombre = "", urlProfile }) {
  const initials = nombre
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  if (urlProfile) {
    return (
      <img
        src={urlProfile}
        alt={nombre}
        width="36"
        height="36"
        className="rounded-circle object-fit-cover border"
      />
    );
  }

  return (
    <div
      className="rounded-circle bg-primary-subtle text-primary border d-flex align-items-center justify-content-center fw-bold"
      style={{ width: "36px", height: "36px", fontSize: "12px" }}
    >
      {initials || "?"}
    </div>
  );
}