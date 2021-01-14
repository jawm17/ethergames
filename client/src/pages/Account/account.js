import React, {useState, useEffect, useContext} from "react";
import UserService from '../../services/UserService';
import { AuthContext } from '../../context/AuthContext';
import history from "../../history";
import "./accountStyle.css";
const QRCode = require('qrcode');

export default function Account() {
    const [qrCode, setQrCode] = useState("");
    const authContext = useContext(AuthContext);

    useEffect(() => {
        getWalletInfo();
    });

    function getWalletInfo() {
        UserService.getUserInfo().then(data => {
            const { message } = data;
            if (!message) {
                // generate qr code based on address
                QRCode.toDataURL(data.address, function (err, url) {
                    setQrCode(url);
                })
            }
            else if (message.msgBody === "Unauthorized") {
                //Replace with middleware 
                authContext.setUser({ username: "" });
                authContext.setIsAuthenticated(false);
            }
        });
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
            <header>
                <nav id="navAccount">
                    <h1 id="accountLogo" onClick={() => history.push("/")}>Crypto Arcade</h1>
                </nav>
            </header>
            <section className="containerAccount">
                <div className="left-container">
                    <div className="username">
                        <h1>Username</h1>
                    </div>
                    <div className="QR-code">
                        <img src={qrCode} alt="" />
                    </div>
                    <div className="btn">
                        <button>Send</button>
                        <button>Receive</button>
                    </div>
                </div>
                <div className="right-container">
                    {/* Tab links */}
                    <div className="tab-container">
                        <div className="tab">
                            <button className="tablinks" onClick={(e) => openCity(e, 'Scores')}>
                                Scores
                </button>
                            <button className="tablinks" onClick={(e) => openCity(e, 'Transactions')}>
                                Transactions
                </button>
                        </div>
                        {/* Tab content */}
                        <div id="Scores" className="tabcontent1">
                            <table className="table" style={{ width: '100%' }}>
                                <tbody><tr>
                                    <th>Date</th>
                                    <th>Score</th>
                                    <th>Pot</th>
                                    <th>Time Left</th>
                                </tr>
                                    <tr>
                                        <td>01/01/2021</td>
                                        <td>10000000</td>
                                        <td>100</td>
                                        <td>1hour</td>
                                    </tr>
                                    <tr>
                                        <td>01/01/2021</td>
                                        <td>10000000</td>
                                        <td>100</td>
                                        <td>1hour</td>
                                    </tr>
                                    <tr>
                                        <td>01/01/2021</td>
                                        <td>10000000</td>
                                        <td>1000</td>
                                        <td>1hour</td>
                                    </tr>
                                    <tr>
                                        <td>01/01/2021</td>
                                        <td>10000000</td>
                                        <td>100</td>
                                        <td>1hour</td>
                                    </tr>
                                    <tr>
                                        <td>01/01/2021</td>
                                        <td>10000000</td>
                                        <td>100</td>
                                        <td>1hour</td>
                                    </tr>
                                    <tr>
                                        <td>01/01/2021</td>
                                        <td>10000000</td>
                                        <td>1000</td>
                                        <td>1hour</td>
                                    </tr>
                                </tbody></table>
                        </div>
                        <div id="Transactions" className="tabcontent2">
                            <table className="table" style={{ width: '100%' }}>
                                <tbody><tr>
                                    <th>Date</th>
                                    <th>Transaction</th>
                                    <th>Balance</th>
                                </tr>
                                    <tr>
                                        <td>01/01/2021</td>
                                        <td>won pot = 100ether</td>
                                        <td>100</td>
                                    </tr>
                                    <tr>
                                        <td>01/01/2021</td>
                                        <td>won pot = 100ether</td>
                                        <td>100</td>
                                    </tr>
                                    <tr>
                                        <td>01/01/2021</td>
                                        <td>won pot = 100ether</td>
                                        <td>1000</td>
                                    </tr>
                                </tbody></table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}