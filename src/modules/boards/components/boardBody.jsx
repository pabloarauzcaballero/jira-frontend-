import BoardCard from "./boardCard";
import ButtonActionGroup from "../../../shared/components/actions/ButtonActionGroup";
import { useBoardContext } from "../context/BoardContext";

export default function BoardBody() {
  const { statuses, ticketsByStatus, actions } = useBoardContext();

  return (
    <section className="kanban-board">
      {statuses.map((statusOption) => {
        const currentTickets = ticketsByStatus[statusOption.value] ?? [];
        const isMuted = ["FINALIZADO", "CANCELADO"].includes(statusOption.value);

        return (
          <div className="kanban-column" key={statusOption.value}>
            <div className="kanban-column-header d-flex align-items-center justify-content-between">
              <h2 className="small text-secondary fw-bold text-uppercase mb-0">
                {statusOption.label} <span className="fw-normal ms-1">{currentTickets.length}</span>
              </h2>

              <ButtonActionGroup
                actions={actions.column}
                contextPayload={{ status: statusOption.value }}
                className="d-flex"
              />
            </div>

            <div className={`kanban-cards ${isMuted ? "opacity-75" : ""}`}>
              {currentTickets.length > 0 ? (
                currentTickets.map((issue) => (
                  <BoardCard key={issue.id} issue={issue} status={statusOption.value} />
                ))
              ) : (
                <div className="kanban-empty-state text-secondary small">
                  Sin tickets en este estado.
                </div>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
}
