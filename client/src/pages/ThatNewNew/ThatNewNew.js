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
          <GamesDiv />
        </div>
        <div id="theUserInfoDiv">
          <UserInfoDiv />
        </div>
      </div>
      <div id="rightsideDiv">
      <div id="CurrentGameDiv">
        <CurrentGameDiv />
      </div>
      </div>
    </div>
  );
}
