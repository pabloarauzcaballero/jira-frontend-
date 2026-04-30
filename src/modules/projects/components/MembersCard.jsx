import MembersTable from "./MembersTable";

export default function MembersCard({
  members = [],
  onDesvincular,
  onUnlinkMember,
  onAddRequest,
}) {
  return (
    <section className="card border-0 shadow-sm">
      <div className="card-header bg-white d-flex justify-content-between align-items-center">
        <h2 className="h6 fw-bold mb-0">
          Team Members ({members.length})
        </h2>

        <div className="position-relative d-none d-md-block">
          <span
            className="material-symbols-outlined position-absolute top-50 translate-middle-y text-secondary"
            style={{ left: "10px", fontSize: "16px" }}
          >
            search
          </span>

          <input
            type="text"
            className="form-control form-control-sm ps-4"
            placeholder="Find a member..."
          />
        </div>
      </div>

      <MembersTable
        members={members}
        onDesvincular={onDesvincular}
        onUnlinkMember={onUnlinkMember}
        onAddRequest={onAddRequest}
      />

      <div className="card-footer bg-white d-flex justify-content-between align-items-center small text-secondary">
        <span>
          Showing 1 to {members.length} of {members.length} entries
        </span>

        <div className="btn-group btn-group-sm">
          <button className="btn btn-light border" disabled>
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
              chevron_left
            </span>
          </button>

          <button className="btn btn-primary">1</button>

          <button className="btn btn-light border">
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
              chevron_right
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
