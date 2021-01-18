import React, { useState } from "react";
import "./sendEthModalStyle.css";

export default function SendEthModal(props) {
    const [toAddress, setToAddress] = useState("");
    const [amount, setAmount] = useState(0);

    function onChange(e) {
        if(e.target.name === "toAddress") {
            setToAddress(e.target.value)
        } else if(e.target.name === "amount") {
            setAmount(e.target.value);
        }
    }

    function sendEth() {
        if(toAddress && amount > 0) {
            console.log("to: " + toAddress + " amount: " + amount);
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