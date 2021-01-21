import React, { useState, useEffect, useRef } from "react";
import SnakeGame from "./snakeGame";
import TxService from "../../services/TxService";
import { useInterval } from "./useInterval";
import "./snakeStyle.css";


export default function Container() {
  const [score, setScore] = useState(0);

  function incrementScore() {
    setScore(score + 5);
  }


  return (
    <div id="container" tabIndex="0">
      <SnakeGame inc={() => incrementScore()}/>
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
          <div id="dot">

          </div>
          <div id="highScore">
            Score to beat: 1,205
                    </div>
          <div id="playBtn">
            play
                    </div>
          <div id="score">
            Score: {score}
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