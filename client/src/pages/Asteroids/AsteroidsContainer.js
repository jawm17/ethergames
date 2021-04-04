import React, { useState, useEffect, useContext } from "react";
import Asteroids from "./Asteroids";
import { AuthContext } from '../../context/AuthContext';
import GameService from "../../services/GameService";
import NavBar from "../../components/Nav/NavBar";
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
    });


    function getInfo() {
        return new Promise(resolve => {
            GameService.getInfo("asteroids").then(data => {
                if (!data.message) {
                    setPot(data.pot);
                    let scoresArray = (data.scores.sort((a, b) => (b.score - a.score))).slice(0, 10);
                    if (scoresArray.length > 0) {
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

    return (
        <div>
            <NavBar />
            <div id="container" tabIndex="0" style={{ outline: "none" }} onKeyDown={e => e.preventDefault()}>
                <Asteroids />
                <div id="info">
                    <div id="top">
                        <div id="titleAsteroids">
                            ASTEROIDS
                        </div>
                        <div className="dotAsteroids">
                        </div>
                        <div id="jackpot">
                            Jackpot: {pot} ETH
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
                        <div id="leaderBoardTitleTetris">
                            High Scores
                        </div>
                        <div id="leaderBoard">
                            {/* {scores.map(score => {
                                return <Score
                                    user={score.user}
                                    score={score.score}
                                    key={score.timeStamp}
                                />
                            })} */}
                        </div>
                    </div>
                    <div id="instructionsTetris">
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
            <div id="footerYellow">
            </div>
        </div>
    );
}