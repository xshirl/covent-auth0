import React, { Component } from "react";
import Header from "./Header";
import EventForm from "./EventForm";
import Search from "./Search";
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
        <EventForm />
      </div>
    );
  }
}
