import React, { useEffect, useState } from "react";
import GameSwitcher from "./GameSwitcher";
import "./currentGame.css";

export default function CurrentGameDiv(props) {
  return (
    <div className="background1" id="currentGame-background1">
      <div className="background2" id="currentGame-background2">
        <div className="background3" id="currentGame-background3">
          <div className="background4" id="currentGame-background4">
            <div className="background5" id="currentGame-background5">
              <div id="currentGameArea">
                  <GameSwitcher game={props.game}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
