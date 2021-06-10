import React, { useEffect, useState } from "react";
import "../ThatNewNew/ThatNewNew.css";

export default function PacboyScreen() {
  return (
    <div className="currentGameInfo" id="currentGameInfoPacBoy">
            <h1>PacBoy</h1>
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
              <td>2190</td>
              <td>Jones</td>
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
            <tr></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
