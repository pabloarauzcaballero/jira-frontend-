import ButtonActionGroup from "../../../shared/components/actions/ButtonActionGroup";
import { useProfileContext } from "../context/ProfileContext";
import DetailField from "./DetailField";
import ManagerInfo from "./ManagerInfo";

export default function AccountDetailsCard({ details }) {
  const { actions, profileData } = useProfileContext();

  return (
    <article className="profile-card profile-details-card">
      <div className="profile-card-header">
        <h3 className="profile-card-title mb-0">
          <span className="material-symbols-outlined">badge</span>
          Account Details
        </h3>

        <ButtonActionGroup
          actions={actions.details}
          contextPayload={profileData.rawUser}
          className="d-flex"
        />
      </div>

      <div className="row gy-4">
        <div className="col-12 col-md-6">
          <DetailField label="Email Address" value={details.email} />
        </div>

        <div className="col-12 col-md-6">
          <DetailField label="Phone Number" value={details.phone} />
        </div>

        <div className="col-12 col-md-6">
          <DetailField label="Timezone" value={details.timezone} />
        </div>

        <div className="col-12 col-md-6">
          <ManagerInfo manager={details.manager} />
        </div>
      </div>
    </article>
  );
}
