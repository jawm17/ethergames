import React, { useEffect, useState } from "react";
import ScoreBoardScore from "./ScoreBoardScore";
import "./styles/leaderboardStyle.css";

export default function Leaderboard(props) {
    const [colorStyle, setColorStyle] = useState({ color: "white" });

    const style = {
        tetrisColor: {
            color: "yellow"
        },
        snakeColor: {
            color: "rgb(72, 254, 12)"
        },
        asteroidsColor: {
            color: "white"
        },
        pacmanColor: {
            color: "lightblue"
        }
    }

    useEffect(() => {
        if (props.page === "snake") {
            setColorStyle(style.snakeColor);
        } else if (props.page === "tetris") {
            setColorStyle(style.tetrisColor)
        } else if (props.page === "asteroids") {
            setColorStyle(style.asteroidsColor)
        } else if (props.page === "pacman") {
            setColorStyle(style.pacmanColor)
        }
    }, []);

    return (
        <div>
            <div id="leaderBoardTitle" style={colorStyle}>
                High Scores
            </div>
            <div id="leaderBoard">
                {props.scores.map(score => {
                    return <ScoreBoardScore
                        user={score.address}
                        score={score.score}
                        key={score.timeStamp}
                    />
                })}
            </div>
        </div>
    );
}