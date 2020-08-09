import React, { Component } from "react";
import Header from "./Header";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";
import config from "../config.json";
import { signup } from "../api/apiUsers";
import Profile from "./Profile";
// import { signUp } from "../../../controllers";

export default class Signup extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      username: "",
      email: "",
      picture: "",
      inputUsername: "",
      inputPassword: "",
      inputName: "",
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
      const response = await signup({
        username: this.state.inputUsername,
        password: this.state.inputPassword,
        name: this.state.inputName,
      });

      console.log(response);
      this.setState({
        isLoggedIn: true,
        inputUsername: "",
        inputPassword: "",
        inputName: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  responseFacebook = async (response) => {
    this.setState({
      isLoggedIn: true,
      username: response.name,
      picture: response.picture.data.url,
    });
    this.submitFacebook(response);
  };

  submitFacebook = async (data) => {
    try {
      const response = await signup({
        username: data.name,
        password: data.accessToken,
        name: data.name,
      });
      console.log(response);
    } catch (error) {
      throw error;
    }
  };

  logout = () => {
    this.setState({
      isLoggedIn: false,
      username: "",
      email: "",
      picture: "",
      inputUsername: "",
      inputPassword: "",
    });
    localStorage.removeItem("token");
    this.props.history.push("/");
  };

  onFailure = (error) => {
    alert(error);
  };

  render() {
    let content;
    let { username, email, picture, inputUsername } = this.state;
    if (this.state.isLoggedIn) {
      if (!inputUsername) {
        content = (
          <Profile name={username} picture={picture} logout={this.logout} />
        );
      } else {
        content = <Profile name={inputUsername} />;
      }
    } else {
      content = (
        <div className="login-page">
          <Header />
          <div className="container">
            <section className="loginLinks">
              <FacebookLogin
                appId="1560093777493830"
                autoLoad={false}
                fields="name,email,picture"
                callback={this.responseFacebook}
              />
            </section>

            <section className="signUpForm">
              <h1> Sign Up </h1>
              <form onSubmit={this.submitSignin}>
                <label htmlFor="username">Username</label>
                <input
                  name="username"
                  type="text"
                  value={this.state.inputUsername}
                  onChange={(e) => this.handleChange(e, "inputUsername")}
                />

                <label htmlFor="actualname">Name or Nickname</label>
                <input
                  name="actualname"
                  type="text"
                  value={this.state.inputName}
                  onChange={(e) => this.handleChange(e, "inputName")}
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
        </div>
      );
    }
    return <div>{content}</div>;
  }
}
