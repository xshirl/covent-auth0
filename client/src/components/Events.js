import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Header from "./Header";
import { getEvents, searchEvents } from "../api/apiCalls";

class Events extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: [],
    };
  }

  async componentDidMount() {
    try {
      const { term } = this.props.match.params;
      let response;
      if (term) {
        response = await searchEvents(term);
      } else {
        response = await getEvents(true);
      }
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
              <Link to={`/event/${event._id}`}>
                <button>Read More/Attend</button>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}

export default withRouter(Events)