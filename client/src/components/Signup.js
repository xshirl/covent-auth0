import React, { Component } from "react";
import Header from "./Header";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";
import config from "../config.json";
import { signup } from "../api/apiUsers"
import Profile from "./Profile";

export default class Signup extends Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false, user: null, token: "",
      inputUsername: '', inputPassword: '', inputName: ''
    };
  }

  handleChange = (e, stateName) => {
    this.setState({
      [stateName]: e.target.value
    });
  }

  submitSignin = async (e) => {
    e.preventDefault();
    try {
      const response = await signup({
        username: this.state.inputUsername,
        password: this.state.inputPassword,
        name: this.state.inputName
      });

      console.log(response);
      this.setState({
        inputUsername: '', inputPassword: '',
        inputName: ''
      });
    } catch (error) {
      console.log(error);
    }
  }

  logout = () => {
    this.setState({ isAuthenticated: false, token: "", user: null });
    localStorage.removeItem('token');
  };

  onFailure = (error) => {
    alert(error);
  };

  facebookResponse = (response) => {
    console.log(response);
    const tokenBlob = new Blob(
      [JSON.stringify({ access_token: response.accessToken }, null, 2)],
      { type: "application/json" }
    );
    const options = {
      method: "POST",
      body: tokenBlob,
      mode: "cors",
      cache: "default",
    };
    fetch("http://localhost:3000/api/auth/facebook", options).then((r) => {
      const token = r.headers.get("x-auth-token");
      r.json().then((user) => {
        if (token) {
          this.setState({ isAuthenticated: true, user, token });
        }
      });
    });
  };

  googleResponse = (response) => {
    const tokenBlob = new Blob(
      [JSON.stringify({ access_token: response.accessToken }, null, 2)],
      { type: "application/json" }
    );
    const options = {
      method: "POST",
      body: tokenBlob,
      mode: "cors",
      cache: "default",
    };
    fetch("http://localhost:3000/api/auth/google", options).then((r) => {
      const token = r.headers.get("x-auth-token");
      r.json().then((user) => {
        if (token) {
          this.setState({ isAuthenticated: true, user, token });
        }
      });
    });
  };

  render() {
    let content = this.state.isAuthenticated ? (
      <div className="login-page">
        <p>Authenticated</p>
        <div>{this.state.user.email}</div>
        <div>
          <button onClick={this.logout} className="button">
            Log out
          </button>
        </div>
      </div>
    ) : (
      <div className="login-page">
        <Header />
        <section className="loginLinks">
          <div>
            <FacebookLogin
              appId={config.FACEBOOK_APP_ID}
              autoLoad={false}
              fields="name,email,picture"
              callback={this.facebookResponse}
            />
          </div>
          <div>
            <GoogleLogin
              clientId={config.GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={this.googleResponse}
              onFailure={this.onFailure}
            />
          </div>
          </section>
          
          <section style={{textAlign: "center", border: "1px solid black", margin:"10px 30px", padding:"10px"}}>
            <form onSubmit={this.submitSignin}>
              <label htmlFor="username">Username</label>
              <input name="username"
                type="text"
                value={this.state.inputUsername}
                onChange={(e) => this.handleChange(e, 'inputUsername')}
              />

              <label htmlFor="actualname">Name or Nickname</label>
              <input name="actualname"
                type="text"
                value={this.state.inputName}
                onChange={(e) => this.handleChange(e, 'inputName')}
              />
              
              <label htmlFor="password">Password</label>
              <input name="password"
                type="password"
                value={this.state.inputPassword}
                onChange={(e) => this.handleChange(e, 'inputPassword')}
              />

              <button>Submit</button>
            </form>
          </section>
      </div>
    );

    return <div>{content}</div>;
  }
}
