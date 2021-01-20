import React, {useEffect, useRef, useState} from "react";
import NavBar from "../../components/Nav/NavBar";
import history from "../../history";
import "./homeStyle.css";

export default function Home() {
    const [height, setHeight] = useState(document.documentElement.clientHeight);

    let particles = [];
    const sizes = [15, 20, 25, 35, 45];
    let interval = useRef(null);

    useEffect(() => {
        document.getElementById("heroSection").addEventListener("mousemove", (e) => generateTrail(e));
        interval = setInterval(() => {
            updateTrails();
        }, 20);
    });

    function generateTrail(e) {
        if (e) {
            const size = sizes[Math.floor(Math.random() * sizes.length)];
            const speedHorz = Math.random() * 10;
            const speedUp = Math.random() * 25;
            const spinVal = Math.random() * 360;
            const spinSpeed = ((Math.random() * 35)) * (Math.random() <= .5 ? -1 : 1);
            const top = (e.clientY - size / 2);
            const left = (e.clientX - size / 2);
            const direction = Math.random() <= .5 ? -1 : 1;
            const bubble = document.createElement("img");
            bubble.setAttribute("style", `width: ${size}px; height: ${size}px; position: fixed; top:${top}px; left:${left}px;`);
            bubble.setAttribute("src", "https://s3-us-west-2.amazonaws.com/leafly-images/menu/KG9TPbeSCaNQK9ANDXcg_emeraldtriangle.png");
            bubble.setAttribute("class", "bubble");
            document.getElementById("homeArea").appendChild(bubble);
            particles.push(
                {
                    element: bubble,
                    size,
                    speedHorz,
                    speedUp,
                    spinVal,
                    spinSpeed,
                    top,
                    left,
                    direction,
                });

        } else return;
    }

    function updateTrails() {
        particles.forEach((p) => {
            // update propeties
            p.left = p.left - (p.speedHorz * p.direction);
            p.top = p.top - p.speedUp;
            p.speedUp = Math.min(p.size, p.speedUp - 1);
            p.spinVal = p.spinVal + p.spinSpeed;

            // check if particle has gone off screen
            if (p.top >= height + p.size) {
                particles = particles.filter((o) => o !== p);
                p.element.remove();
            }
            // enter properties
            // transition: position 0.3s;
            p.element.setAttribute("style", `
                position: fixed;
                top: ${p.top}px;
                left: ${p.left}px;
                width: ${p.size}px;
                heigth: ${p.size}px;
            `);
        });
    }

    return (
        <div>
               
           
        <div id="homeArea">

            {/* Nav Bar */}
            <NavBar />
                <section id="heroSection">
                    <div className="hero">
                        <div id="header">
                            <h1>ETHER GAMES</h1>
                        </div>
                        <div id="slogan">
                            <h4>play games, win prizes</h4>
                        </div>
                        {/* <div id="search-bar">
                        <h5>seach bar</h5>
                    </div> */}
                    </div>
                </section>
       
            {/* Games */}
            <div className="game-container">
                <ul className="games">
                    <li onClick={() => history.push("/snake")}>
                        <a href>SNAKE
                <div className="icon">
                                <img src="https://neave.com/assets/images/home/zoom-earth.jpg" alt="" />
                            </div>
                            <div>
                                <h1>Jackpot: 1.2 ETH</h1>
                                <p>High Score: 1200</p>
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
            <footer id="footerHome" />
        </div>
        </div>
    );
}