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
          <div id="inner-theGamesDiv">
            <div className="gameShadowDivTop"></div>
            <div className="background1" id="theGamesDiv-background1">
              <div className="background2" id="theGamesDiv-background2">
                <div className="background3" id="theGamesDiv-background3">
                  <div className="background4" id="theGamesDiv-background4">
                    <div className="background5" id="theGamesDiv-background5">
                      <GamesDiv />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="gameShadowDiv"></div>
        </div>
        <div id="theUserInfoDiv">
          <div id="inner-theUserInfoDiv">
            <div className="userInfoShadowDivTop"></div>
            <div className="background1" id="userInfo-background1">
              <div className="background2" id="userInfo-background2">
                <div className="background3" id="userInfo-background3">
                  <div className="background4" id="userInfo-background4">
                    <div className="background5" id="userInfo-background5">
                      <UserInfoDiv />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="userInfoShadowDiv"></div>
        </div>
      </div>
      <div id="rightsideDiv">
        <div id="CurrentGameDiv">
          <div id="inner-CurrentGameDiv">
            <div className="currentGameShadowDivTop"></div>
            <div className="background1" id="currentGame-background1">
              <div className="background2" id="currentGame-background2">
                <div className="background3" id="currentGame-background3">
                  <div className="background4" id="currentGame-background4">
                    <div className="background5" id="currentGame-background5">
                      <CurrentGameDiv />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="currentGameShadowDiv"></div>
        </div>
        <div id="GameControlsDiv">
          <div id="inner-GameControlsDiv">
          <div className="gameControlsShadowDivTop"></div>
            <div className="background1" id="gameControls-background1">
              {/* <div className="background2" id="gameControls-background2">
                <div className="background3" id="gameControls-background3">
                  <div className="background4" id="gameControls-background4">
                    <div className="background5" id="gameControls-background5"> */}
                      <GameControls />
                    {/* </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          <div className="gameControlsShadowDiv"></div>
        </div>
      </div>
    </div>
  );
}
