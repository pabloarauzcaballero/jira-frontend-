import DetailField from "./DetailField";
import ManagerInfo from "./ManagerInfo";

export default function AccountDetailsCard({ details }) {
  return (
    <article className="profile-card profile-details-card">
      <div className="profile-card-header">
        <h3 className="profile-card-title mb-0">
          <span className="material-symbols-outlined">badge</span>
          Account Details
        </h3>

        <button className="btn btn-sm btn-light border d-flex align-items-center gap-1">
          <span className="material-symbols-outlined">edit</span>
          Edit
        </button>
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