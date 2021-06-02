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
  const [asteroidsPot, setAsteroidsPot] = useState(0);
  const [asteroidsScore, setAsteroidsScore] = useState(0);
  // const [panmanPot, setPacmanPot] = useState(0);
  // const [pacmanScore, setPacmanScore] = useState(0);

  useEffect(() => {
    getGameInfo();
  });

  function getGameInfo() {
    GameService.getInfo("snake").then((data) => {
      if (!data.message) {
        if (data.scores.length > 0) {
          let scoresArray = data.scores
            .sort((a, b) => b.score - a.score)
            .slice(0, 10);
          setSnakeScore(scoresArray[0].score);
        } else {
          setSnakeScore(100);
        }
        setSnakePot(data.pot);
      }
    });
    // GameService.getInfo("tetris").then((data) => {
    //   if (!data.message) {
    //     if (data.scores.length > 0) {
    //       let scoresArray = data.scores
    //         .sort((a, b) => b.score - a.score)
    //         .slice(0, 10);
    //       setTetrisScore(scoresArray[0].score);
    //     } else {
    //       setTetrisScore(100);
    //     }
    //     setTetrisPot(data.pot);
    //   }
    // });
    // GameService.getInfo("asteroids").then((data) => {
    //   if (!data.message) {
    //     if (data.scores.length > 0) {
    //       let scoresArray = data.scores
    //         .sort((a, b) => b.score - a.score)
    //         .slice(0, 10);
    //       setAsteroidsScore(scoresArray[0].score);
    //     } else {
    //       setAsteroidsScore(100);
    //     }
    //     setAsteroidsPot(data.pot);
    //   } else {
    //     console.log("error");
    //   }
    // });
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
                      <p>Play classic arcade games and win money!</p>
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
                    <img src={require("./snake.gif")} alt="snake game animation"/>
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
                    <img src={require("./tetris.gif")} alt="tetris game animation"/>
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
                    <img src={require("./asteroids.gif")} alt="ateroids game animation"/>
                  </div>
                  <div>
                    <h1>Jackpot: {parseFloat(asteroidsPot.toFixed(6))} ETH</h1>
                    <p>High Score: {asteroidsScore}</p>
                  </div>
                </div>
              </li>
            </div>
            {/* <div className="pacBoy-border">
              <li
                id="pacBoy-game"
                className="gameButton"
                onClick={() => history.push("/pacman")}
              >
                <div>
                  PAC-MAN
                  <div className="pacBoy-icon">
                    <img src={require("./pacBoy.gif")} alt="pacman game animation"/>
                  </div>
                  <div>
                    <h1>Jackpot: 0.8 ETH</h1>
                    <p>High Score: 14000</p>
                  </div>
                </div>
              </li>
            </div> */}
          </ul>
        </div>
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
