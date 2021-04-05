import React, { useEffect, useState } from "react";
import NavBar from "../../components/Nav/NavBar";
import Footer from "../../components/Footer/Footer";
import GameService from "../../services/GameService";
import history from "../../history";
import "./homeStyle.css";

export default function Home() {
  const [snakePot, setSnakePot] = useState(0);
  const [snakeScore, setSnakeScore] = useState(0);
  const [tetrisPot, setTetrisPot] = useState(0);
  const [tetrisScore, setTetrisScore] = useState(0);

  useEffect(() => {
    getGameInfo();
  });

  function getGameInfo() {
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
    GameService.getInfo("tetris").then((data) => {
      if (!data.message) {
        let scoresArray = data.scores
          .sort((a, b) => b.score - a.score)
          .slice(0, 10);
        setTetrisPot(data.pot);
        setTetrisScore(scoresArray[0].score);
      } else {
        console.log("error");
      }
    });
  }

  return (
    <div>
      <div id="homeArea">
        {/* Nav Bar */}
        <NavBar />
        <section id="heroSection">
          <div className="hero-back">
            <div className="hero-mid1">
              <div className="hero-mid2">
                <div className="hero-mid3">
                  <div className="hero-front">
                    <div className="heroLogo-container">
                      <div>
                      <div className="logoUnderline1"></div>
                        <h1 className="heroLogo1">Ether</h1>
                        <div className="logoUnderline1"></div>
                      </div>
                      <div>
                      <div className="logoUnderline2"></div>
                        <h1 className="heroLogo2">Games</h1>
                        <div className="logoUnderline2"></div>
                      </div>
                    </div>
                    <div className="slogan">
                      <p>Play the games you onced loved and win ETH!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Games */}
        <div className="game-container">
          <ul className="games">
            <div className="snake-border">
              <li
                id="snake-game"
                className="gameButton"
                onClick={() => history.push("/snake")}
              >
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
              <li
                id="tetris-game"
                className="gameButton"
                onClick={() => history.push("/tetris")}
              >
                <div>
                  TETRIS
                  <div className="tetris-icon">
                    <img src={require("./snake.gif")} />
                  </div>
                  <div>
                    <h1>Jackpot: {parseFloat(tetrisPot.toFixed(6))} ETH</h1>
                    <p>High Score: {tetrisScore}</p>
                  </div>
                </div>
              </li>
            </div>
            <div className="asteroids-border">
              <li
                id="asteroids-game"
                className="gameButton"
                onClick={() => history.push("/asteroids")}
              >
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
              <li
                id="pacBoy-game"
                className="gameButton"
                onClick={() => history.push("/pacman")}
              >
                <div>
                  PAC-MAN
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
