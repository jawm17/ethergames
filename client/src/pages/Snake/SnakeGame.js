import React, { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from '../../context/AuthContext';
import "./snakeStyle.css";
import { useInterval } from "./useInterval";
import NavBar from "../../components/Nav/NavBar";
import JackPotAlert from "../../components/JackPotAlert";
var CANVAS_SIZE = [1250, 670];
var SNAKE_START = [
  [1, 10],
  [1, 11]
];
var APPLE_START = [1, 14];
var SCALE = 30;
var snakeSpeed = 125;
var DIRECTIONS = {
  38: [0, -1], // up
  40: [0, 1], // down
  37: [-1, 0], // left
  39: [1, 0] // right
};

export default function SnakeGame() {
  const { address, balance, setBalance } = useContext(AuthContext);
  const canvasRef = useRef();
  const [snake, setSnake] = useState(SNAKE_START);
  const [apple, setApple] = useState(APPLE_START);
  const [dir, setDir] = useState([0, -1]);
  let prevDir = DIRECTIONS[38];
  const [speed, setSpeed] = useState(null);
  const [gameOver, setGameOver] = useState(true);
  const [startDisplay, setStartDisplay] = useState("flex");
  const [endDisplay, setEndDisplay] = useState("none");
  const [width, setWidth] = useState(window.innerWidth * .63);

  const [score, setScore] = useState(0);
  const [pot, setPot] = useState(0);
  const [scores, setScores] = useState([]);
  const [jackPot, setJackPot] = useState(false);
  const [prevPot, setPrevPot] = useState(0);
  const [personalBest, setPersonalBest] = useState(0);

  const style = {
    startScreen: {
      display: startDisplay,
      position: "absolute",
      width: "100%",
      height: "100%",
      backgroundColor: "#63C603",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
    },
    endScreen: {
      display: endDisplay,
      position: "absolute",
      width: "100%",
      height: "100%",
      backgroundColor: "#63C603",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
    }
  }

  var rectWidth = 1;
  var rectHeight = 1;
  var cornerRadius = 0.2;

  CANVAS_SIZE = [width, 670];

  useInterval(() => gameLoop(), speed);

  const windowResize = () => {
    console.log('resize')
    setWidth(window.innerWidth * .63);
    // if (window.innerWidth >= 1250) {
    //   setWidth(1250);
    // } else {
    //   setWidth(window.innerWidth - 50);
    // }
  }

  const endGame = () => {
    gameDone();
    setSpeed(null);
    setGameOver(true);
    setEndDisplay("flex");
  };

  const keyDown = (e) => {
    let keyCode = e.keyCode
    e.preventDefault();
    if (keyCode >= 37 && keyCode <= 40) {
      // don't allow player to reverse into themselves
      if (keyCode === 39 && prevDir === DIRECTIONS[37]) { return }
      if (keyCode === 37 && prevDir === DIRECTIONS[39]) { return }
      if (keyCode === 40 && prevDir === DIRECTIONS[38]) { return }
      if (keyCode === 38 && prevDir === DIRECTIONS[40]) { return }
      prevDir = DIRECTIONS[keyCode];
      setDir(DIRECTIONS[keyCode]);
    }
  }

  const createApple = () => {
    apple.map((_a, i) => {
      console.log(CANVAS_SIZE[i] / SCALE + 1);
      // console.log(Math.ceil(Math.random() * (CANVAS_SIZE[i] / SCALE)) - 1 );
    })
    return apple.map((_a, i) => (Math.floor(Math.random() * (CANVAS_SIZE[i] / (SCALE + 1)))));
  }

  const checkCollision = (piece, snk = snake) => {
    if (
      piece[0] * SCALE >= CANVAS_SIZE[0] ||
      piece[0] < 0 ||
      piece[1] * SCALE >= CANVAS_SIZE[1] ||
      piece[1] < 0
    )
      return true;

    for (const segment of snk) {
      if (piece[0] === segment[0] && piece[1] === segment[1]) return true;
    }
    return false;
  };

  const checkAppleCollision = newSnake => {
    if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
      let newApple = createApple();
      setScore(score + 5);
      while (checkCollision(newApple, newSnake)) {
        newApple = createApple();
      }
      setApple(newApple);
      return true;
    }
    return false;
  };

  const gameLoop = () => {
    const snakeCopy = JSON.parse(JSON.stringify(snake));
    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
    snakeCopy.unshift(newSnakeHead);
    if (checkCollision(newSnakeHead)) endGame();
    if (!checkAppleCollision(snakeCopy)) snakeCopy.pop();
    setSnake(snakeCopy);
  };

  const startGame = () => {
    document.addEventListener("keydown", (e) => keyDown(e));
    setSnake(SNAKE_START);
    setApple(APPLE_START);
    setDir([0, -1]);
    prevDir = DIRECTIONS[38];
    setSpeed(snakeSpeed);
    setStartDisplay("none");
    setEndDisplay("none");
    setGameOver(false);
  }

  async function initGame() {
    if (gameOver && address) {
      try {
        const data = await axios.post("/user/balance", { "address": address });
        const { balance } = data.data;
        if (Math.floor(balance / 0.0001) >= 1) {
          startGame();
          gamePayment();
        } else {
          alert("Please deposit funds in your account");
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function gamePayment() {
    try {
      await axios.post("/game/payment", { "amount": 0.0001, "game": "snake", "address": address });
      setPot(pot + 0.0001);
      setBalance(balance - 1);
      setScore(0);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.fillStyle = "#63C603";
    snake.forEach(([x, y]) => {

      // Set faux rounded corners
      context.lineJoin = "round";
      context.lineWidth = cornerRadius;

      // Change origin and dimensions to match true size (a stroke makes the shape a bit larger)
      context.strokeStyle = "black";
      context.strokeRect(x + (cornerRadius / 2), y + (cornerRadius / 2), rectWidth - cornerRadius, rectHeight - cornerRadius);
      context.fillRect(x + (cornerRadius / 2), y + (cornerRadius / 2), rectWidth - cornerRadius, rectHeight - cornerRadius);
    });
    context.fillStyle = "black";
    context.fillRect(apple[0], apple[1], 1, 1);
  }, [snake, apple, gameOver]);

  useEffect(() => {
    window.onresize = windowResize;
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
      let topScore = 0;
      for (let i = 0; i < scores.length; i++) {
        if (scores[i].game === "snake" && scores[i].score > topScore) {
          topScore = scores[i].score;
        }
      }
      setPersonalBest(topScore);
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

  async function gameDone() {
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
    <div id="snakeGameArea">
      {jackPot ? (
        <JackPotAlert
          close={() => setJackPot(false)}
          pot={prevPot}
        />
      ) : null}
      <div style={{ "display": "none" }} >
        <NavBar />
      </div>
      <div id="screen" style={{ outline: "none" }} tabIndex="0">
        <div id="startScreen" style={style.startScreen}>
          <div id="startInfo">
            <div id="snakeStartTitle">
              SNAKE
            </div>
            <div id="snakeStartSub">
              Press play to start
            </div>
          </div>
        </div>
        <div id="startScreen" style={style.endScreen}>
          <div id="startInfo">
            <div id="snakeEndTitle">
              Game Over
            </div>
            <div id="snakeStartSub">
              Press play to start
            </div>
          </div>
        </div>

        <canvas
          id="snakeCanvas"
          ref={canvasRef}
          width={`${CANVAS_SIZE[0]}px`}
          height={`${CANVAS_SIZE[1]}px`}
        />

        <div id="snakeInfo">
          <div className="snakeInfoEl">
            Score: {score}
          </div>
          <div className="snakeInfoEl">
            Jackpot: {parseFloat(pot.toFixed(6))} ETH
              </div>
          <div className="snakeInfoEl">
            Highscore: {scores[0]?.score || 0}
          </div>
        </div>
        {/* <div id="snakeControlsOuter">
            <div id="snakeControls">
              <img className="snakeControlBtn" onClick={() => setDir(DIRECTIONS[37])} src="https://firebasestorage.googleapis.com/v0/b/gamesresources-28440.appspot.com/o/back-button.png?alt=media&token=f61923a9-ca19-4aaf-974f-31c5f2f2c632" alt="left button"></img>
              <img className="snakeControlBtn" id="rightBtn" onClick={() => setDir(DIRECTIONS[39])} src="https://firebasestorage.googleapis.com/v0/b/gamesresources-28440.appspot.com/o/back-button.png?alt=media&token=f61923a9-ca19-4aaf-974f-31c5f2f2c632" alt="right button"></img>
              <img className="snakeControlBtn" id="upBtn" onClick={() => setDir(DIRECTIONS[38])} src="https://firebasestorage.googleapis.com/v0/b/gamesresources-28440.appspot.com/o/back-button.png?alt=media&token=f61923a9-ca19-4aaf-974f-31c5f2f2c632" alt="up button"></img>
              <img className="snakeControlBtn" id="downBtn" onClick={() => setDir(DIRECTIONS[40])} src="https://firebasestorage.googleapis.com/v0/b/gamesresources-28440.appspot.com/o/back-button.png?alt=media&token=f61923a9-ca19-4aaf-974f-31c5f2f2c632" alt="down button"></img>
            </div>
          </div> */}
        {/* <div id="playBtnSnake" onClick={() => initGame()}>
          play
          </div> */}
        <div id="playBtn-container" onClick={() => initGame()}>
          <div id="playBtn-outerContainer">
            <div id="playBtn-innerContainer">
              <div id="playButton">Play</div>
            </div>
            <div className="playBtnShadowDiv"></div>
          </div>
        </div>
      </div>
    </div>
  );
};