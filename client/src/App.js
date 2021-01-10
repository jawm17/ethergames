import React from 'react';
import { Router, Route, Switch } from "react-router-dom";
import history from './history';
import SnakeGame from "./pages/Snake/snakeGame";
import NoMatchPage from "./pages/noMatchPage";
import Container from "./pages/Snake/container";

function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/snake" component={Container} />
        <Route path="/" component={SnakeGame} />
        <Route path="/">
          <NoMatchPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
