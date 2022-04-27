import React from "react";
import Information from "./Information";
import BlogPreview from "./BlogPreview";
import Subscribe from "./Subscribe";
import ClientsComments from "./ClientsComments";
import Banner from "./Banner";
import * as moment from "moment";

class Main extends React.Component {
  componentDidMount() {
    localStorage.setItem("from_lat", "");
    localStorage.setItem("from_long", "");
    localStorage.setItem("departure_port", "");
    localStorage.setItem("to_lat", "");
    localStorage.setItem("to_long", "");
    localStorage.setItem("destination_port", "");
    this.setValues();
  }

  setValues = () => {
    sessionStorage.setItem("create_dep_port", "");
    sessionStorage.setItem("create_des_port", "");
    sessionStorage.setItem("create_dep_date", "");
    sessionStorage.setItem("create_des_date", "");
    sessionStorage.setItem("create_dep_time", "");
    sessionStorage.setItem("create_des_time", "");
    sessionStorage.setItem("create_dep_dt", "");
    sessionStorage.setItem("create_des_dt", "");
    sessionStorage.setItem("create_pass", "");
    sessionStorage.setItem("create_email", "");
    sessionStorage.setItem("create_phone", "");
    sessionStorage.setItem("create_trip", "one");
    sessionStorage.setItem("create_shareable", true);
    sessionStorage.setItem("create_name", "");
    sessionStorage.setItem("create_surname", "");
    sessionStorage.setItem("create_dir", "FORWARD");
    sessionStorage.setItem("create_doc", "passport");
    sessionStorage.setItem("create_doc_num", "");
    sessionStorage.setItem("create_promo", "");

    sessionStorage.setItem("book_email", "");
    sessionStorage.setItem("book_phone", "");
    sessionStorage.setItem("book_name", "");
    sessionStorage.setItem("book_surname", "");
    sessionStorage.setItem("book_doc", "passport");
    sessionStorage.setItem("book_doc_num", "");
    sessionStorage.setItem("book_promo", "");
  };

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
