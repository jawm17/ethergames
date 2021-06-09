import React, { useEffect, useState } from "react";
import NavBar from "../../components/Nav/NavBar";
import Footer from "../../components/Footer/Footer";
import "./currentGame.css";

export default function CurrentGameDiv() {
  const DisplayFlex = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const DisplayFlex2 = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  };
  return (
    <div style={DisplayFlex} id="currentGameArea">
      <div id="currentGame-bigContainer">
        <div style={DisplayFlex} id="currentGame">
          <div id="currentGameBackground1">
            <div id="currentGameBackground2">
              <div id="currentGameBackground3">
                <div id="currentGameBackground4">
                  <div id="currentGameBackground5">
                    <div style={DisplayFlex} id="currentGameInfo">
                      <h1>ETHER GAMES</h1>
                      <div id="currentGameHighscore">
                        <h4>High Score To Beat</h4>
                        <p>20345</p>
                      </div>
                      <div id="currentGameJackpot">
                        <h4>Jackpot</h4>
                        <p>20 ETH</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="gameControls-container">
          <div id="playBtn-container">
            <div id="innerPlayBtn-container">
              <button id="playBtn2">Play</button>
            </div>
            <div className="playBtn2ShadowDiv"></div>
          </div>
          <div id="gameArrows">
            <div className="button">

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
