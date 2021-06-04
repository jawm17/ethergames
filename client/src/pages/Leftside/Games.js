import React, { useEffect, useState } from "react";
import "./games.css";

export default function GamesDiv() {
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
    <div  style={DisplayFlex} id="gamesArea">
      <div style={DisplayFlex} id="gamesOuter-container">
        <div style={DisplayFlex} id="gamesInner-container">
          <div style={DisplayFlex2} id="games-container">
            <div id="snakeGame" className="games">
              <h1>Snake</h1>
            </div>
            <div id="tetrisGame" className="games">
              <h1>Tetris</h1>
            </div>
            <div id="asteroidsGame" className="games">
              <h1>Asteroids gmae</h1>
            </div>
            <div id="pacboyGame" className="games">
              <h1>PacBoy</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
