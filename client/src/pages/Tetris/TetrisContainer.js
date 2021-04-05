import React, { useEffect, useState, useContext } from "react";
import Tetris from "../../components/Tetris/Tetris";
import history from "../../history";
import { AuthContext } from '../../context/AuthContext';
import GameService from "../../services/GameService";
import Leaderboard from "../../components/Leaderboard";
import TxService from "../../services/TxService";
import NavBar from "../../components/Nav/NavBar";
import "./tetrisStyle.css";

export default function TetrisContainer() {
  const authContext = useContext(AuthContext);

  const [pot, setPot] = useState(0);
  const [scores, setScores] = useState([]);
  const [scoreToBeat, setScoreToBeat] = useState(1000);
  const [user, setUser] = useState(authContext.user.username);

  useEffect(() => {
    getInfo();
  }, []);

  function getInfo() {
    return new Promise(resolve => {
      GameService.getInfo("tetris").then(data => {
        if (!data.message) {
          setPot(data.pot);
          let scoresArray = (data.scores.sort((a, b) => (b.score - a.score))).slice(0, 10);
          if (scoresArray.length > 0) {
            setScoreToBeat(scoresArray[0].score);
            setScores(scoresArray);
          }
          resolve();
        } else {
          console.log("error");
          resolve();
        }
      });
    });
  }

  function gameStart() {
    TxService.potPayment(0.000152, "tetris").then(data => {
      setPot(pot + 0.000152);
    });
  }

  async function gameOver(score) {
    await getInfo();
    // multiple scores
    if (scores.length >= 1) {
      // top score
      if (score > scores[0].score) {
        GameService.potPayout("tetris").then(data => {
          newScore(score);
        });
      } else {
        newScore(score);
      }
    } else {
      // no scores set
      newScore(score);
    }
  }

  function newScore(score) {
    GameService.newScore("tetris", user, score).then(data => {
      getInfo();
    });
  }


  return (
    <div>
      <NavBar page="tetris" />
      <div id="container" tabIndex="0" style={{ outline: "none" }} onKeyDown={e => e.preventDefault()}>
        {/* <div id="closeGameButton" onClick={() => history.push("/")}>
          <img id="closeX" src="https://firebasestorage.googleapis.com/v0/b/gamesresources-28440.appspot.com/o/yellowX.png?alt=media&token=4fca2aaa-9123-434a-839d-3a1cf3ee3436" alt="close button"></img>
        </div> */}
        <Tetris start={() => gameStart()} gameOver={(score) => gameOver(score)} />
        <div id="info">
          <div id="top">
            <div id="titleTetris">
              TETRIS
            </div>
            <div className="dotTetris">
            </div>
            <div id="jackpot">
              Jackpot: {parseFloat(pot.toFixed(6))} ETH
            </div>
            <div className="dotTetris">
            </div>
            <div id="highScore">
              Score to beat: {scoreToBeat}
            </div>
          </div>
        </div>
        <div id="boardAndInstruct">
          <div id="leaderBoardArea">
            <Leaderboard scores={scores} page="tetris"/>
          </div>
          <div id="instructionsTetris">
            <div>
              How to play
              </div>
            <ol id="instuctList">
              <li className="liSnake">
                Deposit funds in your account.
                </li>
              <li className="liSnake">
                Start game - each play costs $0.25.
                </li>
              <li className="liSnake">
                Use the arrow keys (desktop) or the arrow buttons (mobile) to play.
                </li>
              <li className="liSnake">
                Clear rows by filling them completely and increase your score.
                </li>
              <li className="liSnake">
                The speed increases as you progress.
                </li>
              <li className="liSnake">
                Beat the top score and win the pot!
                </li>
            </ol>
          </div>
        </div>
      </div>
      <div id="footerYellow">
      </div>
    </div>
  );
}