import ButtonActionGroup from "../../../shared/components/actions/ButtonActionGroup";
import { useProfileContext } from "../context/ProfileContext";

export default function ProfileHeader({ title, description }) {
  const { actions, profileData } = useProfileContext();

  return (
    <header className="profile-header">
      <div className="profile-breadcrumb">
        <span>Settings</span>
        <span className="material-symbols-outlined">chevron_right</span>
        <span>Profile</span>
      </div>

      <div className="profile-header-main">
        <div>
          <h1 className="profile-title">{title}</h1>
          <p className="profile-description">{description}</p>
        </div>

        <ButtonActionGroup actions={actions.header} contextPayload={profileData.user} className="d-flex" />
      </div>
    </header>
  );
}
