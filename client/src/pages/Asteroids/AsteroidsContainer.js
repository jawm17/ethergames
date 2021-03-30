import React from "react";
import Asteroids from "./Asteroids";
import history from "../../history";
import "./asteroidsStyle.css";

export default function AsteroidsContainer() {

    return (
        <div>

            <div id="container" tabIndex="0" style={{ outline: "none" }} onKeyDown={e => e.preventDefault()}>
                <div id="closeGameButton" onClick={() => history.push("/")}>
                    <img id="closeX" src="https://firebasestorage.googleapis.com/v0/b/gamesresources-28440.appspot.com/o/yellowX.png?alt=media&token=4fca2aaa-9123-434a-839d-3a1cf3ee3436" alt="close button"></img>
                </div>
                <Asteroids />
                <div id="info">
                    <div id="top">
                        <div id="titleAsteroids">
                            ASTEROIDS
                        </div>
                        <div className="dotTetris">
                        </div>
                        <div id="jackpot">
                            Jackpot:  ETH
                        </div>
                        <div className="dotTetris">
                        </div>
                        <div id="highScore">
                            Score to beat:
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
                                Start game - each play costs $0.25 - 70% goes to the pot while the remaining 30% is used to maintain the site.
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