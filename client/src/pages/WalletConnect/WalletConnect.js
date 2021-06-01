import React, { useState, useEffect } from "react";
import "./walletConnectStyle.css";
var Web3 = require("web3");
var web3 = new Web3(Web3.givenProvider);
web3.eth.defaultChain = 'rinkeby';

export default function WalletConnect() {
    const [address, setAddress] = useState("");
    const [plays, setPlays] = useState(0);

    useEffect(() => {
        if(window.ethereum.selectedAddress) {
            setAddress(window.ethereum.selectedAddress);
        }
    }, []);

    async function requestAccount() {
        window.ethereum.request({ method: 'eth_requestAccounts' }).then((accounts) => {
            // sendTx();
            console.log(accounts[0]);
            setAddress(accounts[0]);
        })
    }

    async function sendTx() {
        const transactionParameters = {
            nonce: '0x00', // ignored by MetaMask
            to: '0x5da2958A3f525A9093f1CC5e132DAe8522cc997c', // Required except during contract publications.
            from: window.ethereum.selectedAddress, // must match user's active address.
            value: '100000000000000', // Only required to send ether to the recipient from the initiating external account.
        };

        // txHash is a hex string
        // As with any RPC call, it may throw an error
        const txHash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        });
    }

    return (
        <div>
            <div id="arcadeArea">
                <div id="sidebar">
                    <div id="plays">
                        plays: {plays}
                    </div>
                    <div id="connectAccount" className="hoverable" onClick={() => requestAccount()}>
                        {address ? address.slice(0, 9) + "..." : "Connect Wallet"}
                    </div>
                    <div id="insertCoins" className="hoverable" onClick={() => sendTx()}>
                        insert coins
                    </div>
                </div>
                <div id="gameScreen">

                </div>
            </div>
        </div>
    );
}