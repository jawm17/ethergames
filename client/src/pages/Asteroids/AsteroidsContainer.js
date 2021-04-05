import React, { useState, useEffect, useContext } from "react";
import Asteroids from "./Asteroids";
import { AuthContext } from '../../context/AuthContext';
import GameService from "../../services/GameService";
import TxService from "../../services/TxService";
import NavBar from "../../components/Nav/NavBar";
import Leaderboard from "../../components/Leaderboard";
import Footer from "../../components/Footer/Footer";
import history from "../../history";
import "./asteroidsStyle.css";

export default function AsteroidsContainer() {

    const authContext = useContext(AuthContext);

    const [pot, setPot] = useState(0);
    const [scores, setScores] = useState([]);
    const [scoreToBeat, setScoreToBeat] = useState(1000);
    const [user, setUser] = useState(authContext.user.username);

    useEffect(() => {
        getInfo();
    }, []);


    function getInfo() {
        return new Promise(resolve => {
            GameService.getInfo("asteroids").then(data => {
                if (!data.message) {
                    setPot(data.pot);
                    if(data.scores.length > 0) {
                        let scoresArray = (data.scores.sort((a, b) => (b.score - a.score))).slice(0, 10);
                        setScoreToBeat(scoresArray[0].score);
                        setScores(scoresArray);
                    }   
                    resolve();
                } else {
                    console.log("error");
                    resolve();
                }
            });
        });
    }

    function gameStart() {
        TxService.potPayment(0.000152, "asteroids").then(data => {
            setPot(pot + 0.000152);
        });
    }

    function newScore(score) {
        GameService.newScore("asteroids", user, score).then(data => {
            getInfo();
        });
    }

    async function gameOver(score) {
        await getInfo();
        console.log(score);
        if (scores.length >= 1) {
            // multiple scores
            if (score > 20) {
                // top score
                GameService.potPayout("asteroids").then(data => {
                    newScore();
                });
            } else {
                newScore();
            }
        } else {
            // no scores set
            newScore();
        }
    }

    return (
        <div>
            <NavBar page="asteroids"/>
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
                            Score to beat: {scoreToBeat}
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
                                Use the arrow keys (desktop) or the arrow buttons (mobile) to play.
                            </li>
                            <li className="liSnake">
                                Clear rows by filling them completely and increase your score.
                            </li>
                            <li className="liSnake">
                                The speed increases as you progress.
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