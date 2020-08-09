import React, { Component } from "react";
import { Link } from "react-router-dom";
import { verifyuser } from "../api/apiUsers";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
    };
  }

  async componentDidMount() {
    try {
      const userId = await verifyuser();
      console.log(userId);
      this.setState({
        userId: userId.user.id,
      });
      console.log(this.state.userId);
    } catch (error) {
      console.log(error);
    }
  }

  logout = () => {
    this.setState({
      userId: null,
    });
    localStorage.removeItem("token");
  };

  render() {
    let header;
    if (!this.state.userId) {
      header = (
        <div className="nav-right-menu">
          <ul>
            <li>
              <Link className="nav-text" to="/login">
                LOGIN
              </Link>
            </li>
            <li>
              <Link className="nav-text" to="/signup">
                SIGN UP
              </Link>
            </li>
          </ul>
        </div>
      );
    } else {
      header = (
        <div className="nav-right-menu">
          <ul>
            <li>
              <Link className="nav-text" to="/profile">
                PROFILE
              </Link>
            </li>
            <li>
              <Link className="nav-text" to="/">
                <span onClick={this.logout}>LOGOUT</span>
              </Link>
            </li>
          </ul>
        </div>
      );
    }
    return (
      <div className="nav-container">
        <nav className="nav-header">
          <div className="nav-left-logo">
            <Link className="nav-text" to="/">
              CO-VENT
            </Link>
          </div>
          {header}
        </nav>
      </div>
    );
  }
}
