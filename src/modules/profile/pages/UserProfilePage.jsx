import "../styles/profile.css";

import ProfileHeader from "../components/ProfileHeader";
import ProfileSummaryCard from "../components/ProfileSummaryCard";
import SecurityCard from "../components/SecurityCard";
import AccountDetailsCard from "../components/AccountDetailsCard";
import RecentActivityCard from "../components/RecentActivityCard";

export default function UserProfilePage({
  user,
  security,
  accountDetails,
  activities = [],
}) {
  return (
    <section className="profile-page">
      <ProfileHeader
        title="User Profile"
        description="Manage personal information and security settings."
      />

      <div className="row g-3">
        <div className="col-12 col-lg-4">
          <div className="d-flex flex-column gap-3">
            <ProfileSummaryCard user={user} />
            <SecurityCard security={security} />
          </div>
        </div>

        <div className="col-12 col-lg-8">
          <div className="d-flex flex-column gap-3">
            <AccountDetailsCard details={accountDetails} />
            <RecentActivityCard activities={activities} />
          </div>
        </div>
      </div>
    </section>
  );
}