import AssignedTicketsCell from "./AssignedTicketsCell";
import MemberAvatar from "./MemberAvatar";
import RoleBadge from "./RoleBadge";
import ProjectStatusBadge from "./ProjectStatusBadge";
import ButtonActionGroup from "../../../shared/components/actions/ButtonActionGroup";
import { useProjectMembersContext } from "../context/ProjectMembersContext";

function getAssignedTickets(member = {}) {
  if (Array.isArray(member.ticketsAsignados)) return member.ticketsAsignados;
  if (Array.isArray(member.assignedTickets)) return member.assignedTickets;
  if (Array.isArray(member.tickets)) return member.tickets;

  return [];
}

export default function MemberRow({ member }) {
  const {
    actions,
    editingMemberId,
    memberDraft,
    updateMemberDraftField,
    estadoRegistroOptions,
  } = useProjectMembersContext();
  const { nombre, rol, posicion_principal, urlProfile, email, estado_registro } = member;
  const assignedTickets = getAssignedTickets(member);
  const isEditing = Number(editingMemberId) === Number(member.id_usuario ?? member.id);

  if (isEditing) {
    return (
      <tr className="project-members-edit-row">
        <td colSpan="5">
          <div className="project-members-edit-panel">
            <div className="d-flex align-items-center gap-2 mb-3">
              <MemberAvatar nombre={nombre} urlProfile={urlProfile} />
              <div>
                <div className="fw-semibold">Modificar miembro</div>
                <small className="text-secondary">Edita los campos visibles del usuario antes de conectar el endpoint real.</small>
              </div>
            </div>

            <div className="row g-2 align-items-end">
              <div className="col-12 col-md-3">
                <label className="form-label small fw-semibold text-secondary">Nombre</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={memberDraft.nombre ?? ""}
                  onChange={(event) => updateMemberDraftField("nombre", event.target.value)}
                />
              </div>

              <div className="col-12 col-md-3">
                <label className="form-label small fw-semibold text-secondary">Email</label>
                <input
                  type="email"
                  className="form-control form-control-sm"
                  value={memberDraft.email ?? ""}
                  onChange={(event) => updateMemberDraftField("email", event.target.value)}
                />
              </div>

              <div className="col-12 col-md-3">
                <label className="form-label small fw-semibold text-secondary">Posición principal</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={memberDraft.posicion_principal ?? ""}
                  onChange={(event) => updateMemberDraftField("posicion_principal", event.target.value)}
                />
              </div>

              <div className="col-12 col-md-3">
                <label className="form-label small fw-semibold text-secondary">Estado</label>
                <select
                  className="form-select form-select-sm"
                  value={memberDraft.estado_registro ?? "ACTIVO"}
                  onChange={(event) => updateMemberDraftField("estado_registro", event.target.value)}
                >
                  {estadoRegistroOptions.map((estadoOption) => (
                    <option key={estadoOption.value} value={estadoOption.value}>
                      {estadoOption.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="d-flex justify-content-end mt-3">
              <ButtonActionGroup
                actions={actions.editForm}
                contextPayload={memberDraft}
                className="d-flex justify-content-end gap-2 flex-wrap"
              />
            </div>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <td>
        <div className="d-flex align-items-center gap-2">
          <MemberAvatar nombre={nombre} urlProfile={urlProfile} />

          <div>
            <div className="fw-semibold">{nombre}</div>
            {typeof email === "string" && email.trim() !== "" && (
              <small className="text-secondary">{email}</small>
            )}
          </div>
        </div>
      </td>

      <td>
        <RoleBadge rol={posicion_principal ?? rol} />
      </td>

      <td>
        <ProjectStatusBadge status={estado_registro ?? "ACTIVO"} />
      </td>

      <td>
        <AssignedTicketsCell tickets={assignedTickets} />
      </td>

      <td className="text-end">
        <ButtonActionGroup
          actions={actions.row}
          contextPayload={member}
          className="d-flex justify-content-end gap-2 flex-wrap"
        />
      </td>
    </tr>
  );
}
