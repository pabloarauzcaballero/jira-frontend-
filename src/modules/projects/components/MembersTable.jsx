import MemberRow from "./MemberRow";

export default function MembersTable({
  members = [],
  onDesvincular,
  onUnlinkMember,
  onAddRequest,
}) {
  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light text-uppercase small text-secondary">
          <tr>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Tickets asignados</th>
            <th className="text-end">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {members.length > 0 ? (
            members.map((member, index) => (
              <MemberRow
                key={member.id ?? member.nombre ?? index}
                member={member}
                onDesvincular={onDesvincular}
                onUnlinkMember={onUnlinkMember}
                onAddRequest={onAddRequest}
              />
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center text-secondary py-4">
                No hay miembros registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
