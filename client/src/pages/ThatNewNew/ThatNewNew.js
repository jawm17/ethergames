import React, { useEffect, useState } from "react";
import GamesDiv from "../Leftside/Games";
import UserInfoDiv from "../Leftside/UserInfo";
import CurrentGameDiv from "../Rightside/CurrentGame";
import GameControls from "../Rightside/GameControls";
import "./ThatNewNew.css";

export default function ThatNewNew() {
  return (
    <div id="ThatNewNewPage">
      <div id="leftsideDiv">
        <div id="theGamesDiv">
          <GamesDiv/>
          <div className="gameShadowDiv"></div>
        </div>
        <div id="theUserInfoDiv">
          <UserInfoDiv />
          <div className="userInfoShadowDiv"></div>
        </div>
      </div>
      <div id="rightsideDiv">
        <div id="CurrentGameDiv-GameControlsDiv">
          <div id="CurrentGameDiv">
            <div className="currentGameShadowDivTop"></div>
            <CurrentGameDiv />
          </div>
          <div id="GameControlsDiv">
            <GameControls />
            <div className="gameControlsShadowDiv"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
