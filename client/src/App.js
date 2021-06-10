import React from 'react';
import history from './history';
import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';
import { Router, Route, Switch } from 'react-router-dom';

// Pages
import NoMatchPage from "./pages/NoMatchPage";
import About from "./pages/About/AboutPage";
import SnakeContainer from "./pages/Snake/SnakeContainer";
import Login from "./pages/UserAuth/Login";
import Register from "./pages/UserAuth/Register";
import Home from "./pages/Home/Home";
import Account from "./pages/Account/Account";
// import GamePage from "./pages/Games/GamePage";
import TetrisContainer from "./pages/Tetris/TetrisContainer";
import AsteroidsContainer from "./pages/Asteroids/AsteroidsContainer";
import Pacman from "./pages/Pacman/Pacman";
import WalletConnect from "./pages/WalletConnect/WalletConnect";
import ThatNewNew from "./pages/ThatNewNew/ThatNewNew";
import BoxShadow from "./components/BoxShadow";


function App() {
  return (
    <Router history={history}>
      <Switch>
        <UnPrivateRoute path="/login" component={Login} />
        <UnPrivateRoute path="/register" component={Register} />
        <Route path="/snake" component={SnakeContainer} />
        <Route path="/tetris" component={TetrisContainer} />
        <Route path="/about" component={About} />
        {/* <Route path="/gamePage" component={GamePage} /> */}
        <Route exact path="/" component={Home} />
        <Route path="/asteroids" component={AsteroidsContainer} />
        <Route path="/pacman" component={Pacman} />
        <Route path="/ThatNewNew" component={ThatNewNew} />
        <Route path="/arcade" component={WalletConnect} />
        <PrivateRoute path="/account" component={Account} />
        <Route path="/btn" component={BoxShadow} />
        <Route path="/" component={NoMatchPage} />
      </Switch>
    </Router>
  );
}

export default App;
