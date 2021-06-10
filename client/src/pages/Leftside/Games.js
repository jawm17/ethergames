import React, { useEffect, useState } from "react";
import "./games.css";

export default function GamesDiv() {
  return (
    <div id="inner-theGamesDiv">
      <div className="gameShadowDivTop"></div>
      <div className="background1" id="theGamesDiv-background1">
        <div className="background2" id="theGamesDiv-background2">
          <div className="background3" id="theGamesDiv-background3">
            <div className="background4" id="theGamesDiv-background4">
              <div className="background5" id="theGamesDiv-background5">
                <div id="gamesArea">
                  <div id="gameTabs-container"></div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
