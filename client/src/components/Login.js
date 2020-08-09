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
      signInName: "",
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
        signInName: response.user.username,
      });
    } catch (error) {
      console.log(error);
    }
  };

  responseFacebook = async (response) => {
    console.log(response);
    this.setState({
      isLoggedIn: true,
      username: response.name,
      email: response.email,
      picture: response.picture.data.url,
    });
    this.submitFacebook(response);
  };

  submitFacebook = async (data) => {
    try {
      const response = await signin({
        username: data.email,
        password: data.accessToken,
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

  render() {
    let fbContent;
    let { username, email, picture, signedInUsername } = this.state;
    const signinName = signedInUsername;
    console.log(signinName);
    if (this.state.isLoggedIn) {
      if (!signinName) {
        fbContent = <Profile name={username} picture={picture} />;
      } else {
        fbContent = <Profile name={signinName} />;
      }
    } else {
      fbContent = (
        <div className="login-page">
          <Header></Header>
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
              <h1> Log In </h1>
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
        </div>
      );
    }

    return <div>{fbContent}</div>;
  }
}
