import MemberRow from "./MemberRow";
import { useProjectMembersContext } from "../context/ProjectMembersContext";

export default function MembersTable() {
  const { filteredMembers } = useProjectMembersContext();

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light text-uppercase small text-secondary">
          <tr>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Tickets asignados</th>
            <th className="text-end">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {filteredMembers.length > 0 ? (
            filteredMembers.map((member, index) => (
              <MemberRow key={member.id ?? member.nombre ?? index} member={member} />
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center text-secondary py-4">
                No se encontraron miembros con ese criterio de búsqueda.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
