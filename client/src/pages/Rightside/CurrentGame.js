import React, { useEffect, useState } from "react";
import NavBar from "../../components/Nav/NavBar";
import Footer from "../../components/Footer/Footer";
import "./currentGame.css";

export default function CurrentGameDiv() {
  return (
    <div id="currentGameArea">
      <div id="currentGame-container">
        <div id="currentGameInfo">
          <h1>ETHER GAMES</h1>
          {/* <div id="currentGameHighscore">
            <h4>High Score To Beat</h4>
            <p>20345</p>
          </div>
          <div id="currentGameJackpot">
            <h4>Jackpot</h4>
            <p>20 ETH</p>
          </div> */}
          <p>Play Game You Love and Win Money
          </p>
        </div>
      </div>
    </div>
  );
}
