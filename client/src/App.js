import React from 'react';
import NoMatchPage from "./Pages/noMatchPage";
import Container from "./Pages/Snake/container";
import Login from "./Pages/UserAuth/Login";
import Register from "./Pages/UserAuth/Register";
import Home from "./Pages/Home/home";
import Account from "./Pages/Account/account";

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
        <Route exact path="/" component={Home} />
        <PrivateRoute path="/account" component={Account} />
        <Route path="/" component={NoMatchPage} />
      </Switch>
    </Router>
  );
}

export default App;
