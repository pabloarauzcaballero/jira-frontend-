export default function DetailField({ label, value }) {
  return (
    <div>
      <label className="profile-detail-label">{label}</label>
      <p className="profile-detail-value">{value}</p>
    </div>
  );
}