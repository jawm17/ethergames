import React, { useState, useEffect, useContext } from "react";
import Asteroids from "./Asteroids";
import { AuthContext } from '../../context/AuthContext';
import GameService from "../../services/GameService";
import TxService from "../../services/TxService";
import NavBar from "../../components/Nav/NavBar";
import Leaderboard from "../../components/Leaderboard";
import Footer from "../../components/Footer/Footer";
import JackPotAlert from "../../components/JackPotAlert";
import axios from "axios";
import "./asteroidsStyle.css";

export default function AsteroidsContainer() {
    const { address, balance, setBalance } = useContext(AuthContext);

    const [pot, setPot] = useState(0);
    const [scores, setScores] = useState([]);
    const [prevPot, setPrevPot] = useState(0);
    const [jackPot, setJackPot] = useState(false);

    useEffect(() => {
        getInfo();
    }, []);


    async function getInfo() {
        try {
            const res = await axios.get("/game/info/asteroids");
            const { data } = res;
            let scoresArray = (data.scores.sort((a, b) => (b.score - a.score))).slice(0, 10);
            setPot(data.pot);
            setScores(scoresArray);
        } catch (err) {
            console.log(err);
        }
    }

    async function gameStart() {
        try {
            await axios.post("/game/payment", { "amount": 0.0001, "game": "asteroids", "address": address });
            setPot(pot + 0.0001);
            setBalance(balance - 1);
        } catch (err) {
            console.log(err);
        }
    }

    async function newScore(score) {
        try {
            await axios.post("/game/score", { "game": "asteroids", "address": address, "score": score });
            getInfo();
        } catch (err) {
            console.log(err);
        }
    }

    async function gameOver(score) {
        await getInfo();
        if (scores.length < 1 || score > scores[0].score) {
            try {
                setPrevPot(pot);
                setJackPot(true);
                newScore(score);
                await axios.post("/game/payout", { "game": "asteroids", "address": address });
            } catch (err) {
                console.log(err);
            }
        } else {
            newScore(score);
        }
    }

    return (
        <div>
            <NavBar page="asteroids" />
            {jackPot ? (
                <JackPotAlert
                    close={() => setJackPot(false)}
                    pot={prevPot}
                />
            ) : null}
            <div id="container" tabIndex="0" style={{ outline: "none" }} onKeyDown={e => e.preventDefault()}>
                <Asteroids start={() => gameStart()} gameOver={(score) => gameOver(score)} />
                <div id="info">
                    <div id="top">
                        <div id="titleAsteroids">
                            ASTEROIDS
                        </div>
                        <div className="dotAsteroids">
                        </div>
                        <div id="jackpot">
                            Jackpot: {parseFloat(pot.toFixed(6))} ETH
                        </div>
                        <div className="dotAsteroids">
                        </div>
                        <div id="highScore">
                            Score to beat: {scores[0]?.score || 1000}
                        </div>
                    </div>
                </div>
                <div id="boardAndInstruct">
                    <div id="leaderBoardArea">
                        <Leaderboard scores={scores} />
                    </div>
                    <div id="instructionsAsteroids">
                        <div>
                            How to play
                        </div>
                        <ol id="instuctList">
                            <li className="liSnake">
                                Deposit funds in your account.
                            </li>
                            <li className="liSnake">
                                Start game - each play costs $0.25.
                            </li>
                            <li className="liSnake">
                                Use the arrow keys (desktop) or the arrow buttons (mobile) to move.
                            </li>
                            <li className="liSnake">
                                Use the spacebar (desktop) or the shoot button (mobile) to fire at asteroids.
                            </li>
                            <li className="liSnake">
                                Shoot all the asteroids to level up.
                            </li>
                            <li className="liSnake">
                                Beat the top score and win the pot!
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}