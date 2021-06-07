import React, { useEffect, useState } from "react";
import GamesDiv from "../Leftside/Games";
import UserInfoDiv from "../Leftside/UserInfo";
import CurrentGameDiv from "../Rightside/CurrentGame";
import "./ThatNewNew.css";

export default function ThatNewNew() {
  return (
    <div id="ThatNewNewPage">
      <div id="leftsideDiv">
        <div id="theGamesDiv">
          <div id="inner-theGamesDiv">
            <div className="gameShadowDivTop"></div>
            <div id="theGamesDiv-background1">
              <div id="theGamesDiv-background2">
                <div id="theGamesDiv-background3">
                  <div id="theGamesDiv-background4">
                    <div id="theGamesDiv-background5">
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
            <div id="userInfo-background1">
              <div id="userInfo-background2">
                <div id="userInfo-background3">
                  <div id="userInfo-background4">
                    <div id="userInfo-background5">
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
            <CurrentGameDiv />
          </div>
          <div className="currentGameShadowDiv"></div>
        </div>
      </div>
    </div>
  );
}
