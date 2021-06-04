import React, { useEffect, useState } from "react";
import "./userInfo.css";

export default function UserInfoDiv() {
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
    <div style={DisplayFlex} id="userInfoArea">
      <div style={DisplayFlex} id="userInfo-container">
        <div style={DisplayFlex} id="userInfoInner-container">
          <div id="userInfo-container">
            <div id="userTokenBalence">
              <h1>Token Balence:</h1>
              <p>25 Tokens</p>
            </div>
            <div id="userAdress">
              <h1>Wallet Adress:</h1>
              <p>0x3f1dfc30adde5...dcca</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
