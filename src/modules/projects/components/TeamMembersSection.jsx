import AddMemberForm from "./AddMemberForm";
import MemberList from "./MemberList";

export default function TeamMembersSection({
  members,
  users,
  onAddMember,
  onRemoveMember,
}) {
  return (
    <section>
      <div className="mb-3">
        <h2 className="create-project-section-title mb-1">Usuarios relacionados</h2>

        <p className="create-project-section-description">
          Vista previa de usuarios existentes en la tabla usuarios. La asignación persistente requiere id_ticket, id_proyecto e id_usuario en proyecto_asignacion.
        </p>
      </div>

      <AddMemberForm users={users} onAddMember={onAddMember} />

      <MemberList members={members} onRemoveMember={onRemoveMember} />
    </section>
  );
}
