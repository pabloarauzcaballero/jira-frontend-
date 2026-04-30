import { useState } from "react";

function inferNameFromEmail(email) {
  const localPart = email.split("@")[0] || "User";

  return localPart
    .replace(/[._-]/g, " ")
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

export default function AddMemberForm({ roles = [], onAddMember }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(roles[0] || "Viewer");

  function handleAddMember() {
    const cleanEmail = email.trim();

    if (!cleanEmail) return;

    onAddMember({
      nombre: inferNameFromEmail(cleanEmail),
      email: cleanEmail,
      rol: role,
      urlProfile: "",
    });

    setEmail("");
    setRole(roles[0] || "Viewer");
  }

  return (
    <div className="create-project-add-member">
      <div className="create-project-email-field">
        <span className="material-symbols-outlined create-project-input-icon">
          mail
        </span>

        <input
          type="email"
          className="form-control create-project-input create-project-input-with-icon"
          placeholder="colleague@company.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <select
        className="form-select create-project-role-select"
        value={role}
        onChange={(event) => setRole(event.target.value)}
      >
        {roles.map((currentRole) => (
          <option key={currentRole} value={currentRole}>
            {currentRole}
          </option>
        ))}
      </select>

      <button
        type="button"
        className="btn create-project-add-btn"
        onClick={handleAddMember}
      >
        <span
          className="material-symbols-outlined"
          style={{ fontSize: "18px" }}
        >
          add
        </span>
        Add
      </button>
    </div>
  );
}