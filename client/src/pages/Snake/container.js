import React, { useState, useEffect, useContext } from "react";
import SnakeGame from "./snakeGame";
import TxService from "../../services/TxService";
import GameService from "../../services/GameService";
import UserService from '../../services/UserService';
import Score from "../../components/score";
import { AuthContext } from '../../context/AuthContext';
import "./snakeStyle.css";


export default function Container() {
  const authContext = useContext(AuthContext);

  const [score, setScore] = useState(0);
  const [pot, setPot] = useState(0);
  const [scores, setScores] = useState([]);
  const [balance, setBalance] = useState(0);
  const [user, setUser] = useState(authContext.user.username);

  useEffect(() => {
    getInfo();
  }, []);

  function getBalance() {
    UserService.getUserInfo().then(data => {
      const { message, balance } = data;
      if (!message) {
        setBalance(balance);
      }
      else if (message.msgBody === "Unauthorized") {
        //Replace with middleware 
        authContext.setUser({ username: "" });
        authContext.setIsAuthenticated(false);
      }
    });
  }

  function getInfo() {
    GameService.getInfo("snake").then(data => {
      if (!data.message) {
        setPot(data.pot);
        console.log(data.scores.sort((a,b)=> (b.score - a.score)))
        setScores(data.scores.sort((a,b)=> (b.score - a.score)));
      } else {
        console.log("error");
      }
    })
  }

  function incrementScore() {
    setScore(score + 5);
  }

  function gameStart() {
    TxService.potPayment(2, "snake").then(data => {
      console.log(data);
    })
    setScore(0);
    getInfo();
  }

  function gameOver() {
    if (scores.length >= 10) {
      console.log(scores);
    } else {
      GameService.newScore("snake", user, score).then(data => {
        console.log(data);
      })
    }
  }


  return (
    <div id="container" tabIndex="0">
      <SnakeGame inc={() => incrementScore()} start={() => gameStart()} gameOver={() => gameOver()} />
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
            {scores.map(score => {
              return <Score
                user={score.user}
                score={score.score}
                key={score.timeStamp}
              />
            })}
          </div>
        </div>
      </div>
    </div>
  );
}