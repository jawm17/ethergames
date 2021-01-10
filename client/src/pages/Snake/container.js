import React from "react";
import SnakeGame from "./snakeGame";
import "./containerStyle.css";

export default function Container() {

    return (
        <div>
            <div id="screen">
                <SnakeGame />
            </div>
            <div id="info">
                <div id="top">
                    <div id="title">
                        SNAKE
                    </div>
                    <div id="playBtn">
                        play
                    </div>
                </div>
                <div id="leaderBoardArea">
                    High Scores
                    <div id="leaderBoard">

                    </div>
                </div>
            </div>
        </div>
    );
}