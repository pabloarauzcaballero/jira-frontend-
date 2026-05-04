import { useAppActionContext } from "../../../shared/context/AppActionContext";
import { useProfileContext } from "../context/ProfileContext";
import ProfileTag from "./ProfileTag";

export default function ProfileSummaryCard({ user = {} }) {
  const { executeAction } = useAppActionContext();
  const { actions, profileData } = useProfileContext();
  const editAction = actions.header?.[0];

  return (
    <article className="profile-card profile-summary-card">
      <div className="profile-avatar-wrapper">
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="profile-avatar"
          />
        ) : (
          <div className="profile-avatar bg-primary-subtle text-primary border d-flex align-items-center justify-content-center fw-bold">
            {user.initials || "U"}
          </div>
        )}

        <button
          type="button"
          className="profile-avatar-overlay"
          aria-label="Editar perfil"
          onClick={() => executeAction(editAction, profileData.rawUser)}
        >
          <span className="material-symbols-outlined">edit</span>
        </button>
      </div>

      <h2 className="profile-user-name">{user.name}</h2>
      <p className="profile-user-position">{user.position}</p>

      <div className="d-flex justify-content-center flex-wrap gap-2">
        {user.tags?.map((tag) => (
          <ProfileTag key={tag} label={tag} />
        ))}
      </div>
    </article>
  );
}
