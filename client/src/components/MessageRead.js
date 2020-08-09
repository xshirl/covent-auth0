import React, { Component } from "react";
import { getMessages } from "../api/apiCalls";
import HeaderProfile from "./HeaderProfile";
import { Link } from "react-router-dom";
export default class MessageRead extends Component {
  constructor() {
    super();

    this.state = {
      received: [],
      sent: [],
    };
  }

  async componentDidMount() {
    try {
      const response = await getMessages();
      console.log(response);
      this.setState({
        ...response,
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div>
        <HeaderProfile />
        <div className="inbox">
          <h2>Inbox</h2>
          {this.state.received.map((message, ind) => {
            return (
              <div
                key={ind}
                className="messages"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                <h2>Subject: {message.subject}</h2>
                <h4>From: {message.creator}</h4>
                <h4>To: {message.recipients.join(", ")}</h4>
                <h4>Content:</h4>
                <p>{message.content}</p>
              </div>
            );
          })}

          <h2>Sent Messages</h2>
          {this.state.sent.map((message, ind) => {
            return (
              <div
                key={ind}
                className="messages"
                style={{ border: "1px solid black", padding: "10px" }}
              >
                <h2>Subject: {message.subject}</h2>
                <h4>From: {message.creator}</h4>
                <h4>To: {message.recipients.join(", ")}</h4>
                <h4>Content:</h4>
                <p>{message.content}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
