import React, { useEffect, useState } from "react";
import HomeScreen from "../GameHomeScreens/HomeScreen";
import SnakeGameScreen from "../GameHomeScreens/SnakeGameScreen";
import PacboyScreen from "../GameHomeScreens/PacboyScreen";
import TetrisScreen from "../GameHomeScreens/TetrisScreen";
import AsteroidsScreen from "../GameHomeScreens/AsteroidsScreen";
import "./currentGame.css";

export default function CurrentGameDiv() {
  return (
    <div className="background1" id="currentGame-background1">
      <div className="background2" id="currentGame-background2">
        <div className="background3" id="currentGame-background3">
          <div className="background4" id="currentGame-background4">
            <div className="background5" id="currentGame-background5">
              <div id="currentGameArea">
                <div id="currentGame-container">
                    {/* <HomeScreen/> */}
                    <SnakeGameScreen/>
                    {/* <TetrisScreen/> */}
                    {/* <AsteroidsScreen/> */}
                    {/* <PacboyScreen/> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
