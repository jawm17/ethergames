import React, { useEffect, useState, useContext } from "react";
import Tetris from "../../components/Tetris/Tetris";
import { AuthContext } from '../../context/AuthContext';
import GameService from "../../services/GameService";
import Leaderboard from "../../components/Leaderboard";
import TxService from "../../services/TxService";
import axios from "axios"
import NavBar from "../../components/Nav/NavBar";
import JackPotAlert from "../../components/JackPotAlert";
import "./tetrisStyle.css";

export default function TetrisContainer() {
  const { address, balance, setBalance } = useContext(AuthContext);

  const [pot, setPot] = useState(0);
  const [scores, setScores] = useState([]);
  const [jackPot, setJackPot] = useState(false);
  const [prevPot, setPrevPot] = useState(0);

  useEffect(() => {
    getInfo();
  }, []);

  async function getInfo() {
    try {
      const res = await axios.get("/game/info/tetris");
      const { data } = res;
      let scoresArray = (data.scores.sort((a, b) => (b.score - a.score))).slice(0, 10);
      setPot(data.pot);
      setScores(scoresArray);
    } catch (err) {
      console.log(err);
    }
  }

  async function gameStart() {
    try {
      await axios.post("/game/payment", { "amount": 0.0001, "game": "tetris", "address": address });
      setPot(pot + 0.0001);
      setBalance(balance - 1);
    } catch (err) {
      console.log(err);
    }
  }

  async function gameOver(score) {
    await getInfo();
    if (scores.length < 1 || score > scores[0].score) {
      try {
        setPrevPot(pot);
        setJackPot(true);
        newScore(score);
        await axios.post("/game/payout", { "game": "tetris", "address": address });
      } catch (err) {
        console.log(err);
      }
    } else {
      newScore(score);
    }
  }

  async function newScore(score) {
    try {
      await axios.post("/game/score", { "game": "tetris", "address": address, "score": score });
      getInfo();
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <div>
      <NavBar page="tetris" />
      {jackPot ? (
        <JackPotAlert
          close={() => setJackPot(false)}
          pot={prevPot}
        />
      ) : null}
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
              Score to beat: {scores[0]?.score || 1000}
            </div>
          </div>
        </div>
        <div id="boardAndInstruct">
          <div id="leaderBoardArea">
            <Leaderboard scores={scores} page="tetris" />
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