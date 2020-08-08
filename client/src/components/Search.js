import React, { Component } from "react";
import { searchEvents } from "../api/apiCalls";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      events: [],
      isLoading: false,
    };
  }

  submit = async (event) => {
    event.preventDefault();
    try {
      if (this.state.searchTerm) {
        this.setState({ isLoading: true });
        await searchEvents(this.state.searchTerm).then((events) => {
          console.log(events);
          this.setState({
            events: events,
            isLoading: false,
          });
        });
      }
    } catch (error) {
      console.log(error);
      this.setState({
        isLoading: false,
      });
    }
  };

  handleChange = (event) => {
    this.setState({
      searchTerm: event.target.value,
    });
  };

  render() {
    return (
      <div className="search-bar">
        <form className="search-form" onSubmit={this.submit}>
          <input
            className="search-input"
            type="text"
            placeholder="Search events (ie: catan)"
            onChange={this.handleChange}
            value={this.state.searchTerm}
          />

          <button className="search-button btn" type="submit">
            Submit
          </button>
        </form>

        {this.state.isLoading ? (
          <h2 style={{ color: "teal" }}>Loading...</h2>
        ) : null}

        {this.state.events.map((event, ind) => {
          return (
            <section className="events-list" key={ind}>
              <h3>{event.event_name}</h3>
              <h5>Description</h5>
              <p>{event.description}</p>
              <h4>{event.date}</h4>
              <h4>{event.startTime}</h4>
            </section>
          );
        })}
      </div>
    );
  }
}
