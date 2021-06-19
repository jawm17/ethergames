import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./userInfo.css";
import history from "../../history";
import axios from "axios";
var Web3 = require("web3");
var web3 = new Web3(Web3.givenProvider);
web3.eth.defaultChain = 'rinkeby';

export default function UserInfoDiv() {
  const { address, setAddress, balance, setBalance } = useContext(AuthContext);
  const centralAddress = "0x5da2958A3f525A9093f1CC5e132DAe8522cc997c";
  var accountInterval;

  useEffect(() => {
    if (window.ethereum.selectedAddress) {
      setAddress(window.ethereum.selectedAddress);
      getBalance(window.ethereum.selectedAddress);
      if (isNaN(accountInterval)) {
        monitorConnection();
      }
    }
  }, [window.ethereum.selectedAddress]);

  async function createAccount(address) {
    try {
      await axios.post("/user/register", { "address": address });
      setAddress(address);
      getBalance(address);
    } catch (err) {
      console.log(err);
    }
  }

  function monitorConnection() {
    accountInterval = setInterval(function () {
      if (!window.ethereum.selectedAddress) {
        setAddress("");
        clearInterval(accountInterval);
      }
    }, 100);
  }

  async function requestAccount() {
    window.ethereum.request({ method: 'eth_requestAccounts' }).then((accounts) => {
      createAccount(accounts[0]);
    })
  }

  async function getBalance(address) {
    try {
      // get user info from db
      const res = await axios.post("/user/info", { "address": address });
      let { balance } = res.data.document;
      // set user's balance on display
      setBalance(Math.floor(balance / 0.0001));
    } catch (err) {
      console.log(err);
    }
  }

  async function sendTx() {
    const transactionParameters = {
      nonce: '0x00',
      to: centralAddress, // ether games central address
      from: window.ethereum.selectedAddress, // user's address
      value: web3.utils.toHex('1000000000000000') // 0.001 ETH = 10 plays
    };
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
    });
    console.log(txHash);

    // updates display balance automatically
    // setInterval(function () {
    //     if (window.ethereum.selectedAddress) {
    //         getBalance(window.ethereum.selectedAddress);
    //     }
    // }, 10000);
  }

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
                <button onClick={() => sendTx()}>Buy Tokens</button>
              </div>
              <div className="userInfoShadowBtn"></div>
            </div>
          </div>
          <div className="buttonContainer" id="bottomButtonContainer">
            <div className="buttonOuterContainer">
              <div className="buttonInnerContainer">
                <button onClick={() => requestAccount()}>Connect Wallet</button>
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
                    {address ?
                      <div>
                        <div className="userInfoEl">
                          Address: {address.slice(0, 6)}...{address.slice(address.length - 8, address.length)}
                        </div>
                        <div className="userInfoEl">
                          Balance: {balance} token{balance > 1 || balance === 0 ? "s" : ""}
                        </div>
                      </div>
                      :
                      <div>Connect Wallet to Play</div>
                    }
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
