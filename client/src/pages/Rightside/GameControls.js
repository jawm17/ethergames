import React, { useEffect, useState } from "react";
import NavBar from "../../components/Nav/NavBar";
import Footer from "../../components/Footer/Footer";
import "./gameControls.css";
import "../ThatNewNew/ThatNewNew.css";
export default function GameControls() {
  return (
    <div id="gameControlsArea">
      <div id="gameControls-container">
        <div id="playBtn-container">
            <button id="playBtn2">Play</button>
          </div>
        <div id="gameArrows">
          <div id="upArrow" className="controlIcons">
            <i className="fas fa-arrow-up"></i>
          </div>
          <div id="downArrow" className="controlIcons">
            <i className="fas fa-arrow-down"></i>
          </div>
          <div id="leftArrow" className="controlIcons">
            <i className="fas fa-arrow-left"></i>
          </div>
          <div id="rightArrow" className="controlIcons">
            <i className="fas fa-arrow-right"></i>
          </div>
        </div>
        </div>
      </div>
  );
}
