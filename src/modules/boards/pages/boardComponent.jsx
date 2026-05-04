import "../styles/board.css";
import BoardHeader from "../components/boardHeader";
import BoardBody from "../components/boardBody";
import { BoardProvider } from "../context/BoardContext";
import LoadingState from "../../../shared/components/loading/LoadingState";

function BoardContent() {
  return (
    <div className="board-page">
      <BoardHeader />
      <BoardBody />
    </div>
  );
}

export default function BoardComponent({
  teamProfiles = [],
  statuses = [],
  ticketsByStatus = {},
  isLoading = false,
}) {
  if (isLoading) {
    return (
      <LoadingState
        title="Cargando tablero"
        message="Sincronizando estados, miembros y tickets del workspace..."
      />
    );
  }

  return (
    <BoardProvider
      teamProfiles={teamProfiles}
      statuses={statuses}
      ticketsByStatus={ticketsByStatus}
    >
      <BoardContent />
    </BoardProvider>
  );
}
