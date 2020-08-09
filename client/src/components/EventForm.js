import React, { Component } from "react";
import { createEvent } from "../api/apiCalls";
import HeaderProfile from "./HeaderProfile";
export default class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      redirectHome: false,
      event: {
        name: "",
        description: "",
        isPublic: "",
        date: "",
        startTime: "",
        videoLink: "",
        creator: "",
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
  // handleSubmit(e) {
  //   e.preventDefault();
  //   this.props.onSubmit(this.state.event);
  //   this.setState({
  //     redirectHome: true,
  //   });
  // }
  submit = async (event) => {
    event.preventDefault();
    try {
      await createEvent({ event: this.state.event });
      this.props.history.push("/events?public");
    } catch (error) {
      console.log(error.message);
    }
  };
  render() {
    return (
      <React.Fragment>
        <HeaderProfile />
        <div className="container">
          <h1 className="event-form">Create Event </h1>
          <form onSubmit={this.submit}>
            <div className="form-group">
              <label>Event Name</label>
              <input
                className="form-control"
                value={this.state.event.name}
                name="name"
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
              ></textarea>
            </div>
            <div>
              <label>Public</label>
              <input
                onChange={this.handleInputChange}
                type="radio"
                name="public"
                value="public"
              />
              <label>Private</label>
              <input type="radio" name="private" value="private" />
            </div>
            <div>
              <label>Event Date</label>
              <input
                onChange={this.handleInputChange}
                type="date"
                min="2020-08-01"
                max="2020-12-31"
              />
            </div>
            <div>
              <label>Event Time</label>
              <input
                onChange={this.handleInputChange}
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
                placeholder="Google Meet Link"
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
