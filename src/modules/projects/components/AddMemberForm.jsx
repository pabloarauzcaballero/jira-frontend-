import { useMemo, useState } from "react";

import ButtonActionGroup from "../../../shared/components/actions/ButtonActionGroup";
import { projectRoleOptions } from "../../../shared/data/databaseOptions";

export default function AddMemberForm({
  users = [],
  onAddMember,
  selectedUserId,
  onSelectedUserIdChange,
  actions = [],
  buttonLabel = "Agregar",
}) {
  const firstUserValue = useMemo(() => users[0]?.value || "", [users]);
  const [localIdUsuario, setLocalIdUsuario] = useState(firstUserValue);
  const [cargo, setCargo] = useState("MIEMBRO");
  const idUsuario = selectedUserId ?? (localIdUsuario || firstUserValue);

  function updateSelectedUserId(nextValue) {
    if (typeof onSelectedUserIdChange === "function") {
      onSelectedUserIdChange(nextValue);
      return;
    }

    setLocalIdUsuario(nextValue);
  }

  function handleAddMember() {
    if (!idUsuario) return;

    onAddMember?.({ id_usuario: Number(idUsuario), cargo });
    updateSelectedUserId(firstUserValue);
    setCargo("MIEMBRO");
  }

  const contextPayload = { id_usuario: idUsuario, cargo };

  return (
    <div className="create-project-add-member project-members-add-member-form">
      <div className="create-project-email-field">
        <span className="material-symbols-outlined create-project-input-icon">
          person
        </span>

        <select
          className="form-select create-project-input create-project-input-with-icon"
          aria-label="Usuario para añadir al proyecto"
          value={idUsuario}
          onChange={(event) => updateSelectedUserId(event.target.value)}
          disabled={users.length === 0}
        >
          {users.length === 0 ? (
            <option value="">No hay usuarios disponibles</option>
          ) : (
            users.map((user) => (
              <option key={user.value} value={user.value}>
                {user.label}
              </option>
            ))
          )}
        </select>
      </div>

      <select
        className="form-select create-project-role-select"
        aria-label="Rol en el proyecto"
        value={cargo}
        onChange={(event) => setCargo(event.target.value)}
        disabled={users.length === 0}
      >
        {projectRoleOptions.map((roleOption) => (
          <option key={roleOption.value} value={roleOption.value}>
            {roleOption.label}
          </option>
        ))}
      </select>

      {actions.length > 0 ? (
        <ButtonActionGroup
          actions={actions}
          contextPayload={contextPayload}
          className="d-flex gap-2"
          defaultButtonClassName="btn create-project-add-btn"
        />
      ) : (
        <button
          type="button"
          className="btn create-project-add-btn"
          onClick={handleAddMember}
          disabled={!idUsuario}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "18px" }}
          >
            add
          </span>
          {buttonLabel}
        </button>
      )}
    </div>
  );
}
