import React, { useEffect, useRef, useState } from "react";
import NavBar from "../../components/Nav/NavBar";
import GameService from "../../services/GameService";
import history from "../../history";
import "./homeStyle.css";

export default function Home() {
    const [height, setHeight] = useState(document.documentElement.clientHeight);
    const [snakePot, setSnakePot] = useState(0);
    const [snakeScore, setSnakeScore] = useState(0);

    let particles = [];
    const sizes = [15, 20, 25, 35, 45];
    let interval = useRef(null);

    useEffect(() => {
        getInfo();
        document.getElementById("heroSection").addEventListener("mousemove", (e) => generateTrail(e));
        interval = setInterval(() => {
            updateTrails();
        }, 20);
    });

    function getInfo() {
        GameService.getInfo("snake").then(data => {
            if (!data.message) {
                let scoresArray = (data.scores.sort((a, b) => (b.score - a.score))).slice(0, 10);
                setSnakePot(data.pot);
                setSnakeScore(scoresArray[0].score);
            } else {
                console.log("error");
            }
        })
    }

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
                                    <img src="https://image.winudf.com/v2/image/Y29tLnNuYWtlY29tcGFueS5zbmFrZWlvZ2FtZV9zY3JlZW5fMV9wcmU1c3c3YQ/screen-1.jpg?fakeurl=1&type=.jpg" alt="" />
                                </div>
                                <div>
                                    <h1>Jackpot: {parseFloat(snakePot.toFixed(6))} ETH</h1>
                                    <p>High Score: {snakeScore}</p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href>ASTEROIDS
                <div className="icon">
                                    <img src="https://images.saymedia-content.com/.image/t_share/MTc0MDE0OTk4MzEyMzk2NjY3/asteroids-by-atari-classic-video-games-reviewed.jpg" alt="" />
                                </div>
                                <div>
                                    <h1>Jackpot: 0.002 ETH</h1>
                                    <p>High Score: 200</p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href>TETRIS
                <div className="icon">
                                    <img src="https://amp.thenationalnews.com/image/policy:1.1019785:1589539690/ac15-may-tetris.jpg?f=16x9&w=1200&$p$f$w=5f04803" alt="" />
                                </div>
                                <div>
                                    <h1>Jackpot: 13 ETH</h1>
                                    <p>High Score: 21000</p>
                                </div>
                            </a>
                        </li>
                        <li>
                            <a href>PAC-BOY
                <div className="icon">
                                    <img src="https://miro.medium.com/max/2496/1*hCdywjP_Sg1zTyc_BbbpSg.png" alt="" />
                                </div>
                                <div>
                                    <h1>Jackpot: 0.8 ETH</h1>
                                    <p>High Score: 14000</p>
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