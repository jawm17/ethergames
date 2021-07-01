import React, { useEffect, useState } from "react";
import SnakeGame from "../Snake/SnakeGame";
import "../ThatNewNew/ThatNewNew.css";

export default function SnakeGameScreen() {
  return (
    // <SnakeGame />
    <div className="currentGameInfo" id="currentGameInfoSnake">
      <h1>SNAKE</h1>
      <p>Highscore To Beat 2190</p>
      <p>Jackpot: 1.3 ETH</p>
      <div id="leaderBoard-container">
        <table>
          <thead>
            <tr>
              <th>Place</th>
              <th>User</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Jones</td>
              <td>2190</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Micheal</td>
              <td>123</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Carter</td>
              <td>122</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Owen</td>
              <td>100</td>
            </tr>
            <tr></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
