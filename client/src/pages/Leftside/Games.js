import React, { useEffect, useState } from "react";
import "./games.css";

export default function GamesDiv() {
  return (
    <div id="gamesArea">
      <div id="gameTabs-container">
        <div  id="gamesTab">Games</div>
        <div id="transactionsTab">transactions</div>
      </div>
          <div id="games-container">
            <div id="snakeGame" className="games">
              <h1>Snake</h1>
            </div>
            <div id="tetrisGame" className="games">
              <h1>Tetris</h1>
            </div>
            <div id="asteroidsGame" className="games">
              <h1>Asteroids</h1>
            </div>
            <div id="pacboyGame" className="games">
              <h1>PacBoy</h1>
            </div>
      </div>
    </div>
  );
}
