import React from "react";
import NavBar from "../../Components/Nav/NavBar";

export default function Home() {

    return (
        <div>
            {/* Nav Bar */}
            <header>
                <NavBar/>
                {/* Hero */}
                <section>
                    <div className="hero">
                        <div id="header">
                            <h1>Crypto Arcade</h1>
                        </div>
                        <div id="slogen">
                            <h4>Play and win with the old games you know and love.</h4>
                        </div>
                        {/* <div id="search-bar">
                        <h5>seach bar</h5>
                    </div> */}
                    </div>
                </section>
            </header>
            {/* Games */}
            <div className="game-container">
                <ul className="games">
                    <li>
                        <a href>game 1
                <div className="icon">
                                <img src="https://neave.com/assets/images/home/zoom-earth.jpg" alt="" />
                            </div>
                            <div>
                                <h1>text</h1>
                                <p>fadsfdfa</p>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href>game 2
                <div className="icon">
                                <img src="https://neave.com/assets/images/home/zoom-earth.jpg" alt="" />
                            </div>
                            <div>
                                <h1>text</h1>
                                <p>fadsfdfa</p>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href>game 3
                <div className="icon">
                                <img src="https://neave.com/assets/images/home/zoom-earth.jpg" alt="" />
                            </div>
                            <div>
                                <h1>text</h1>
                                <p>fadsfdfa</p>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href>game 4
                <div className="icon">
                                <img src="https://neave.com/assets/images/home/zoom-earth.jpg" alt="" />
                            </div>
                            <div>
                                <h1>text</h1>
                                <p>fadsfdfa</p>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href>game 5
                <div className="icon">
                                <img src="https://neave.com/assets/images/home/zoom-earth.jpg" alt="" />
                            </div>
                            <div>
                                <h1>text</h1>
                                <p>fadsfdfa</p>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href>game 5
                <div className="icon">
                                <img src="https://neave.com/assets/images/home/zoom-earth.jpg" alt="" />
                            </div>
                            <div>
                                <h1>text</h1>
                                <p>fadsfdfa</p>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href>game 5
                <div className="icon">
                                <img src="https://neave.com/assets/images/home/zoom-earth.jpg" alt="" />
                            </div>
                            <div>
                                <h1>text</h1>
                                <p>fadsfdfa</p>
                            </div>
                        </a>
                    </li>
                    <li>
                        <a href>game 5
                <div className="icon">
                                <img src="https://neave.com/assets/images/home/zoom-earth.jpg" alt="" />
                            </div>
                            <div>
                                <h1>text</h1>
                                <p>fadsfdfa</p>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
            {/* Footer */}
            <footer />
        </div>
    );
}