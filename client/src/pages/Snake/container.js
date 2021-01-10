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
                    <div id="dot">

                    </div>
                    <div id="jackpot">
                        Jackpot: 1.20433 ETH
                    </div>
                    <div id="playBtn">
                        play
                    </div>
                </div>
                <div id="leaderBoardArea">
                    <div id="leaderBoardTitle">
                        High Scores
                    </div>
                    <div id="leaderBoard">

                    </div>
                </div>
            </div>
        </div>
    );
}