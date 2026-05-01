import { useMemo, useState } from "react";

import ButtonActionGroup from "../../../shared/components/actions/ButtonActionGroup";

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
  const idUsuario = selectedUserId ?? localIdUsuario;

  function updateSelectedUserId(nextValue) {
    if (typeof onSelectedUserIdChange === "function") {
      onSelectedUserIdChange(nextValue);
      return;
    }

    setLocalIdUsuario(nextValue);
  }

  function handleAddMember() {
    if (!idUsuario) return;

    onAddMember?.(Number(idUsuario));
    updateSelectedUserId(firstUserValue);
  }

  return (
    <div className="create-project-add-member project-members-add-member-form">
      <div className="create-project-email-field">
        <span className="material-symbols-outlined create-project-input-icon">
          person
        </span>

        <select
          className="form-select create-project-input create-project-input-with-icon"
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

      {actions.length > 0 ? (
        <ButtonActionGroup
          actions={actions}
          contextPayload={{ id_usuario: idUsuario }}
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
