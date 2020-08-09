import React, { Component } from "react";
import Login from "./Login";
import { Link } from "react-router-dom";
import EventForm from "./EventForm";
import { userProfile } from "../api/apiUsers";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      created: [],
      attending: [],
    };
  }

  async componentDidMount() {
    try {
      const response = await userProfile();
      this.setState({
        created: response.user.createdEvents,
        attending: response.user.attendingEvents,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    const { created, attending } = this.state;
    let picture;
    if (!this.props.picture) {
      picture =
        "https://mastodon.sdf.org/system/accounts/avatars/000/108/313/original/035ab20c290d3722.png?1541993604";
    } else {
      picture = this.props.picture;
    }
    return (
      <div className="homepage">
        <div className="nav-container">
          <nav className="nav-header">
            <div className="nav-left-logo">
              <Link className="nav-text" to="/">
                CO-VENT
              </Link>
            </div>
            <div className="nav-right-menu">
              <ul>
                <li>
                  <Link className="nav-text" to="/profile">
                    PROFILE
                  </Link>
                </li>
                <li>
                  <Link className="nav-text" to="/">
                    <span onClick={this.props.logout}>LOGOUT</span>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="profilePage">
          <div className="sidebar">
            <nav className="menu">
              <li className="menu-item">
                <Link to="/profile/events">Events</Link>
              </li>
              <li className="menu-item">
                <Link to="/profile/friends">Friends</Link>
              </li>
              <li className="menu-item">
                <Link to="/message/read">Messages</Link>
              </li>
            </nav>
          </div>

          <section className="mainProfile">
            <div className="profileImg">
              <img src={picture} alt={this.props.name} />
            </div>

            <h2 className="welcome"> Welcome {this.props.name} </h2>
            <hr />
            <div className="create">
              <div className="createBox">
                <Link to="/createEvent">Create Event</Link>
              </div>

              <div className="createBox">
                <Link to="/message/write">Create Message</Link>
              </div>
            </div>

            <div className="eventsList">
              <div className="created">
                <h2>Created Events</h2>
                {created.map((event) => {
                  return (
                    <div className="event">
                      <Link to={`/events/${event.id}`}>{event.event_name}</Link>
                    </div>
                  );
                })}
              </div>

              <div className="attending">
                <h2>Attending Events </h2>
                {attending.map((event) => {
                  return (
                    <div className="event">
                      <Link to={`/events/${event.id}`}>{event.name}</Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
