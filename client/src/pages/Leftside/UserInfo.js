import React, { useEffect, useState } from "react";
import "./userInfo.css";
import WalletDropdown from "./WalletDropdown";
export default function UserInfoDiv() {
  return (
    <div id="inner-theUserInfoDiv">
    <div className="userInfoShadowDivTop"></div>
    <div className="background1" id="userInfo-background1">
      <div id="theUserInfoDiv-buttonContainer">
        <div className="buttonContainer" id="topButtonContainer">
          <div
            id="buttontTopOuterContainer"
            className="buttonOuterContainer"
          >
            <div className="buttonInnerContainer">
              <button>View History</button>
            </div>
            <div className="userInfoShadowBtn"></div>
          </div>
          <div
            id="buttontTopOuterContainer"
            className="buttonOuterContainer"
          >
            <div className="buttonInnerContainer">
              <button>Buy Tokens</button>
            </div>
            <div className="userInfoShadowBtn"></div>
          </div>
        </div>
        <div className="buttonContainer" id="bottomButtonContainer">
          <div className="buttonOuterContainer">
            <div className="buttonInnerContainer">
              <button>Connect Wallet</button>
            </div>
          </div>
          <div className="userInfoShadowBtn"></div>
        </div>
      </div>
      <div className="background2" id="userInfo-background2">
        <div className="background3" id="userInfo-background3">
          <div className="background4" id="userInfo-background4">
            <div className="background5" id="userInfo-background5">
              <div id="userInfoArea">
                <div id="userInfo-container">
                  <div id="coinSlot-container">
                  <div id="coinSlot-innercontainer">
                      <div id="coinSlot"></div>
                      <div id="coinSlotWords-container">
                        <div className="coinSlotLines"></div>
                        <div className="coinSlotLines"></div>
                        <div className="coinSlotWords">
                        <h1>INSERT</h1>
                        <h1>TOKEN</h1>
                        </div>
                        <div className="coinSlotLines"></div>
                        <div className="coinSlotLines"></div>
                        <div className="coinSlotWords">
                        <h1>TO</h1>
                        <h1>PLAY</h1>
                      </div>
                      </div>
                      </div>
                  </div>
                  <div id="tokenBalence-container">
                  <h1>Token Balence</h1>
                  <p>25</p>
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
