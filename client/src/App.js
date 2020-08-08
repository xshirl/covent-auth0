import React, { Component } from "react";
import About from "./components/About";
import Home from "./components/Home";
import Login from "./components/Login.js";
import Profile from "./components/Profile";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      currentUser: null,
    };
  }

  render() {
    let Site;

    if (this.state.currentUser) {
      Site = (
        <div className="homepage">
          <nav className="header">
            <div className="left-logo">CO-VENT</div>
            <div className="right-menu">
              <ul>
                <li>Profile</li>
                <li>Log Out</li>
              </ul>
            </div>
          </nav>
        </div>
      );
    }

    return (
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={Profile} />
      </Router>
    );
  }
}
