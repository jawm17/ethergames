import React, { useState, useEffect, useContext } from "react";
import NavBar from "../../components/Nav/NavBar";
import SnakeGame from "./SnakeGame";
import TxService from "../../services/TxService";
import GameService from "../../services/GameService";
import { AuthContext } from '../../context/AuthContext';
import "./snakeStyle.css";
import Footer from "../../components/Footer/Footer"
import Leaderboard from "../../components/Leaderboard";

export default function SnakeContainer() {
  const authContext = useContext(AuthContext);

  const [score, setScore] = useState(0);
  const [pot, setPot] = useState(0);
  const [scores, setScores] = useState([]);
  const [scoreToBeat, setScoreToBeat] = useState(1000);
  const [user, setUser] = useState(authContext.user.username);

  useEffect(() => {
    getInfo();
  }, []);

  function getInfo() {
    return new Promise(resolve => {
      GameService.getInfo("snake").then(data => {
        if (!data.message) {
          let scoresArray = (data.scores.sort((a, b) => (b.score - a.score))).slice(0, 10);
          setPot(data.pot);
          setScores(scoresArray);
          if (scoresArray.length > 0) {
            setScoreToBeat(scoresArray[0].score);
          }
          resolve();
        } else {
          console.log("game info error");
          resolve();
        }
      });
    });
  }

  function incrementScore() {
    setScore(score + 5);
  }

  function gameStart() {
    TxService.potPayment(0.000152, "snake").then(data => {
      setPot(pot + 0.000152);
    });
    setScore(0);
  }

  function newScore() {
    GameService.newScore("snake", user, score).then(data => {
      getInfo();
    });
  }

  async function gameOver() {
    await getInfo();
    if (scores.length >= 1) {
      // multiple scores
      if (score > scores[0].score) {
        // top score
        GameService.potPayout("snake").then(data => {
          newScore();
        });
      } else {
        newScore();
      }
    } else {
      // no scores set
      newScore();
    }
  }

  return (
    <div>
      <NavBar />
      <div id="container" tabIndex="0" style={{ outline: "none" }}>
        {/* <div id="headerSnake">

      </div> */}
        {/* <div id="closeGameButton" onClick={() => history.push("/")}>
          <img id="closeX" src="https://firebasestorage.googleapis.com/v0/b/gamesresources-28440.appspot.com/o/x.png?alt=media&token=fc3b3baa-be28-4071-a4e1-271b96c5995f" alt="close button"></img>
        </div> */}
        <SnakeGame inc={() => incrementScore()} start={() => gameStart()} gameOver={() => gameOver()} />
        <div id="info">
          <div id="top">
            <div id="title">
              SNAKE
            </div>
            <div className="dot">
            </div>
            <div id="jackpot">
              Jackpot: {parseFloat(pot.toFixed(6))} ETH
            </div>
            <div className="dot">
            </div>
            <div id="highScore">
              Score to beat: {scoreToBeat}
            </div>
            <div id="scoreSnake">
              Score: {score}
            </div>
          </div>
        </div>

        <div id="boardAndInstruct">

          <div id="leaderBoardArea">
            <Leaderboard scores={scores} />
          </div>

          <div id="instructions">
            <div>
              How to play
              </div>
            <ol id="instuctList">
              <li className="liSnake">
                Deposit funds in your account.
                </li>
              <li className="liSnake">
                Start game - each play costs $0.25 - 70% goes to the pot while the remaining 30% is used to maintain the site.
                </li>
              <li className="liSnake">
                Use the arrow keys (desktop) or the arrow buttons (mobile) to move. Eat the food and grow in size. Each food eaten is 5 points.
                </li>
              <li className="liSnake">
                Don't eat yourself.
                </li>
              <li className="liSnake">
                Don't eat the border.
                </li>
              <li className="liSnake">
                Beat the top score and win the pot!
                </li>
            </ol>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}