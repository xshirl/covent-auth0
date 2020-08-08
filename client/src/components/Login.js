import React, { Component } from "react";
import Header from "./Header";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";
import config from "../config.json";
import Profile from "./Profile";

export default class Login extends Component {
  constructor() {
    super();
    this.state = { isAuthenticated: false, user: null, token: "" };
  }

  logout = () => {
    this.setState({ isAuthenticated: false, token: "", user: null });
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
      </div>
    );

    return <div>{content}</div>;
  }
}

//   responseFacebook = (response) => {
//     console.log(response);

//     this.setState({
//       isLoggedIn: true,
//       name: response.name,
//       email: response.email,
//       picture: response.picture.data.url,
//     });
//   };

//   render() {
//     let fbContent;
//     let { name, email, picture } = this.state;
//     if (this.state.isLoggedIn) {
//       fbContent = <Profile name={name} email={email} picture={picture} />;
//     } else {
//       fbContent = (
//         <div className="login-page">
//           <Header></Header>

//           <section className="loginLinks">
//             <FacebookLogin
//               appId="1560093777493830"
//               autoLoad={false}
//               fields="name,email,picture"
//               callback={this.responseFacebook}
//             />
//           </section>
//         </div>
//       );
//     }

//     return <div>{fbContent}</div>;
//   }
// }
