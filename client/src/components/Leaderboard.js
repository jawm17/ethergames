import React from "react";
import ScoreBoardScore from "./ScoreBoardScore";
import "./styles/leaderboardStyle.css";

export default function Leaderboard(props) {

    return (
        <div>
            <div id="leaderBoardTitle">
                High Scores
            </div>
            <div id="leaderBoard">
                {props.scores.map(score => {
                    return <ScoreBoardScore
                        user={score.user}
                        score={score.score}
                        key={score.timeStamp}
                    />
                })}
            </div>
        </div>
    );
}