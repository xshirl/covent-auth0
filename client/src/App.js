import React, { Component } from "react";
import About from "./components/About";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Search from "./components/Search"
import MessageRead from "./components/MessageRead"
import MessageWrite from "./components/MessageWrite"
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { verifyuser } from "./api/apiUsers"

import "bootstrap/dist/css/bootstrap.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      currentUser: null,
    };
  }

  async componentDidMount() {
    try {
      const response = await verifyuser();
      console.log(response);
      this.setState({
        currentUser: response.user 
      });
    } catch (error) {
      console.log(error);
    }
  }

  signout = async () => {
    localStorage.removeItem('token');
    this.setState({
      currentUser: null
    });
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
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/message/read" component={MessageRead} />
        <Route exact path="/message/write" component={MessageWrite} />
      </Router>
    );
  }
}
