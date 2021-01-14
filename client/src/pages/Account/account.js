import React from "react";


export default function Account() {

    return (
        <div>
            <header>
                <nav id="navAccount">
                    <h1 id="logo"><a href="/">Crypto Arcade</a></h1>
                    <ul className="nav-links">
                        <li><a href="settings.html">Settings</a></li>
                    </ul>
                </nav>
            </header>
            <section className="containerAccount">
                <div className="left-container">
                    <div className="username">
                        <h1>Username</h1>
                    </div>
                    <div className="QR-code">
                        <img src="qr-code.png" alt="" />
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
                            <button className="tablinks" onclick="openCity(event, 'Scores')">
                                Scores
                </button>
                            <button className="tablinks" onclick="openCity(event, 'Transactions')">
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