import ButtonActionGroup from "../../../shared/components/actions/ButtonActionGroup";
import { useBoardContext } from "../context/BoardContext";

export default function BoardHeader() {
  const { teamProfiles, totalTickets, actions } = useBoardContext();
  const batchProfile = teamProfiles.slice(0, 3);

  return (
    <section className="mb-4 flex-shrink-0">
      <div className="d-flex align-items-center gap-1 text-secondary small fw-semibold mb-2">
        <span>Tickets</span>
        <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
          chevron_right
        </span>
        <span>Tablero sincronizado</span>
      </div>

      <div className="d-flex flex-column flex-xl-row justify-content-between align-items-xl-end gap-3">
        <div>
          <h1 className="h4 fw-bold mb-1">Mis Tickets</h1>
          <p className="text-secondary mb-0 small">
            Vista organizada por estado. Total: {totalTickets} tickets.
          </p>
        </div>

        <div className="d-flex flex-wrap align-items-center gap-2">
          <div className="d-flex me-2">
            {batchProfile.map((profile, index) => (
              <img
                key={profile.id ?? index}
                className="avatar"
                style={{ marginRight: "-8px" }}
                alt={profile.name ?? "Usuario asignado"}
                src={profile.profileHeader ?? profile.urlProfile}
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

          <ButtonActionGroup actions={actions.header} />
        </div>
      </div>
    </section>
  );
}
