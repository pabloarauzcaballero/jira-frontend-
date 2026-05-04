export default function DetailField({ label, value }) {
  return (
    <div>
      <span className="profile-detail-label">{label}</span>
      <p className="profile-detail-value">{value}</p>
    </div>
  );
}