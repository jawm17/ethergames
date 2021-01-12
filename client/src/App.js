import React from 'react';
import Navbar from './Components/Navbar';
import NoMatchPage from "./Pages/noMatchPage";
import Container from "./Pages/Snake/container";
import Login from "./Pages/UserAuth/Login";
import Register from "./Pages/UserAuth/Register";

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
    </Router>
  );
}

export default App;
