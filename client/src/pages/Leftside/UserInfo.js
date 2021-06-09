import React, { useEffect, useState } from "react";
import "./userInfo.css";

export default function UserInfoDiv() {
  return (
    <div id="userInfoArea">
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
  );
}
