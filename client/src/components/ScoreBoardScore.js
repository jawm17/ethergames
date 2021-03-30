import React from "react";
import "./styles/scoreBoardScoreStyle.css";

export default function Score(props) {

    return (
        <div id="leaderBoardScore">
            <div className="leftEl">
                {props.user}
            </div>
            <div className="rightEl">
                {props.score}
            </div>
        </div>
    );
}