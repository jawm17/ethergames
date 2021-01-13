import React from 'react';
import Navbar from './Components/Navbar';
import NoMatchPage from "./Pages/noMatchPage";
import Container from "./Pages/Snake/container";
import Login from "./Pages/UserAuth/Login";
import Register from "./Pages/UserAuth/Register";
import Home from "./Pages/Home/home";
import Account from "./Pages/Account/account";

import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';
import {BrowserRouter as Router, Route} from 'react-router-dom';


function App() {
  return (
    <Router>
      {/* <Navbar/> */}
      <UnPrivateRoute path="/login" component={Login}/>
      <UnPrivateRoute path="/register" component={Register}/>
      <PrivateRoute path="/snake" component={Container} />
      <Route exact path="/" component={Home} />
      <PrivateRoute path="/account" component={Account} />
    </Router>
  );
}

export default App;
