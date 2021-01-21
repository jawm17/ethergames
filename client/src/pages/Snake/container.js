import React, { useState, useEffect, useRef } from "react";
import TxService from "../../services/TxService";
import { useInterval } from "./useInterval";
import {
  CANVAS_SIZE,
  SNAKE_START,
  APPLE_START,
  SCALE,
  SPEED,
  DIRECTIONS
} from "./constants";
import "./containerStyle.css";

var rectWidth = 1;
var rectHeight = 1;
var cornerRadius = 0.2;

export default function Container() {
  const canvasRef = useRef();
  const [snake, setSnake] = useState(SNAKE_START);
  const [apple, setApple] = useState(APPLE_START);
  const [dir, setDir] = useState([0, -1]);
  const [speed, setSpeed] = useState(null);
  const [gameOver, setGameOver] = useState(true);
  const [score, setScore] = useState(0);
  const [startDisplay, setStartDisplay] = useState("flex");

  const style = {
    startScreen: {
      display: startDisplay,
      position: "absolute",
      width: "100%",
      height: "100%",
      backgroundColor: "#63C603",
      borderBottomRightRadius: 20,
      borderBottomLeftRadius: 20,
      justifyContent: "center",
      alignItems: "center"
    }
  }

  useInterval(() => gameLoop(), speed);

  const endGame = () => {
    setSpeed(null);
    setGameOver(true);
  };

  const keyDown = (e) => {
    let keyCode = e.keyCode
    e.preventDefault();
    if (keyCode >= 37 && keyCode <= 40) {
      setDir(DIRECTIONS[keyCode]);
    } else if (gameOver && keyCode === 32) {
      startGame();
    }
  }

  const createApple = () =>
    apple.map((_a, i) => Math.floor(Math.random() * (CANVAS_SIZE[i] / SCALE)));

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
    if(gameOver) {
      setSnake(SNAKE_START);
      setApple(APPLE_START);
      setDir([0, -1]);
      setSpeed(SPEED);
      setGameOver(false);
      setScore(0);
      TxService.potPayment(2, "snake").then(data => {
        console.log(data)
      })
      setStartDisplay("none");
    }
  };

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.fillStyle = "#2e2d2d";
    snake.forEach(([x, y]) => {

      // Set faux rounded corners
      context.lineJoin = "round";
      context.lineWidth = cornerRadius;

      // Change origin and dimensions to match true size (a stroke makes the shape a bit larger)
      context.strokeStyle = "black";
      context.strokeRect(x + (cornerRadius / 2), y + (cornerRadius / 2), rectWidth - cornerRadius, rectHeight - cornerRadius);
      context.fillRect(x + (cornerRadius / 2), y + (cornerRadius / 2), rectWidth - cornerRadius, rectHeight - cornerRadius);

    });
    context.fillStyle = "gray";
    context.fillRect(apple[0], apple[1], 1, 1);
    window.addEventListener("keydown", (e) => keyDown(e));
  }, [snake, apple, gameOver]);


  return (
    <div id="container" tabIndex="0" onKeyDown={e => keyDown(e)}>
      <div id="screen">
        <div id="startScreen" style={style.startScreen}>
          <div id="startInfo">
          <div id="snakeStartTitle">
              SNAKE
            </div>
            <div id="snakeStartSub">
                Press the space bar to start
            </div>
          </div>
        </div>
        <div style={{ outline: "none", display: "flex", justifyContent: "center" }} role="button" tabIndex="0">
          <canvas
            style={{ border: "1px dashed black" }}
            ref={canvasRef}
            width={`${CANVAS_SIZE[0]}px`}
            height={`${CANVAS_SIZE[1]}px`}
          />
          <div>
          </div>
        </div>
        {/* {gameOver && <div>GAME OVER!</div>}
      score: {score} */}
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
          <div id="dot">

          </div>
          <div id="highScore">
            Score to beat: 1,205
                    </div>
          <div id="playBtn" onClick={() => startGame()}>
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