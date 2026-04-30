import MemberAvatar from "./MemberAvatar";
import RoleBadge from "./RoleBadge";

export default function MemberListItem({ member, onRemoveMember }) {
  return (
    <div className="create-project-member-item">
      <MemberAvatar nombre={member.nombre} urlProfile={member.urlProfile} />

      <div className="create-project-member-info">
        <span className="create-project-member-name">{member.nombre}</span>
        <span className="create-project-member-email">{member.email}</span>
      </div>

      <div>
        <RoleBadge rol={member.rol} />
      </div>

      <button
        type="button"
        className="create-project-remove-btn"
        title="Remove user"
        onClick={() => onRemoveMember(member.id)}
      >
        <span
          className="material-symbols-outlined"
          style={{ fontSize: "18px" }}
        >
          close
        </span>
      </button>
    </div>
  );
}