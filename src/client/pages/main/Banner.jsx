import React from "react";
import "../../assets/styles/home/flight-search.css";
import { withRouter } from "react-router-dom";
import FlightSearch from "./FlightSearch";

class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="flight-search">
        <h1 id="lrg-text">Seaplanes</h1>
        <h2 style={{ color: "white" }}>FIND YOUR ADVENTURE</h2>
        <br />
        <FlightSearch />
      </div>
    );
  }
}

export default withRouter(Banner);
