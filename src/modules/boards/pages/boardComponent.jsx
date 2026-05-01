import "../styles/board.css";
import BoardHeader from "../components/boardHeader";
import BoardBody from "../components/boardBody";
import { BoardProvider } from "../context/BoardContext";

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
}) {
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
