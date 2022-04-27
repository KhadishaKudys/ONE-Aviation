import React from "react";
import { Container } from "react-bootstrap";
import "../../assets/styles/flight/create-flight.css";
import Loading from "../../components/reused/Loading";
import "react-nice-dates/build/style.css";
import { Link } from "react-router-dom";
import { successFlight } from "../../assets/static/flights/success-flight.jpg";

class BookFlightSuccess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    console.log(sessionStorage);
    const timer = setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 2000);
    return () => clearTimeout(timer);
  }

  async upd() {
    this.componentDidMount();
  }

  handleChange = (title, data) => {
    let newFilter = {
      ...this.state.filterData,
      [title]: data,
    };

    this.setState({ filterData: newFilter });
  };

  convertDate = (inputFormat) => {
    function pad(s) {
      return s < 10 ? "0" + s : s;
    }
    let d = new Date(inputFormat);
    return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join("-");
  };

  setEndDate = (date) => {
    this.setState({ due_date: date });
  };

  setStartDate = (date) => {
    this.setState({ start_date: date });
  };

  openContactInfo() {
    this.props.history.push({
      pathname: "/create-flight/contact-information",
      state: this.state,
    });
  }

  render() {
    return (
      <div className="flight">
        {this.state.isLoading ? (
          <Loading />
        ) : (
          <div className="success">
            <div id="back">
              <Link to="/">
                <button>🏠 Main</button>
              </Link>
            </div>
            <Container id="flight-created-success" className="create-flight">
              <h1>Flight is booked!</h1>
              <Link to="/">
                <button className="enter-btn">Return to home page</button>
              </Link>
            </Container>
          </div>
        )}
      </div>
    );
  }
}

export default BookFlightSuccess;
