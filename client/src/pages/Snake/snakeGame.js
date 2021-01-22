import React, { useState, useRef, useEffect, useContext } from "react";
import UserService from '../../services/UserService';
import { AuthContext } from '../../context/AuthContext';
import "./snakeStyle.css";
import { useInterval } from "./useInterval";
var CANVAS_SIZE = [1250, 670];
var SNAKE_START = [
  [17, 10],
  [17, 11]
];
var APPLE_START = [28, 3];
var SCALE = 30;
var SPEED = 70;
var DIRECTIONS = {
  38: [0, -1], // up
  40: [0, 1], // down
  37: [-1, 0], // left
  39: [1, 0] // right
};


export default function SnakeGame(props) {
  const authContext = useContext(AuthContext);

  const canvasRef = useRef();
  const [snake, setSnake] = useState(SNAKE_START);
  const [apple, setApple] = useState(APPLE_START);
  const [dir, setDir] = useState([0, -1]);
  const [speed, setSpeed] = useState(null);
  const [gameOver, setGameOver] = useState(true);
  const [balance, setBalance] = useState(0);
  const [startDisplay, setStartDisplay] = useState("flex");
  const [endDisplay, setEndDisplay] = useState("none");
  const [width, setWidth] = useState(1250);

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
    },
    endScreen: {
      display: endDisplay,
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
  

  CANVAS_SIZE = [width, 670];

  useInterval(() => gameLoop(), speed);

  const windowResize = () => {
    if(window.innerWidth >= 1250) {
      setWidth(1250);
    } else {
      setWidth(window.innerWidth);
    }
  }

  const endGame = () => {
    setSpeed(null);
    setGameOver(true);
    props.gameOver();
    setEndDisplay("flex");
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
    if (gameOver) {
      UserService.getUserInfo().then(data => {
        const { message, balance } = data;
        if (!message) {
          if (balance >= 0.001) {
            setSnake(SNAKE_START);
            setApple(APPLE_START);
            setDir([0, -1]);
            setSpeed(SPEED);
            setStartDisplay("none");
            setEndDisplay("none");
            props.start();
            setGameOver(false);
          } else {
            alert("insufficient funds");
          }
        }
        else if (message.msgBody === "Unauthorized") {
          //Replace with middleware 
          authContext.setUser({ username: "" });
          authContext.setIsAuthenticated(false);
        }
      });
    }
  };

  useEffect(() => {
    window.onresize = windowResize;
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
    <div id="snakeTrigger" style={{ outline: "none" }} tabIndex="0" onKeyDown={e => keyDown(e)}>
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