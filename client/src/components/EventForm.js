import React, { Component } from "react";

export default class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      redirectHome: false,
      event: Object.assign(
        {
          name: "",
          description: "",
          isPublic: "",
          date: "",
          startTime: "",
          videoLink: "",
          creator: "",
        },
        props.initialValue
      ),
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
  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.event);
    this.setState({
      redirectHome: true,
    });
  }
  render() {
    return (
      <React.Fragment>
        <h1>Create Event </h1>
        <form onSubmit={this.handleSubmit}>
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
            <textarea className="form-control" cols="20" rows="4"></textarea>
          </div>
          <div>
            <label>Public</label>
            <input type="radio" name="public" value="public" />
            <label>Private</label>
            <input type="radio" name="private" value="private" />
          </div>
          <div>
            <label>Event Date</label>
            <input type="date" min="2020-08-01" max="2020-12-31" />
          </div>
          <div>
            <label>Event Time</label>
            <input type="text" min="00:00" max="24:00" />
          </div>
          <div>
            <label>Video Link</label>
            <input type="text" placeholder="Google Meet Link" />
          </div>
          <button type="submit" className="btn btn-primary">
            Create Event
          </button>
        </form>
      </React.Fragment>
    );
  }
}
