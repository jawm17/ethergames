import React from 'react';
import { Router, Route, Switch } from "react-router-dom";
import history from './history';
import NoMatchPage from "./pages/noMatchPage";
import Container from "./pages/Snake/container";
import Home from "./pages/Home/home";
import SignIn from "./pages/Login/login";
import Register from "./pages/Login/register";

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/snake" component={Container} />
        <Route exact path="/" component={Home} />
        <Route path="/login" component={SignIn} />
        <Route path ="/register" component={Register} />
        <Route path="/">
          <NoMatchPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
