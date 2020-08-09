import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { verifyuser } from "../api/apiUsers";
import { sendMessage } from "../api/apiCalls";
import Header from "./HeaderProfile";
class MessageWrite extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      inputTo: "",
      inputSubject: "",
      inputContent: "",
    };
  }

  async componentDidMount() {
    try {
      const response = await verifyuser();
      this.setState({
        username: response.user.username,
      });
    } catch (error) {
      console.log(error);
    }
  }

  handleChange = (e, stateName) => {
    this.setState({
      [stateName]: e.target.value,
    });
  };

  submitMessage = async (e) => {
    e.preventDefault();
    try {
      const response = await sendMessage({
        recipients: this.state.inputTo,
        subject: this.state.inputSubject,
        content: this.state.inputContent,
      });

      console.log(response);
      this.props.history.push("/message/read");
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div>
        <Header />
        <div className="messageForm container">
          {this.state.username ? (
            <h3>Logged in as {this.state.username}</h3>
          ) : null}

          <form onSubmit={this.submitMessage}>
            <label htmlFor="sendTo">
              Send Message To (separate usernames with commas):
            </label>
            <input
              name="sendTo"
              type="text"
              value={this.state.inputTo}
              onChange={(e) => this.handleChange(e, "inputTo")}
            />

            <label htmlFor="subject">Subject:</label>
            <input
              name="subject"
              type="text"
              value={this.state.inputSubject}
              onChange={(e) => this.handleChange(e, "inputSubject")}
            />

            <label htmlFor="content">Message Content:</label>
            <textarea
              name="content"
              value={this.state.inputContent}
              onChange={(e) => this.handleChange(e, "inputContent")}
            />

            <button>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(MessageWrite);
