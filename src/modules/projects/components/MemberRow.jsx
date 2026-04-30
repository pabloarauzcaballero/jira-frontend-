import AssignedTicketsCell from "./AssignedTicketsCell";
import MemberAvatar from "./MemberAvatar";
import RoleBadge from "./RoleBadge";

function getAssignedTickets(member = {}) {
  if (Array.isArray(member.ticketsAsignados)) return member.ticketsAsignados;
  if (Array.isArray(member.assignedTickets)) return member.assignedTickets;
  if (Array.isArray(member.tickets)) return member.tickets;
  if (Array.isArray(member.email)) return member.email;

  return [];
}

export default function MemberRow({
  member,
  onDesvincular,
  onUnlinkMember,
  onAddRequest,
}) {
  const { nombre, rol, urlProfile, email } = member;
  const assignedTickets = getAssignedTickets(member);
  const handleDesvincular = onDesvincular ?? onUnlinkMember;

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
        <RoleBadge rol={rol} />
      </td>

      <td>
        <AssignedTicketsCell tickets={assignedTickets} />
      </td>

      <td className="text-end">
        <div className="d-flex justify-content-end gap-2 flex-wrap">
          <button
            type="button"
            className="btn btn-sm btn-outline-danger"
            onClick={() => handleDesvincular?.(member)}
          >
            Desvincular
          </button>

          <button
            type="button"
            className="btn btn-sm btn-primary"
            onClick={() => onAddRequest?.(member)}
          >
            Añadir request
          </button>
        </div>
      </td>
    </tr>
  );
}
