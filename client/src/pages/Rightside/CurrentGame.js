import React, { useEffect, useState } from "react";
import NavBar from "../../components/Nav/NavBar";
import Footer from "../../components/Footer/Footer";
import "./currentGame.css";

export default function CurrentGameDiv() {
    const DisplayFlex = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      };
      const DisplayFlex2 = {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center"
      };
  return (
    <div style={DisplayFlex} id="currentGameArea">
      <div style={DisplayFlex} id="currentGame-bigContainer">
        <div style={DisplayFlex}id="currentGame">
          <div  style={DisplayFlex} id="currentGameInfo">
            <h1>Snake</h1>
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
        <div id="gameControls-container">
            <div id="playBtn-container"><button id="playBtn2">Play</button></div>
            <div id="gameArrows">
          <div id="upArrow" className="controlIcons"><i className="fas fa-arrow-up"></i></div>
          <div id="downArrow" className="controlIcons"><i className="fas fa-arrow-down"></i></div>
          <div id="leftArrow" className="controlIcons"><i className="fas fa-arrow-left"></i></div>
          <div id="rightArrow" className="controlIcons"><i className="fas fa-arrow-right"></i></div>
          </div>
        </div>
      </div>
    </div>
  );
}
