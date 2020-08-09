import React, { Component } from "react";
import { createEvent } from "../api/apiCalls";
import Header from "./HeaderProfile";
export default class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      redirectHome: false,
      event: {
        event_name: "",
        description: "",
        isPublic: true,
        date: "",
        startTime: "",
        videoLink: "",
      },
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    this.setState((prevState, props) => ({
      event: {
        ...prevState.event,
        [name]: value,
      },
    }));
  };

  submit = async (event) => {
    event.preventDefault();
    console.log(this.state.event);
    try {
      await createEvent(this.state.event);
      this.props.history.push("/events?public");
    } catch (error) {
      console.log(error.message);
    }
  };

  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="container">
          <h1 className="event-form">Create Event </h1>
          <form onSubmit={this.submit}>
            <div className="form-group">
              <label>Event Name</label>
              <input
                className="form-control"
                value={this.state.event.event_name}
                name="event_name"
                onChange={this.handleInputChange}
                type="text"
              />
            </div>
            <div className="form-group">
              <label>Event Description</label>
              <textarea
                onChange={this.handleInputChange}
                className="form-control"
                cols="20"
                rows="4"
                name="description"
              ></textarea>
            </div>
            <div>
              <label>Public</label>
              <input
                onChange={this.handleInputChange}
                type="radio"
                name="isPublic"
                value={true}
              />
              <label>Private</label>
              <input
                onChange={this.handleInputChange}
                type="radio"
                name="isPublic"
                value={false}
              />
            </div>
            <div>
              <label>Event Date</label>
              <input
                onChange={this.handleInputChange}
                name="date"
                type="date"
                min="2020-08-01"
                max="2020-12-31"
              />
            </div>
            <div>
              <label>Event Time</label>
              <input
                onChange={this.handleInputChange}
                name="startTime"
                type="text"
                min="00:00"
                max="24:00"
              />
            </div>
            <div>
              <label>Video Link</label>
              <input
                onChange={this.handleInputChange}
                type="text"
                name="videoLink"
                placeholder="Google Meet or Zoom"
              />
            </div>
            <button type="submit" className="btn btn-primary btn-teal">
              Create Event
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
