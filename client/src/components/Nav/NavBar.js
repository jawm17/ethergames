import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import history from "../../history";
import axios from "axios";
import "./navBarStyle.css";
var Web3 = require("web3");
var web3 = new Web3(Web3.givenProvider);
web3.eth.defaultChain = 'rinkeby';

export default function NavBar(props) {
    const { address, setAddress, balance, setBalance } = useContext(AuthContext);
    // const [address, setAddress] = useState("");
    // const [balance, setBalance] = useState("");
    const [colorStyle, setColorStyle] = useState({ borderColor: "rgb(72, 254, 12)", color: "rgb(72, 254, 12)" });
    const centralAddress = "0x5da2958A3f525A9093f1CC5e132DAe8522cc997c";
    var accountInterval;

    const style = {
        tetrisColor: {
            borderColor: "yellow",
            color: "yellow"
        },
        snakeColor: {
            borderColor: "rgb(72, 254, 12)",
            color: "rgb(72, 254, 12)"
        },
        asteroidsColor: {
            borderColor: "gray",
            color: "lightgray"
        },
        pacmanColor: {
            borderColor: "blue",
            color: "lightblue"
        },
    }

    useEffect(() => {
        if (props.page === "snake") {
            setColorStyle(style.snakeColor);
        } else if (props.page === "tetris") {
            setColorStyle(style.tetrisColor)
        } else if (props.page === "asteroids") {
            setColorStyle(style.asteroidsColor)
        } else if (props.page === "pacman") {
            setColorStyle(style.pacmanColor)
        }
    }, []);

    useEffect(() => {
        if(window.ethereum.selectedAddress) {
            console.log("-------------------------------------------------------------------------")
            setAddress(window.ethereum.selectedAddress);
            getBalance(window.ethereum.selectedAddress);
            if (isNaN(accountInterval)) {
                monitorConnection();
            }
        } else {
            requestAccount();
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
            if (isNaN(accountInterval)) {
                monitorConnection();
            }
        })
    }

    async function getBalance(address) {
        try {
            // get user info from db
            const res = await axios.post("/user/info", { "address": address });
            let { numTx, balance } = res.data.document;
            // set user's balance on display
            setBalance(Math.floor(balance / 0.0001));

            // // get blockchain data from etherscan
            // const etherscanData = await axios.get(`https://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=8AAGX8PGJWQ9WDHYQ5N28SYKZ27ENKJ3VS`);
            // let blockData = etherscanData.data;

            // // check if new txs occurred 
            // if (blockData?.result.length > numTx) {
            //     let incomingBalance = 0;

            //     // update txCount in db
            //     await axios.post("/user/update-numTx", { "address": address, "numTx": blockData.result.length });

            //     // loop through new txs and record new ether
            //     for (var i = blockData.result.length - 1; i >= numTx; i--) {
            //         if (blockData.result[i].to.toUpperCase() === centralAddress.toUpperCase()) {
            //             incomingBalance += blockData.result[i].value / 1000000000000000000;
            //         }
            //     }

            //     // update db balance with new ether
            //     const res = await axios.post("/user/update-balance", { "address": address, "funds": incomingBalance });
            //     setBalance(Math.floor(res.data.balance / 0.0001));
            // }
        } catch (err) {
            console.log(err);
        }
    }

    async function sendTx() {
        const transactionParameters = {
            nonce: '0x00',
            to: '0x5da2958A3f525A9093f1CC5e132DAe8522cc997c', // ether games central address
            from: window.ethereum.selectedAddress, // user's address
            value: web3.utils.toHex('1000000000000000') // 0.001 ETH = 10 plays
        };
        const txHash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        });
        console.log(txHash);

        // updates display balance automatically
        setInterval(function () {
            if(window.ethereum.selectedAddress) {
                getBalance(window.ethereum.selectedAddress);
            }
        }, 10000);
    }

    return (
        <div>
            <nav id="nav">
                <h1 id="logoMain" style={colorStyle} onClick={() => history.push("/")}>ethergames.io</h1>
                <div className="nav-links">
                    <div className="inline">
                        <div className="navButton" style={colorStyle} onClick={() => history.push("/")}>Arcade</div>
                    </div>
                    <div className="inline">
                        <div className="connectWalletBtn" style={colorStyle} onClick={() => requestAccount()}>
                            {address ? address.slice(0, 13) + "..." : "Connect Wallet"}
                        </div>
                    </div>
                    <div className="inline" style={address ? { "display": "initial" } : { "display": "none" }}>
                        <div className="balanceDisplay" style={colorStyle}>
                            balance: {balance} token{balance > 1 || balance === 0 ? "s" : ""}
                        </div>
                    </div>
                    <div className="inline" style={address ? { "display": "initial" } : { "display": "none" }}>
                        <div className="navButton" style={colorStyle} onClick={() => sendTx()}>Buy 10 Tokens</div>
                    </div>
                </div>
            </nav>
        </div>
    );
}
