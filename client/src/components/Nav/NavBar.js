import React, { useContext, useState, useEffect } from "react";
import history from "../../history";
import AuthService from "../../services/AuthService";
import TxHistoryService from "../../services/TxHistoryService";
import { AuthContext } from "../../context/AuthContext";
import "./navBarStyle.css";
var Web3 = require("web3");
var web3 = new Web3(Web3.givenProvider);
web3.eth.defaultChain = 'rinkeby';



export default function NavBar(props) {
    const [address, setAddress] = useState("");
    const [balance, setBalance] = useState(0);
    const [colorStyle, setColorStyle] = useState({ borderColor: "rgb(72, 254, 12)", color: "rgb(72, 254, 12)" });

    // var account = web3.eth.accounts[0];
    // var accountInterval = setInterval(function() {
    //   if (web3.eth.accounts[0] !== account) {
    //     account = web3.eth.accounts[0];
    //     updateInterface();
    //   }
    // }, 100);

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
        if (window.ethereum.selectedAddress) {
            setAddress(window.ethereum.selectedAddress);
            getBalance(window.ethereum.selectedAddress);
        }
    }, []);

    async function requestAccount() {
        window.ethereum.request({ method: 'eth_requestAccounts' }).then((accounts) => {
            // sendTx();
            console.log(accounts[0]);
            setAddress(accounts[0]);
        })
    }

    async function getBalance(address) {

        try {
            // get blockchain data
            console.log("address" + address.toUpperCase());
            let newBalance = 0;
            await TxHistoryService.getBlockTx("0x5da2958A3f525A9093f1CC5e132DAe8522cc997c").then((blockData) => {
                if (blockData) {
                    for (var i = 0; i < blockData.result.length; i++) {
                        if (blockData.result[i].from.toUpperCase() === address.toUpperCase()) {
                            newBalance += blockData.result[i].value / 1000000000000000000;
                        }
                    }
                }
            });
            setBalance(newBalance);
        } catch (err) {
            console.log(err);
        }
    }

    async function sendTx() {
        const transactionParameters = {
            nonce: '0x00', // ignored by MetaMask
            to: '0x5da2958A3f525A9093f1CC5e132DAe8522cc997c', // Required except during contract publications.
            from: window.ethereum.selectedAddress, // must match user's active address.
            value: web3.utils.toHex('1000000000000000000') // Only required to send ether to the recipient from the initiating external account.
        };

        const txHash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        });

        console.log(txHash);
    }

    return (
        <>
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
                    <div className="inline" style={address ? {"display" : "initial"} : {"display": "none"}}>
                        <div className="navButton" style={colorStyle} onClick={() => sendTx()}>Buy Tokens</div>
                    </div>
                </div>
            </nav>
        </>
    );

    // const unauthenticatedNavBar = () => {
    //     return (
    //         <>
    //             <nav id="nav">
    //                 <h1 id="logoMain" style={colorStyle}  onClick={() => history.push("/")}>ethergames.io</h1>
    //                 <div className="nav-links">
    //                     <div className="inline">
    //                         <div className="navButton" style={colorStyle}  onClick={() => history.push("/")}>Arcade</div>
    //                     </div>
    //                     <div className="inline">
    //                         <div className="navButton" style={colorStyle}  onClick={() => history.push("/login")}>Log In</div>
    //                     </div>
    //                 </div>
    //             </nav>
    //         </>
    //     )
    // }

    // const authenticatedNavBar = () => {
    //     if (props.page === "account") {
    //         return (
    //             <>
    //                 <nav id="nav">
    //                     <h1 id="logoMain" style={colorStyle}  onClick={() => history.push("/")}>ethergames.io</h1>
    //                     <div className="nav-links">
    //                         <div className="inline">
    //                             <div className="navButton" style={colorStyle}  onClick={() => history.push("/")}>Arcade</div>
    //                         </div>
    //                         <div className="inline">
    //                             <div className="navButton" style={colorStyle}  onClick={() => onClickLogoutHandler()}>Log Out</div>
    //                         </div>
    //                     </div>
    //                 </nav>
    //             </>
    //         )
    //     } else {
    //         return (
    //             <>
    //                 <nav id="nav">
    //                     <h1 id="logoMain" style={colorStyle} onClick={() => history.push("/")}>ethergames.io</h1>
    //                     <div className="nav-links">
    //                         <div className="inline">
    //                             <div className="navButton" style={colorStyle} onClick={() => history.push("/")}>Arcade</div>
    //                         </div>
    //                         <div className="inline">
    //                             <div className="navButton" style={colorStyle} onClick={() => history.push("/account")}>Account</div>
    //                         </div>
    //                         {/* <label className="switch">
    //                             <input type="checkbox" checked={staked} onClick={() => setStaked(!staked)} />
    //                             <span className="slider round"></span>
    //                             <div className="sliderTitle">{staked ? "paid" : "free"}</div>
    //                         </label> */}
    //                     </div>
    //                 </nav>
    //             </>
    //         )
    //     }
    // }

    // return (
    //     <>
    //         {!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
    //     </>
    // )
}
