import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { getEvent } from "../api/apiCalls";
import Header from "./HeaderProfile";
import { verifyuser } from "../api/apiUsers";
import { attendEvent } from "../api/apiCalls";

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: null,
      userId: null,
    };
  }
  async componentDidMount() {
    try {
      const id = this.props.match.params.id;
      const response = await getEvent(id);
      const userId = await verifyuser();
      this.setState({
        event: response,
        userId: userId.user.id,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  attendEvent = async () => {
    try {
      const id = this.props.match.params.id;
      const response = await attendEvent(id);
      console.log(response);
      this.setState({
        event: response,
      });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    if (this.state.event) {
      const {
        date,
        description,
        event_name,
        startTime,
        attendees,
      } = this.state.event;
      console.log(event_name);
      const disableAttend =
        attendees.includes(this.state.userId) || !this.state.userId;
      return (
        <div>
          <Header />
          <div className="eventPage container">
            <h1>Event Name: {event_name}</h1>
            <p>Description: {description}</p>
            <p> Date: {date}</p>
            <p>Start Time: {startTime}</p>

            <button onClick={this.attendEvent} disabled={disableAttend}>
              Attend Event
            </button>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default withRouter(Event);
