import React from "react";
import Tetris from "../../components/Tetris";

export default function TetrisContainer() {

    return (
        <div id="container" tabIndex="0" style={{ outline: "none" }} onKeyDown={e => e.preventDefault()}>
        {/* <div id="headerSnake">
  
        </div> */}
        <Tetris />
        <div id="info">
          <div id="top">
            <div id="title">
              TETRIS
            </div>
            <div id="dot">
  
            </div>
            <div id="jackpot">
              Jackpot: ETH
            </div>
            <div id="dot">
  
            </div>
            <div id="highScore">
              Score to beat: 
            </div>
            <div id="score">
              Score: 
            </div>
          </div>
          <div id="leaderBoardArea">
            <div id="leaderBoardTitle">
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
          <div id="instructions">
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
        <div id="footerHome">
  
        </div>
      </div>
    );
}