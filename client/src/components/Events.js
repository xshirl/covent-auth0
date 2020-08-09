import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import { getEvents } from "../api/apiCalls";

export default class Events extends Component {
  constructor() {
    super();

    this.state = {
      events: [],
    };
  }

  async componentDidMount() {
    try {
      const response = await getEvents(true);
      console.log(response);
      this.setState({
        events: response,
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { events } = this.state;
    return (
      <div className="eventPage">
        <Header />
        {events.length > 1 ? <h2>Public Events</h2> : <h2>No Events</h2>}
        {events.map((event, ind) => {
          return (
            <div key={ind} className="box-bordered">
              <h3>{event.event_name}</h3>
              <p className="box-bordered">{event.description}</p>
              <p>Date: {event.date}</p>
              <p>Time: {event.startTime}</p>
              <Link to={`/events/${event._id}`}>
                <button>Read More/Attend</button>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}
