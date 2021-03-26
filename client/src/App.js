import React from 'react';
import NoMatchPage from "./pages/noMatchPage";
import About from "./pages/About/AboutPage";
import Container from "./pages/Snake/container";
import Login from "./pages/UserAuth/Login";
import Register from "./pages/UserAuth/Register";
import Home from "./pages/Home/home";
import Account from "./pages/Account/account";
import TetrisContainer from "./pages/Tetris/tetrisContainer";
import history from './history';
import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';
import { Router, Route, Switch } from 'react-router-dom';


function App() {
  return (
    <Router history={history}>
      <Switch>
        <UnPrivateRoute path="/login" component={Login} />
        <UnPrivateRoute path="/register" component={Register} />
        <Route path="/snake" component={Container} />
        <Route path="/tetris" component={TetrisContainer} />
        <Route exact path="/about" component={About} />
        <Route exact path="/" component={Home} />
        <PrivateRoute path="/account" component={Account} />
        <Route path="/" component={NoMatchPage} />
      </Switch>
    </Router>
  );
}

export default App;
