import ButtonActionGroup from "../../../shared/components/actions/ButtonActionGroup";
import AddMemberForm from "./AddMemberForm";
import MembersTable from "./MembersTable";
import { useProjectMembersContext } from "../context/ProjectMembersContext";

export default function MembersCard() {
  const {
    members,
    filteredMembers,
    searchTerm,
    setSearchTerm,
    isAddMemberOpen,
    selectedUserId,
    setSelectedUserId,
    availableUserOptions,
    actions,
  } = useProjectMembersContext();

  return (
    <section className="card border-0 shadow-sm">
      <div className="card-header bg-white d-flex flex-column flex-xl-row justify-content-between align-items-xl-center gap-3">
        <div>
          <h2 className="h6 fw-bold mb-0">Miembros del proyecto ({members.length})</h2>
          <small className="text-secondary">
            {filteredMembers.length} resultado{filteredMembers.length === 1 ? "" : "s"} visible{filteredMembers.length === 1 ? "" : "s"}
          </small>
        </div>

        <div className="d-flex flex-column flex-md-row align-items-stretch align-items-md-center gap-2">
          <div className="position-relative project-members-search-box">
            <span
              className="material-symbols-outlined position-absolute top-50 translate-middle-y text-secondary"
              style={{ left: "10px", fontSize: "16px" }}
            >
              search
            </span>

            <input
              type="text"
              className="form-control form-control-sm ps-4"
              placeholder="Encontrar miembro..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>

          <ButtonActionGroup
            actions={actions.search}
            contextPayload={{ searchTerm }}
            className="d-flex gap-2"
          />

          <ButtonActionGroup
            actions={actions.header}
            contextPayload={{}}
            className="d-flex gap-2"
          />
        </div>
      </div>

      {isAddMemberOpen && (
        <div className="project-members-inline-form border-bottom bg-light">
          <AddMemberForm
            users={availableUserOptions}
            selectedUserId={selectedUserId}
            onSelectedUserIdChange={setSelectedUserId}
            actions={actions.addForm}
            buttonLabel="Añadir miembro"
          />
        </div>
      )}

      <MembersTable />

      <div className="card-footer bg-white d-flex justify-content-between align-items-center small text-secondary">
        <span>
          Mostrando {filteredMembers.length > 0 ? 1 : 0} a {filteredMembers.length} de {members.length} registros
        </span>

        <div className="btn-group btn-group-sm">
          <button className="btn btn-light border" disabled>
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
              chevron_left
            </span>
          </button>

          <button className="btn btn-primary">1</button>

          <button className="btn btn-light border" disabled>
            <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
              chevron_right
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
