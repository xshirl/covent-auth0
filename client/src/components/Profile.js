import React, { Component } from "react";
import Login from "./Login";
import { Link } from "react-router-dom";

export default class Profile extends Component {
  render() {
    return (
      <div className="homepage">
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

        <div className="profilePage">
          <div className="sidebar">
            <nav class="menu">
              <li className="menu-item">
                <Link to="/profile/events">Events</Link>
              </li>
              <li className="menu-item">
                <Link to="/profile/friends">Friends</Link>
              </li>
            </nav>
          </div>

          <section className="mainProfile">
            <div className="profileImg">
              <img src={this.props.picture} alt={this.props.name} />
            </div>

            <h2 className="welcome"> Welcome {this.props.name} </h2>
            <hr />
            <h4>Email: {this.props.email}</h4>
          </section>
        </div>
      </div>
    );
  }
}
