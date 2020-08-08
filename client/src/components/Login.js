import React, { Component } from "react";
import Header from "./Header";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";
import config from "../config.json";
import { signin } from "../api/apiUsers";
import Profile from "./Profile";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      username: "",
      email: "",
      picture: "",
      inputUsername: "",
      inputPassword: "",
    };
  }

  handleChange = (e, stateName) => {
    this.setState({
      [stateName]: e.target.value,
    });
  };

  submitSignin = async (e) => {
    e.preventDefault();
    try {
      const response = await signin({
        username: this.state.inputUsername,
        password: this.state.inputPassword,
      });

      console.log(response);
      this.setState({
        isLoggedIn: true,
        inputUsername: "",
        inputPassword: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  logout = () => {
    this.setState({ isAuthenticated: false, token: "", user: null });
    localStorage.removeItem("token");
  };

  responseFacebook = (response) => {
    console.log(response);
    signin({
      username: response.name,
      password_digest: response.accessToken,
    });

    this.setState({
      isLoggedIn: true,
      username: response.name,
      email: response.email,
      picture: response.picture.data.url,
    });
  };

  render() {
    let fbContent;
    let { username, email, picture, inputUsername } = this.state;
    if (this.state.isLoggedIn) {
      if (!inputUsername) {
        fbContent = <Profile name={username} picture={picture} />;
      } else {
        fbContent = <Profile name={inputUsername} />;
      }
    } else {
      fbContent = (
        <div className="login-page">
          <Header></Header>

          <section className="loginLinks">
            <FacebookLogin
              appId="1560093777493830"
              autoLoad={false}
              fields="name,email,picture"
              callback={this.responseFacebook}
            />
          </section>

          <section
            style={{
              textAlign: "center",
              border: "1px solid black",
              margin: "10px 30px",
              padding: "10px",
            }}
          >
            <form onSubmit={this.submitSignin}>
              <label htmlFor="username">Username</label>
              <input
                name="username"
                type="text"
                value={this.state.inputUsername}
                onChange={(e) => this.handleChange(e, "inputUsername")}
              />

              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                value={this.state.inputPassword}
                onChange={(e) => this.handleChange(e, "inputPassword")}
              />

              <button>Submit</button>
            </form>
          </section>
        </div>
      );
    }

    return <div>{fbContent}</div>;
  }
}
