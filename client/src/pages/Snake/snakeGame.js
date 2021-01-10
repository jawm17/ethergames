import React, { useState, useRef, useEffect } from "react";
import { useInterval } from "./useInterval";
import {
  CANVAS_SIZE,
  SNAKE_START,
  APPLE_START,
  SCALE,
  SPEED,
  DIRECTIONS
} from "./constants";

export default function SnakeGame() {
  const canvasRef = useRef();
  const [snake, setSnake] = useState(SNAKE_START);
  const [apple, setApple] = useState(APPLE_START);
  const [dir, setDir] = useState([0, -1]);
  const [speed, setSpeed] = useState(null);
  const [gameOver, setGameOver] = useState(true);
  const [score, setScore] = useState(0);

  var rectWidth = 1;
  var rectHeight = 1;
  var cornerRadius = 0.2;

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
      setScore(score + 1);
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
    setSnake(SNAKE_START);
    setApple(APPLE_START);
    setDir([0, -1]);
    setSpeed(SPEED);
    setGameOver(false);
    setScore(0);
  };

  useEffect(() => {
    const context = canvasRef.current.getContext("2d");
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.fillStyle = "lightgreen";
    snake.forEach(([x, y]) => {

      // Set faux rounded corners
      context.lineJoin = "round";
      context.lineWidth = cornerRadius;

      // Change origin and dimensions to match true size (a stroke makes the shape a bit larger)
      context.strokeStyle = "black";
      context.strokeRect(x + (cornerRadius / 2), y + (cornerRadius / 2), rectWidth - cornerRadius, rectHeight - cornerRadius);
      context.fillRect(x + (cornerRadius / 2), y + (cornerRadius / 2), rectWidth - cornerRadius, rectHeight - cornerRadius);

    });
    context.fillStyle = "red";
    context.fillRect(apple[0], apple[1], 1, 1);
  }, [snake, apple, gameOver]);

  return (
    <div>
      <div style={{ outline: "none", display: "flex", justifyContent: "center" }} role="button" tabIndex="0" onKeyDown={e => keyDown(e)}>
        <canvas
          // style={{border: "1px dashed black", backgroundColor: "#fefefe"}}
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
  );
};