import "../styles/board.css";
import BoardHeader from "../components/boardHeader";
import BoardBody from "../components/boardBody";

export default function BoardComponent({ teamProfiles, toDoIssues, inProgressIssues, doneIssues }) {
    return(
        <div className="board-page">
            <BoardHeader teamProfiles={teamProfiles} />
            <BoardBody toDoIssues={toDoIssues} inProgressIssues={inProgressIssues} doneIssues={doneIssues} />
        </div>
    );
}