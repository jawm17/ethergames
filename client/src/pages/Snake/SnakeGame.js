import React, { useState, useRef, useEffect, useContext } from "react";
import UserService from '../../services/UserService';
import { AuthContext } from '../../context/AuthContext';
import "./snakeStyle.css";
import { useInterval } from "./useInterval";
import ConfirmPaymentModal from "../../components/ConfirmPaymentModal";
var CANVAS_SIZE = [1250, 670];
var SNAKE_START = [
  [1, 10],
  [1, 11]
];
var APPLE_START = [1, 14];
var SCALE = 30;
var SPEED = 100;
var DIRECTIONS = {
  38: [0, -1], // up
  40: [0, 1], // down
  37: [-1, 0], // left
  39: [1, 0] // right
};


export default function SnakeGame(props) {
  const authContext = useContext(AuthContext);

  const canvasRef = useRef();
  const [confirmingPayment, setConfirmingPayment] = useState(false);
  const [snake, setSnake] = useState(SNAKE_START);
  const [apple, setApple] = useState(APPLE_START);
  const [dir, setDir] = useState([0, -1]);
  const [speed, setSpeed] = useState(null);
  const [gameOver, setGameOver] = useState(true);
  const [balance, setBalance] = useState(0);
  const [startDisplay, setStartDisplay] = useState("flex");
  const [endDisplay, setEndDisplay] = useState("none");
  const [width, setWidth] = useState(window.innerWidth >= 1250 ? 1250 : window.innerWidth - 50);

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
      alignItems: "center",

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
      alignItems: "center",

    }
  }

  var rectWidth = 1;
  var rectHeight = 1;
  var cornerRadius = 0.2;


  CANVAS_SIZE = [width, 670];

  useInterval(() => gameLoop(), speed);

  const windowResize = () => {
    console.log('resize')
    if (window.innerWidth >= 1250) {
      setWidth(1250);
    } else {
      setWidth(window.innerWidth - 50);
    }
  }

  const endGame = () => {
    setSpeed(null);
    setGameOver(true);
    props.gameOver();
    setEndDisplay("flex");
  };

  const keyDown = (e) => {
    console.log("yes");
    let keyCode = e.keyCode
    e.preventDefault();
    if (keyCode >= 37 && keyCode <= 40) {
      // don't allow player to reverse into themselves
      if (keyCode === 39 && dir === DIRECTIONS[37]) {
        return
      }
      if (keyCode === 37 && dir === DIRECTIONS[39]) {
        return
      }
      if (keyCode === 40 && dir === DIRECTIONS[38]) {
        return
      }
      if (keyCode === 38 && dir === DIRECTIONS[40]) {
        return
      }
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
    document.addEventListener("keydown", (e) => keyDown(e));
    if (gameOver) {
      setConfirmingPayment(true);
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

  function confirmPayment() {
    UserService.getUserBalance().then(data => {
      const { message, balance } = data;
      if (!message) {
        if (balance >= 0.000152) {
          setSnake(SNAKE_START);
          setApple(APPLE_START);
          setDir([0, -1]);
          setSpeed(SPEED);
          setStartDisplay("none");
          setEndDisplay("none");
          props.start();
          setConfirmingPayment(false);
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

  return (
    <div>
      {confirmingPayment ? (
        <ConfirmPaymentModal
          close={() => confirmPayment()}
        />
      ) : null}
      <div id="snakeTrigger" style={{ outline: "none" }} tabIndex="0">
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
              id="snakeCanvas"
              ref={canvasRef}
              width={`${CANVAS_SIZE[0]}px`}
              height={`${CANVAS_SIZE[1]}px`}
            />
          </div>
          <div id="snakeControlsOuter">
            <div id="snakeControls">
              <img className="snakeControlBtn" onClick={() => setDir(DIRECTIONS[37])} src="https://firebasestorage.googleapis.com/v0/b/gamesresources-28440.appspot.com/o/back-button.png?alt=media&token=f61923a9-ca19-4aaf-974f-31c5f2f2c632" alt="left button"></img>
              <img className="snakeControlBtn" id="rightBtn" onClick={() => setDir(DIRECTIONS[39])} src="https://firebasestorage.googleapis.com/v0/b/gamesresources-28440.appspot.com/o/back-button.png?alt=media&token=f61923a9-ca19-4aaf-974f-31c5f2f2c632" alt="right button"></img>
              <img className="snakeControlBtn" id="upBtn" onClick={() => setDir(DIRECTIONS[38])} src="https://firebasestorage.googleapis.com/v0/b/gamesresources-28440.appspot.com/o/back-button.png?alt=media&token=f61923a9-ca19-4aaf-974f-31c5f2f2c632" alt="up button"></img>
              <img className="snakeControlBtn" id="downBtn" onClick={() => setDir(DIRECTIONS[40])} src="https://firebasestorage.googleapis.com/v0/b/gamesresources-28440.appspot.com/o/back-button.png?alt=media&token=f61923a9-ca19-4aaf-974f-31c5f2f2c632" alt="down button"></img>
            </div>
          </div>
          <div id="playBtnSnake" onClick={() => startGame()}>
            play
          </div>
        </div>
      </div>

    </div>
  );
};