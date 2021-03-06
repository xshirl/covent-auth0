import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <div className="nav-container">
        <nav className="nav-header">
          <div className="nav-left-logo">
            <Link className="nav-text" to="/">
              CO-VENT
            </Link>
          </div>
          <div className="nav-right-menu">
            <ul>
              <li>
                <Link className="nav-text" to="/profile">
                  PROFILE
                </Link>
              </li>
              <li>
                <Link className="nav-text" to="/">
                  LOGOUT
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
