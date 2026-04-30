import MemberListItem from "./MemberListItem";

export default function MemberList({ members = [], onRemoveMember }) {
  return (
    <div className="create-project-member-list">
      <div className="create-project-member-list-header">
        <div></div>
        <div>User</div>
        <div>Role</div>
        <div></div>
      </div>

      {members.length > 0 ? (
        members.map((member) => (
          <MemberListItem
            key={member.id}
            member={member}
            onRemoveMember={onRemoveMember}
          />
        ))
      ) : (
        <div className="create-project-empty-members">
          No team members added yet.
        </div>
      )}
    </div>
  );
}