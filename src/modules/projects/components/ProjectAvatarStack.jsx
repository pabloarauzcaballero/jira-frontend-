export default function ProjectAvatarStack({ members = [] }) {
  const visibleMembers = members.slice(0, 2);
  const hiddenCount = members.length - visibleMembers.length;

  return (
    <div className="project-avatar-stack">
      {visibleMembers.map((member, index) => {
        if (member.urlProfile) {
          return (
            <img
              key={member.id ?? index}
              className="project-member-avatar"
              src={member.urlProfile}
              alt={member.name ?? "Team member"}
            />
          );
        }

        return (
          <div
            key={member.id ?? index}
            className="project-member-avatar project-member-initials"
          >
            {member.initials ?? "?"}
          </div>
        );
      })}

      {hiddenCount > 0 && (
        <div className="project-member-avatar project-member-more">
          +{hiddenCount}
        </div>
      )}
    </div>
  );
}