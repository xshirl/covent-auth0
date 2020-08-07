import React, { Component } from "react";
import Header from "./Header";
import FacebookLogin from "react-facebook-login";
import Profile from "./Profile";
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      name: "",
      email: "",
      picture: "",
    };
  }
  responseFacebook = (response) => {
    console.log(response);

    this.setState({
      isLoggedIn: true,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url,
    });
  };

  render() {
    let fbContent;
    let { name, email, picture } = this.state;
    if (this.state.isLoggedIn) {
      fbContent = <Profile name={name} email={email} picture={picture} />;
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
        </div>
      );
    }

    return <div>{fbContent}</div>;
  }
}
