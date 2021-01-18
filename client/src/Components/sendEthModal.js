import React, { useState, useContext } from "react";
import "./sendEthModalStyle.css";
import UserService from '../services/UserService';
import { AuthContext } from '../context/AuthContext';
import TxService from "../services/TxService";
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/ee2cbc278b5442dfbd27dedb4806c237"));

export default function SendEthModal(props) {
    const [toAddress, setToAddress] = useState("");
    const [amount, setAmount] = useState(0);
    const authContext = useContext(AuthContext);

    function onChange(e) {
        if (e.target.name === "toAddress") {
            setToAddress(e.target.value)
        } else if (e.target.name === "amount") {
            setAmount(e.target.value);
        }
    }

    function sendEth() {
        if (amount && toAddress && amount <= props.balance) {
            let weiAmount = amount * 1000000000000000000;
            UserService.getUserInfo().then(data => {
                const { message } = data;
                if (!message) {
                    if (data.balance >= amount) {
                        web3.eth.getGasPrice().then((gasPrice) => {
                            // address contains enough eth
                            if (weiAmount > gasPrice * 23000) {
                                console.log("sending eth")
                                // send balance to central wallet 
                                web3.eth.accounts.signTransaction({
                                    to: toAddress,
                                    value: parseInt(weiAmount - gasPrice * 23000),
                                    gas: 21000
                                }, "0x3f1cff5b649ee66923cb9cffab0ac77d518d7d93f54f1197481916f71da0e3ea").then((signedTransactionData) => {
                                    TxService.withdraw((amount), toAddress, props.username).then(data => {
                                        const { message } = data;
                                        console.log(message);
                                        if (message.msgBody !== "Unauthorized") {
                                                props.update();
                                                props.close();
                                        } else if (message.msgBody === "Unauthorized") {
                                            authContext.setUser({ username: "" });
                                            authContext.setIsAuthenticated(false);
                                        }
                                    })
                                    web3.eth.sendSignedTransaction(signedTransactionData.rawTransaction).then(receipt => {
                                        console.log("Transaction receipt: ", receipt);
                                    }).catch(err => console.log("Could not send tx"));
                                });
                            }
                        });
                    } else {
                        console.log("insufficient funds");
                    }
                }
                else if (message.msgBody === "Unauthorized") {
                    authContext.setUser({ username: "" });
                    authContext.setIsAuthenticated(false);
                }
            });
        } else {
            console.log('inputs not entered')
            // setNotification("You must enter an address and amount");
            // setNotificationError(true);
            // timerID = setTimeout(() => {
            //     setNotification("");
            //     setNotificationError(false);
            // }, 1500)
        }
    }

    return (
        <div id="gray">
            <div id="modalBody">
                <div id="withdrawTitle">
                    Withdraw Funds
                </div>
                <div id="funds">
                    available balance: {props.balance}
                </div>
                <div id="inputArea">
                    <div>
                        recipient address: <input name="toAddress" placeholder="0xH8J9I..." onChange={(e) => onChange(e)}></input>
                    </div>
                    <div>
                        amount: <input name="amount" onChange={(e) => onChange(e)}></input>
                    </div>
                </div>
                <div id="sendButton" onClick={() => sendEth()}>
                    send
                </div>
                <div id="closeButton" onClick={() => props.close()}>
                    exit
                </div>
            </div>
        </div>
    );
}