import React from "react";
import Information from "./Information";
import BlogPreview from "./BlogPreview";
import Subscribe from "./Subscribe";
import ClientsComments from "./ClientsComments";
import Banner from "./Banner";

class Main extends React.Component {
  componentDidMount() {
    localStorage.setItem("from_lat", "");
    localStorage.setItem("from_long", "");
    localStorage.setItem("departure_port", "");
    localStorage.setItem("to_lat", "");
    localStorage.setItem("to_long", "");
    localStorage.setItem("destination_port", "");
  }

  render() {
    return (
      <div className="home">
        <Banner />
        <Information />
        <BlogPreview />
        <ClientsComments />
        <Subscribe />
      </div>
    );
  }
}

export default Main;
