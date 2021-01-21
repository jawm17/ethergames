import React, { useState, useRef, useEffect } from "react";
import "./snakeStyle.css";
import { useInterval } from "./useInterval";
import {
  CANVAS_SIZE,
  SNAKE_START,
  APPLE_START,
  SCALE,
  SPEED,
  DIRECTIONS
} from "./constants";

export default function SnakeGame(props) {
  const canvasRef = useRef();
  const [snake, setSnake] = useState(SNAKE_START);
  const [apple, setApple] = useState(APPLE_START);
  const [dir, setDir] = useState([0, -1]);
  const [speed, setSpeed] = useState(null);
  const [gameOver, setGameOver] = useState(true);
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

  var rectWidth = 1;
  var rectHeight = 1;
  var cornerRadius = 0.2;

  useInterval(() => gameLoop(), speed);

  const endGame = () => {
    setSpeed(null);
    setGameOver(true);
    props.gameOver();
  };

  const keyDown = (e) => {
    let keyCode = e.keyCode
    e.preventDefault();
    if (keyCode >= 37 && keyCode <= 40) {
      setDir(DIRECTIONS[keyCode]);
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
      props.inc();
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
      setStartDisplay("none");
      props.start();
      setGameOver(false);
    }
  };

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

  return (
    <div id="snakeTrigger"  style={{ outline: "none"}} tabIndex="0" onKeyDown={e => keyDown(e)}>
      <div id="screen">
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
        <div style={{ outline: "none", display: "flex", justifyContent: "center" }}>
          <canvas
            style={{ border: "1px dashed black" }}
            ref={canvasRef}
            width={`${CANVAS_SIZE[0]}px`}
            height={`${CANVAS_SIZE[1]}px`}
          />
        </div>
        <div>
        </div>
        <div id="playBtn" onClick={() => startGame()}>
          play
      </div>
      </div>
    </div>


  );
};