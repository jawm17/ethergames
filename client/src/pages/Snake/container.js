import React, { useState, useEffect } from "react";
import SnakeGame from "./snakeGame";
import TxService from "../../services/TxService";
import GameInfoService from "../../services/GameInfoService";
import "./snakeStyle.css";


export default function Container() {
  const [score, setScore] = useState(0);
  const [pot, setPot] = useState(0);

  useEffect(() => {
    getInfo();
  }, []);

  function getInfo() {
    GameInfoService.getInfo("snake").then(data => {
      if(!data.message) {
        setPot(data.pot);
      } else {
        console.log("error");
      }
    })
  }

  function incrementScore() {
    setScore(score + 5);
  }

  function gameStart() {
    console.log("start")
    TxService.potPayment(2, "snake").then(data => {
      console.log(data);
    })
    setScore(0);
    getInfo();
  }


  return (
    <div id="container" tabIndex="0">
      <SnakeGame inc={() => incrementScore()} start={() => gameStart()}/>
      <div id="info">
        <div id="top">
          <div id="title">
            SNAKE
          </div>
          <div id="dot">

          </div>
          <div id="jackpot">
            Jackpot: {pot} ETH
          </div>
          <div id="dot">

          </div>
          <div id="highScore">
            Score to beat: 1,205
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