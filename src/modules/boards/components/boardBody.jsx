import BoardCard from "./boardCard";

export default function BoardBody({
  toDoIssues = [],
  inProgressIssues = [],
  doneIssues = [],
}) {
  return (
    <section className="kanban-board">
      <div className="kanban-column">
        <div className="kanban-column-header d-flex align-items-center justify-content-between">
          <h2 className="small text-secondary fw-bold text-uppercase mb-0">
            TO DO <span className="fw-normal ms-1">{toDoIssues.length}</span>
          </h2>

          <button
            type="button"
            className="btn btn-sm btn-link text-secondary p-0"
          >
            <span className="material-symbols-outlined">more_horiz</span>
          </button>
        </div>

        <div className="kanban-cards">
          {toDoIssues.map((issue) => (
            <BoardCard
              key={issue.id}
              issue={issue}
              status="todo"
            />
          ))}
        </div>
      </div>

      <div className="kanban-column">
        <div className="kanban-column-header d-flex align-items-center justify-content-between">
          <h2 className="small text-secondary fw-bold text-uppercase mb-0">
            IN PROGRESS{" "}
            <span className="fw-normal ms-1">{inProgressIssues.length}</span>
          </h2>

          <button
            type="button"
            className="btn btn-sm btn-link text-secondary p-0"
          >
            <span className="material-symbols-outlined">more_horiz</span>
          </button>
        </div>

        <div className="kanban-cards">
          {inProgressIssues.map((issue) => (
            <BoardCard
              key={issue.id}
              issue={issue}
              status="in-progress"
            />
          ))}
        </div>
      </div>

      <div className="kanban-column">
        <div className="kanban-column-header d-flex align-items-center justify-content-between">
          <h2 className="small text-secondary fw-bold text-uppercase mb-0">
            DONE <span className="fw-normal ms-1">{doneIssues.length}</span>
          </h2>

          <button
            type="button"
            className="btn btn-sm btn-link text-secondary p-0"
          >
            <span className="material-symbols-outlined">more_horiz</span>
          </button>
        </div>

        <div className="kanban-cards opacity-75">
          {doneIssues.map((issue) => (
            <BoardCard
              key={issue.id}
              issue={issue}
              status="done"
            />
          ))}
        </div>
      </div>
    </section>
  );
}