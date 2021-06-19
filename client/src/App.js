import React from 'react';
import history from './history';
import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';
import { Router, Route, Switch } from 'react-router-dom';

// Pages
import NoMatchPage from "./pages/NoMatchPage";
import About from "./pages/About/AboutPage";
import SnakeGame from "./pages/Snake/SnakeGame";
import Login from "./pages/UserAuth/Login";
import Register from "./pages/UserAuth/Register";
import Home from "./pages/Home/Home";
import Account from "./pages/Account/Account";
// import GamePage from "./pages/Games/GamePage";
import TetrisContainer from "./pages/Tetris/TetrisContainer";
import Asteroids from "./pages/Asteroids/Asteroids";
import Pacman from "./pages/Pacman/Pacman";
import WalletConnect from "./pages/WalletConnect/WalletConnect";
import ThatNewNew from "./pages/ThatNewNew/ThatNewNew";
import BoxShadow from "./components/BoxShadow";


function App() {
  return (
    <Router history={history}>
      <Switch>
        {/* <Route path="/snake" component={SnakeGame} /> */}
        <Route path="/asteroids" component={Asteroids} />
        {/* <Route path="/pacman" component={Pacman} /> */}
        <Route path="/tetris" component={TetrisContainer} />
        <Route path="/about" component={About} />
        <Route exact path="/" component={ThatNewNew} />
        <Route exact path="/:game" component={ThatNewNew} />
        <Route path="/btn" component={BoxShadow} />
        <Route path="/" component={NoMatchPage} />
      </Switch>
    </Router>
  );
}

export default App;
