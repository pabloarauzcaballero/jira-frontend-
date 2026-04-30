import AddMemberForm from "./AddMemberForm";
import MemberList from "./MemberList";

export default function TeamMembersSection({
  members,
  roles,
  onAddMember,
  onRemoveMember,
}) {
  return (
    <section>
      <div className="mb-3">
        <h2 className="create-project-section-title mb-1">Team Members</h2>

        <p className="create-project-section-description">
          Invite users via email. They will receive a notification.
        </p>
      </div>

      <AddMemberForm roles={roles} onAddMember={onAddMember} />

      <MemberList members={members} onRemoveMember={onRemoveMember} />
    </section>
  );
}