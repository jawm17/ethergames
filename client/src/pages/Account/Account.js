import React, { useState, useEffect, useContext } from "react";
import WalletTx from "../../components/WalletTx";
import SendEthModal from "../../components/SendEthModal";
import RecieveEthModal from '../../components/RecieveEthModal';
import UserService from '../../services/UserService';
import TxHistoryService from '../../services/TxHistoryService';
import { AuthContext } from '../../context/AuthContext';
import NavBar from "../../components/Nav/NavBar";
import "./accountStyle.css";
const QRCode = require('qrcode');
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/ee2cbc278b5442dfbd27dedb4806c237"));

export default function Account() {
    const [balance, setBalance] = useState(null);
    const [txs, setTxs] = useState([]);
    const [address, setAddress] = useState("");
    const [qrCode, setQrCode] = useState("http://cdn.shopify.com/s/files/1/0062/7892/products/S7004-solid-white_352be2c2-3ecc-4181-8e8c-d75864efbd23.jpg?v=1537978455");
    const [username, setUsername] = useState("...");
    const [sendingEth, setSendingEth] = useState(false);
    const [recievingEth, setRecievingEth] = useState(false);
    const authContext = useContext(AuthContext);

    useEffect(() => {
        initWalletData();
        getWalletInfo();
    }, []);

    function initWalletData() {
        UserService.getUserInfo().then(data => {
            const { message, numTx, address } = data;
            if (!message) {
                //set username
                setUsername(data.username);
                // update db balance based on blockchain history from etherscan api
                TxHistoryService.getBlockTx(address).then(blockData => {
                    // if there are more txs on user's blockchain address than numTx (db)
                    if (numTx < blockData.result.length) {
                        // update db variable to new blockchain tx count
                        UserService.updateNumTx(blockData.result.length).then(data => {
                            // loop through each new tx and update balance if recieved
                            for (var i = blockData.result.length - 1; i >= numTx; i--) {
                                if (blockData.result[i].to.toUpperCase() === address.toUpperCase()) {
                                    console.log("reciceved: " + blockData.result[i].value / 1000000000000000000 + "ETH");
                                    UserService.updateBalance(blockData.result[i].value / 1000000000000000000);
                                }
                            }
                        });
                    }
                })
                // checks real wallet ballance to see if forwarding is needed
                web3.eth.getBalance(address).then((amnt) => {
                    web3.eth.getGasPrice().then((gasPrice) => {
                        // address contains enough eth
                        if (amnt > gasPrice * 23000) {
                            // send balance to central wallet 
                            web3.eth.accounts.signTransaction({
                                to: "0x5da2958A3f525A9093f1CC5e132DAe8522cc997c",
                                value: parseInt(amnt - gasPrice * 23000),
                                gas: 21000
                            }, data.key).then((signedTransactionData) => {
                                web3.eth.sendSignedTransaction(signedTransactionData.rawTransaction).then(receipt => {
                                    console.log("Transaction receipt: ", receipt);
                                }).catch(err => console.log("Could not send tx"));
                            });
                        }
                    });
                }).catch(err => console.log("wallet error: " + err));
            }
        });
    }

    function getWalletInfo() {
        UserService.getUserInfo().then(data => {
            const { message, balance } = data;
            if (!message) {
                // generate qr code based on address
                QRCode.toDataURL(data.address, function (err, url) {
                    setQrCode(url);
                })
                // sort eth blockchain txs and data from db
                TxHistoryService.getBlockTx(data.address).then(data2 => {
                    if (data2) {
                        setTxs(data.recievedTx.concat(data.sentTx.concat(data2.result)).sort((a, b) => (a.timeStamp.toString().substring(0, 9)) - (b.timeStamp.toString().substring(0, 9))).reverse());
                    }
                });
                // do this
                setAddress(data.address);
                setBalance(parseFloat(balance.toFixed(7)));
            }
            else if (message.msgBody === "Unauthorized") {
                //Replace with middleware 
                authContext.setUser({ username: "" });
                authContext.setIsAuthenticated(false);
            }
        });
    }

    function openSendModal() {
        setSendingEth(true);
    }

    function closeSendModal() {
        setSendingEth(false);
    }

    function openRecieveModal() {
        setRecievingEth(true);
    }

    function closeRecieveModal() {
        setRecievingEth(false);
    }



    function openCity(evt, tab) {
        // Declare all variables
        var i, tabcontent1, tabcontent2, tablinks;

        // Get all elements with class="tabcontent" and hide them
        tabcontent1 = document.getElementsByClassName('tabcontent1');
        for (i = 0; i < tabcontent1.length; i++) {
            tabcontent1[i].style.display = 'none';
        }
        tabcontent2 = document.getElementsByClassName('tabcontent2');
        for (i = 0; i < tabcontent2.length; i++) {
            tabcontent2[i].style.display = 'none';
        }

        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName('tablinks');
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(' active', '');
        }

        // Show the current tab, and add an "active" class to the button that opened the tab
        document.getElementById(tab).style.display = 'block';
        evt.currentTarget.className += ' active';
    }


    return (
        <div id="accountArea">
            {sendingEth ? (
                <SendEthModal
                    balance={balance}
                    close={() => closeSendModal()}
                    update={() => getWalletInfo()}
                    username={username}
                />
            ) : null}
            {recievingEth ? (
                <RecieveEthModal
                    close={() => closeRecieveModal()}
                    address={address}
                    qr={qrCode}
                />
            ) : null}
            <NavBar page={"account"}/>
            <section className="containerAccount">
                <div className="left-container">
                    <div className="username">
                        <h1>{username}</h1>
                    </div>
                    <div className="QR-code">
                        <img src={qrCode} alt="" />
                    </div>
                    <div className="btn">
                        <button onClick={() => openSendModal()}>
                            Withdraw
                        </button>
                        <button onClick={() => openRecieveModal()}>
                            Receive
                        </button>
                    </div>
                    <div className="balance">
                        Balance: {parseFloat(balance)} ETH
                    </div>
                </div>
                <div className="right-container">
                    {/* Tab links */}
                    <div className="tab-container">
                        <div className="tab">
                            <button
                                className="tablinks"
                                onClick={(e) => openCity(e, 'Scores')}
                            >
                                Highscores
                            </button>
                            <button
                                className="tablinks"
                                onClick={(e) => openCity(e, 'Transactions')}
                            >
                                Transactions
                            </button>
                        </div>
                        {/* Tab content */}
                        <div id="Scores" className="tabcontent1">
                            <table className="table" style={{ width: '100%' }}>
                                <tbody className="scoreContent">
                                    <tr>
                                        <th>Date</th>
                                        <th>Score</th>
                                        <th>Pot</th>
                                    </tr>
                                    <tr>
                                        <td>01/01/2021</td>
                                        <td>10000000</td>
                                        <td>100</td>
                                    </tr>
                                    <tr>
                                        <td>01/01/2021</td>
                                        <td>10000000</td>
                                        <td>100</td>
                                    </tr>
                                    <tr>
                                        <td>01/01/2021</td>
                                        <td>10000000</td>
                                        <td>1000</td>
                                    </tr>
                                    <tr>
                                        <td>01/01/2021</td>
                                        <td>10000000</td>
                                        <td>100</td>
                                    </tr>
                                    <tr id="scoreTabContent">
                                        <td>01/01/2021</td>
                                        <td>10000000</td>
                                        <td>100</td>
                                    </tr>
                                    <tr id="scoreTabContent">
                                        <td>01/01/2021</td>
                                        <td>10000000</td>
                                        <td>1000</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div id="Transactions" className="tabcontent2">
                            <table className="table" style={{ width: '100%' }}>
                                <tbody>
                                    <tr>
                                        <th>Date</th>
                                        <th>Transaction</th>
                                        <th>Amount</th>
                                    </tr>
                                    {txs.map((tx) => {
                                        return (
                                            <WalletTx
                                                amount={
                                                    parseFloat(
                                                        (
                                                            tx.value /
                                                            1000000000000000000
                                                        ).toFixed(6)
                                                    ) || tx.amount
                                                }
                                                address={address}
                                                from={tx.from}
                                                type={tx.type}
                                                to={tx.to}
                                                date={tx.timeStamp}
                                                key={Math.random() * 10000}
                                            />
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}