import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from '../../context/AuthContext';
import NavBar from "../../components/Nav/NavBar";
import SnakeGame from "./SnakeGame";
import axios from "axios";
import Footer from "../../components/Footer/Footer"
import Leaderboard from "../../components/Leaderboard";
import JackPotAlert from "../../components/JackPotAlert";
import "./snakeStyle.css";

export default function SnakeContainer() {
  const { address, balance, setBalance } = useContext(AuthContext);

  const [score, setScore] = useState(0);
  const [pot, setPot] = useState(0);
  const [scores, setScores] = useState([]);
  const [jackPot, setJackPot] = useState(false);
  const [prevPot, setPrevPot] = useState(0);
  const [personalBest, setPersonalBest] = useState(0);

  useEffect(() => {
    getGameInfo();
  }, []);

  useEffect(() => {
    if (address) {
      getUserScores();
    }
  }, [address]);

  async function getGameInfo() {
    try {
      const res = await axios.get("/game/info/snake");
      const { data } = res;
      let scoresArray = (data.scores.sort((a, b) => (b.score - a.score))).slice(0, 10);
      setPot(data.pot);
      setScores(scoresArray);
    } catch (err) {
      console.log(err);
    }
  }

  async function getUserScores() {
    try {
      const data = await axios.post("/user/info", { "address": address });
      const { scores } = data.data.document;
      console.log(scores);

      let topScore = 0;
      for (let i = 0; i < scores.length; i++) {
        if(scores[i].game=== "snake" && scores[i].score > topScore) {
          topScore = scores[i].score;
        }
      }

      setPersonalBest(topScore);
    } catch (err) {
      console.log(err);
    }
  }

  function incrementScore() {
    setScore(score + 5);
  }

  async function gameStart() {
    try {
      await axios.post("/game/payment", { "amount": 0.0001, "game": "snake", "address": address });
      setPot(pot + 0.0001);
      setBalance(balance - 1);
      setScore(0);
    } catch (err) {
      console.log(err);
    }
  }

  async function newScore() {
    try {
      await axios.post("/game/score", { "game": "snake", "address": address, "score": score });
      getGameInfo();
    } catch (err) {
      console.log(err);
    }
  }

  async function gameOver() {
    await getGameInfo();
    if (scores.length < 1 || score > scores[0].score) {
      try {
        setPrevPot(pot);
        setJackPot(true);
        newScore();
        await axios.post("/game/payout", { "game": "snake", "address": address });
      } catch (err) {
        console.log(err);
      }
    } else {
      newScore();
    }
  }

  return (
    <div>
      <NavBar page="snake" />
      {jackPot ? (
        <JackPotAlert
          close={() => setJackPot(false)}
          pot={prevPot}
        />
      ) : null}
      <div id="container" tabIndex="0" style={{ outline: "none" }}>
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
              Score to beat: {scores[0]?.score || 1000}
            </div>
            <div id="scoreSnake">
              Score: {score}
            </div>
            <div id="personalBest">
              Personal Best: {personalBest}
            </div>
          </div>
        </div>

        <div id="boardAndInstruct">

          <div id="leaderBoardArea">
            <Leaderboard scores={scores} page="snake" />
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
                Start game - each play costs $0.25.
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