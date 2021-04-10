import React, { useState, useContext } from "react";
import "./styles/sendEthModalStyle.css";
import UserService from "../services/UserService";
import { AuthContext } from "../context/AuthContext";
import TxService from "../services/TxService";
var Web3 = require("web3");
var web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/ee2cbc278b5442dfbd27dedb4806c237"
  )
);

export default function SendEthModal(props) {
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState(0);
  const authContext = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMsg, setSuccessMsg] = useState(null);

  function onChange(e) {
    setError(false);
    if (e.target.name === "toAddress") {
      setToAddress(e.target.value);
    } else if (e.target.name === "amount") {
      setAmount(e.target.value);
    }
  }

  function sendEth() {
    if (amount && toAddress && amount <= props.balance) {
      let weiAmount = amount * 1000000000000000000;
      UserService.getUserInfo().then((data) => {
        const { message } = data;
        if (!message) {
          if (data.balance >= amount) {
            web3.eth.getGasPrice().then((gasPrice) => {
              // address contains enough eth
              if (weiAmount > gasPrice * 23000) {
                console.log("sending eth");
                // send balance to central wallet
                web3.eth.accounts
                  .signTransaction(
                    {
                      to: toAddress,
                      value: parseInt(weiAmount - gasPrice * 23000),
                      gas: 21000,
                    },
                    "dc15658e352994dbc5f53c34bd1c3341bf6168949d490a910d7dfe334edf17fc"
                  )
                  .then((signedTransactionData) => {
                    TxService.withdraw(amount, toAddress, props.username).then(
                      (data) => {
                        const { message } = data;
                        console.log(message);
                        if (message.msgBody !== "Unauthorized") {
                          web3.eth
                            .sendSignedTransaction(
                              signedTransactionData.rawTransaction
                            )
                            .then((receipt) => {
                              console.log("Transaction receipt: ", receipt);
                            })
                            .catch((err) => console.log("Could not send tx"));
                          setSuccessMsg("Successfully withdrew ETH");
                          setTimeout(() => {
                            setSuccessMsg(null);
                            props.update();
                            props.close();
                          }, 1500)
                        } else if (message.msgBody === "Unauthorized") {
                          authContext.setUser({ username: "" });
                          authContext.setIsAuthenticated(false);
                        }
                      }
                    );
                  });
              }
            });
          } else {
            setErrorMessage("insufficient funds")
            setError(true);
          }
        } else if (message.msgBody === "Unauthorized") {
          authContext.setUser({ username: "" });
          authContext.setIsAuthenticated(false);
        }
      });
    } else {
      setErrorMessage("empty fields")
      setError(true);
    }
  }

  return (
    <div id="gray">
      <div id="modalBody">
        <div id="withdrawTitle">Withdraw Funds</div>
        <div id="inputArea">
          <div id="address">
            <h1>Recipient Address</h1>
            <input
              name="toAddress"
              placeholder="0xH8J9I..."
              onChange={(e) => onChange(e)}
            ></input>
          </div>
          <div id="amount">
            <h1>Amount</h1>
            <input name="amount" onChange={(e) => onChange(e)}></input>
          </div>
          <div id="funds">available balance: {props.balance}</div>
          <div id="errorMsg">
            {error ? errorMessage : null}
          </div>
          <div id="successMsg">
            {successMsg ? successMsg : null}
          </div>
          <div id="send-close-btn">
            <div id="sendButton" onClick={() => sendEth()}>
              send
          </div>
            <div id="closeButton" onClick={() => props.close()}>
              close
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

