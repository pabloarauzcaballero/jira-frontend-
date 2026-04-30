export default function BoardHeader({ teamProfiles = [] }) {
  const batchProfile = teamProfiles.slice(0, 3);

  return (
    <section className="mb-4 flex-shrink-0">
      <div className="d-flex align-items-center gap-1 text-secondary small fw-semibold mb-2">
        <span>Tickets</span>
        <span
          className="material-symbols-outlined"
          style={{ fontSize: "16px" }}
        >
          chevron_right
        </span>
        <span>Mis tickets</span>
      </div>

      <div className="d-flex flex-column flex-xl-row justify-content-between align-items-xl-end gap-3">
        <h1 className="h4 fw-bold mb-0">Mis Tickets</h1>

        <div className="d-flex flex-wrap align-items-center gap-2">
          <div className="d-flex me-2">
            {batchProfile.map((profile, index) => (
              <img
                key={profile.id ?? index}
                className="avatar"
                style={{ marginRight: "-8px" }}
                alt="Assignee"
                src={profile.profileHeader}
              />
            ))}

            {teamProfiles.length > 3 && (
              <div
                className="avatar bg-light border d-flex align-items-center justify-content-center small fw-bold"
                style={{ marginRight: "-8px" }}
              >
                +{teamProfiles.length - 3}
              </div>
            )}
          </div>

          <button className="btn btn-sm btn-light border">Solo mis tickets</button>

          <button className="btn btn-sm btn-light border d-flex align-items-center gap-1">
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "16px" }}
            >
              filter_list
            </span>
            Filtros
          </button>

          <div className="vr mx-1 d-none d-md-block"></div>

          <button className="btn btn-sm btn-primary px-3">Create ticket</button>
        </div>
      </div>
    </section>
  );
}