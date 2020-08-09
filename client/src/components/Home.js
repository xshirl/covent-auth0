import React, { Component } from "react";
import Header from "./Header";
import EventForm from "./EventForm";
import Search from "./Search";
import PublicEventList from "./PublicEventList";
export default class Home extends Component {
  render() {
    return (
      <div className="home-page">
        <Header></Header>

        <section className="hero">
          <h1>CO-VENT</h1>
          <h4>A community to connect with people through virtual events</h4>
        </section>

        <Search />
        <div className="about">
          <h1>About</h1>
          <p>
            {" "}
            Build community and connect with others with common interests during
            the Co-vid-19 pandemic through virtual events. Schedule events for
            any occasion. Do video calls and message friends.
          </p>
          <div className="icons">
            <div className="icon">
              <i class="fas fa-calendar"></i>
            </div>
            <div className="icon">
              {" "}
              <i class="fas fa-video"></i>
            </div>
            <div className="icon">
              <i class="fas fa-comment"></i>
            </div>
          </div>
        </div>
        <footer>
          <p>&copy; 2020 Andrew Hsu and Shirley Xu</p>
        </footer>
      </div>
    );
  }
}
