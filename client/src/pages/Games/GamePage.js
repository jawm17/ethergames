// import React, { useState, useEffect, useContext } from "react";
// import NavBar from "../../components/Nav/NavBar";
// import Footer from "../../components/Footer/Footer";
// import Leaderboard from "../../components/Leaderboard";
// import "./GamePage.css";

// export default function SnakeContainer() {
//   const [scores, setScores] = useState([]);

//   return (
//     <div>
//       <NavBar />
//       <div className="gamePage">
//         <div className="game-container">
//           <div className="gameArea">
//             <div className="info">
//               <div className="title">SNAKE</div>
//               <div className="dot"></div>
//               <div className="jackpot">Jackpot: 12 ETH</div>
//               <div className="dot"></div>
//               <div className="highScore">Score to beat: 30000</div>
//             </div>
//             <div className="theGame">
//               <div className="theGame1"></div>
//             </div>
//           </div>
//           <div className="rightSide">
//             <div className="highScore-instructions-container">
//               <div className="highScore-container">
//                 <h1>High Scores</h1>
//                 <div className="gameScores">
//                   <div className="scores">
//                     <div className="userName">Jones</div>
//                     <div className="userScore">10000</div>
//                   </div>
//                   <div className="scores">
//                     <div className="userName">Micheal</div>
//                     <div className="userScore">5000</div>
//                   </div>
//                   <div className="scores">
//                     <div className="userName">Kyle</div>
//                     <div className="userScore">4000</div>
//                   </div>
//                   <div className="scores">
//                     <div className="userName">Andrew</div>
//                     <div className="userScore">3000</div>
//                   </div>
//                 </div>
//               </div>
//               <div className="gameInstructions-container">
//                 <h1>How to play</h1>
//                 <ol className="instuctList">
//                   <li>Deposit funds in your account.</li>
//                   <li>Start game - each play costs $0.25.</li>
//                   <li>
//                     Use the arrow keys (desktop) or the arrow buttons (mobile)
//                     to move. Eat the food and grow in size. Each food eaten is 5
//                     points.
//                   </li>
//                   <li>Don't eat yourself.</li>
//                   <li>Don't eat the border.</li>
//                   <li>Beat the top score and win the pot!</li>
//                 </ol>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }
