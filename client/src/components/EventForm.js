import React, { Component } from "react";

class EventForm extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit() {}
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div class="form-group">
          <label>Event Name</label>
          <input
            value={}
            name="name"
            onChange={this.handleInputChange}
            type="text"
          />
          <label>Event Description</label>
        </div>
      </form>
    );
  }
}
