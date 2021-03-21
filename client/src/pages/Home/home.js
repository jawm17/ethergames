import React, { useEffect, useRef, useState } from "react";
import NavBar from "../../components/Nav/NavBar";
import Footer from "../../components/Footer/footer";
import GameService from "../../services/GameService";
import history from "../../history";
import "./homeStyle.css";

export default function Home() {
  const [height, setHeight] = useState(document.documentElement.clientHeight);
  const [snakePot, setSnakePot] = useState(0);
  const [snakeScore, setSnakeScore] = useState(0);
  const [tetrisPot, setTetrisPot] = useState(0);
  const [tetrisScore, setTetrisScore] = useState(0);

  let particles = [];
  const sizes = [15, 20, 25, 35, 45];
  let interval = useRef(null);

  useEffect(() => {
    getInfo();

    // generate trail code 
    // document.getElementById("heroSection").addEventListener("mousemove", (e) => generateTrail(e));
    // interval = setInterval(() => {
    //     updateTrails();
    // }, 20);
  });

  function getInfo() {
    GameService.getInfo("snake").then(data => {
      if (!data.message) {
        let scoresArray = (data.scores.sort((a, b) => (b.score - a.score))).slice(0, 10);
        setSnakePot(data.pot);
        setSnakeScore(scoresArray[0].score);
      } else {
        console.log("error");
      }
    });
    GameService.getInfo("tetris").then(data => {
      if (!data.message) {
        let scoresArray = (data.scores.sort((a, b) => (b.score - a.score))).slice(0, 10);
        setTetrisPot(data.pot);
        setTetrisScore(scoresArray[0].score);
      } else {
        console.log("error");
      }
    })
  }

  function getInfo() {
    GameService.getInfo("snake").then((data) => {
      if (!data.message) {
        let scoresArray = data.scores
          .sort((a, b) => b.score - a.score)
          .slice(0, 10);
        setSnakePot(data.pot);
        setSnakeScore(scoresArray[0].score);
      } else {
        console.log("error");
      }
    });
  }

  function generateTrail(e) {
    if (e) {
      const size = sizes[Math.floor(Math.random() * sizes.length)];
      const speedHorz = Math.random() * 10;
      const speedUp = Math.random() * 25;
      const spinVal = Math.random() * 360;
      const spinSpeed = Math.random() * 35 * (Math.random() <= 0.5 ? -1 : 1);
      const top = e.clientY - size / 2;
      const left = e.clientX - size / 2;
      const direction = Math.random() <= 0.5 ? -1 : 1;
      const bubble = document.createElement("img");
      bubble.setAttribute(
        "style",
        `width: ${size}px; height: ${size}px; position: fixed; top:${top}px; left:${left}px;`
      );
      bubble.setAttribute(
        "src",
        "https://s3-us-west-2.amazonaws.com/leafly-images/menu/KG9TPbeSCaNQK9ANDXcg_emeraldtriangle.png"
      );
      bubble.setAttribute("class", "bubble");
      document.getElementById("homeArea").appendChild(bubble);
      particles.push({
        element: bubble,
        size,
        speedHorz,
        speedUp,
        spinVal,
        spinSpeed,
        top,
        left,
        direction,
      });
    } else return;
  }

  function updateTrails() {
    particles.forEach((p) => {
      // update propeties
      p.left = p.left - p.speedHorz * p.direction;
      p.top = p.top - p.speedUp;
      p.speedUp = Math.min(p.size, p.speedUp - 1);
      p.spinVal = p.spinVal + p.spinSpeed;

      // check if particle has gone off screen
      if (p.top >= height + p.size) {
        particles = particles.filter((o) => o !== p);
        p.element.remove();
      }
      // enter properties
      // transition: position 0.3s;
      p.element.setAttribute(
        "style",
        `
                position: fixed;
                top: ${p.top}px;
                left: ${p.left}px;
                width: ${p.size}px;
                heigth: ${p.size}px;
            `
      );
    });
  }

  return (
    <div>
      <div id="homeArea">
        {/* Nav Bar */}
        <NavBar />
        <section id="heroSection">
          <div className="hero">
            <h1>
              <p
                class="typewrite"
                data-period="2000"
                data-type='[ "Hi, This is ETHER GAMES.", "Play Games, Win Prizes....Have Fun!"]'
              >
                <span class="wrap"></span>
              </p>
            </h1>
            {/* <div id="search-bar">
                        <h5>seach bar</h5>
                    </div> */}
          </div>
        </section>

        {/* Games */}
        <div className="game-container">
          <ul className="games">
            <div className="snake-border">
              <li id="snake-game" className="gameButton" onClick={() => history.push("/snake")}>
                <div>
                  SNAKE
                  <div className="snake-icon">
                    <img src={require("./snake.gif")} />
                  </div>
                  <div>
                    <h1>Jackpot: {parseFloat(snakePot.toFixed(6))} ETH</h1>
                    <p>High Score: {snakeScore}</p>
                  </div>
                </div>
              </li>
            </div>
            <div className="tetris-border">
              <li id="tetris-game" className="gameButton" onClick={() => history.push("/tetris")}>
                <div>
                  TETRIS
                  <div className="tetris-icon">
                    <img src={require("./snake.gif")} />
                  </div>
                  <div>
                    <h1>Jackpot: 13 ETH</h1>
                    <p>High Score: 21000</p>
                  </div>
                </div>
              </li>
            </div>
            <div className="asteroids-border">
              <li id="asteroids-game" className="gameButton">
                <div>
                  ASTEROIDS
                  <div className="asteroids-icon">
                    <img src={require("./snake.gif")} />
                  </div>
                  <div>
                    <h1>Jackpot: 0.002 ETH</h1>
                    <p>High Score: 200</p>
                  </div>
                </div>
              </li>
            </div>
            <div className="pacBoy-border">
              <li id="pacBoy-game" className="gameButton">
                <div>
                  PAC-BOY
                  <div className="pacBoy-icon">
                    <img src={require("./snake.gif")} />
                  </div>
                  <div>
                    <h1>Jackpot: 0.8 ETH</h1>
                    <p>High Score: 14000</p>
                  </div>
                </div>
              </li>
            </div>
          </ul>
        </div>
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
