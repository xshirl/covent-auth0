import React, { Component } from "react";
import api from "../api";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      isLoading: false,
    };
  }

  submit = async (event) => {
    this.setState({ isLoading: true });
    await api.getEvents().then((events) => {
      this.setState({
        events: events.data.data,
        isLoading: false,
      });
    });
  };

  handleChange = (event) => {
    this.setState({});
  };

  render() {
    return (
      <div>
        <form onSubmit={this.submit}>
          <input
            type="text"
            placeholder="Search events"
            onChange={this.handleChange}
          />
          <button type="submit"></button>
        </form>
      </div>
    );
  }
}
