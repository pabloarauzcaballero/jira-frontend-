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
          Selecciona los usuarios que formarán parte del proyecto. Puedes quitar miembros antes de guardar.
        </p>
      </div>

      <AddMemberForm users={users} onAddMember={onAddMember} />

      <MemberList members={members} onRemoveMember={onRemoveMember} />
    </section>
  );
}
