import React, { useEffect, useState, useContext } from "react";
import NavBar from "../../components/Nav/NavBar";
import { AuthContext } from '../../context/AuthContext';
import Pacman from "./Pacman";
// import TxService from "../../services/TxService";
// import GameService from "../../services/GameService";
// import { AuthContext } from '../../context/AuthContext';
import axios from "axios";
import "./pacmanStyle.css";
import Footer from "../../components/Footer/Footer"
import Leaderboard from "../../components/Leaderboard";

export default function SnakeContainer() {
    const { address, balance, setBalance } = useContext(AuthContext);

    const [score, setScore] = useState(0);
    const [pot, setPot] = useState(0);
    const [scores, setScores] = useState([]);
    const [scoreToBeat, setScoreToBeat] = useState(1000);

    useEffect(() => {
        getGameInfo();
    }, []);

    async function getGameInfo() {
        try {
            const res = await axios.get("/game/info/pacman");
            const { data } = res;
            let scoresArray = (data.scores.sort((a, b) => (b.score - a.score))).slice(0, 10);
            setPot(data.pot);
            setScores(scoresArray);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <NavBar page="pacman" />
            <div id="container" tabIndex="0" style={{ outline: "none" }}>
                <Pacman />
                <div id="info">
                    <div id="top">
                        <div id="title">
                            PAC-MAN
                        </div>
                        <div className="dot">
                        </div>
                        <div id="jackpot">
                            Jackpot: {parseFloat(pot.toFixed(6))} ETH
                        </div>
                        <div className="dot">
                        </div>
                        <div id="highScore">
                            Score to beat: {scoreToBeat}
                        </div>
                        <div id="scoreSnake">
                            Score: {score}
                        </div>
                    </div>
                </div>

                <div id="boardAndInstruct">

                    <div id="leaderBoardArea">
                        <Leaderboard scores={scores} />
                    </div>

                    <div id="instructions">
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
                                Use the arrow keys (desktop) or the arrow buttons (mobile) to move. Eat the food and grow in size. Each food eaten is 5 points.
                            </li>
                            <li className="liSnake">
                                Don't eat yourself.
                            </li>
                            <li className="liSnake">
                                Don't eat the border.
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