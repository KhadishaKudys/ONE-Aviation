import React from "react";
import { Card, Container, Row, Col, Modal, Alert } from "react-bootstrap";
import "../../assets/styles/home/flight-search.css";
import from_to from "../../assets/static/icons/home/from_to.svg";
import Map1 from "../../components/flight/Googlemapsearch";
import { Link, withRouter } from "react-router-dom";
import { DatePicker } from "antd";

class FlightSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location_from_latitude: "",
      location_from_longitude: "",
      location_to_latitude: "",
      location_to_longitude: "",
      date_from: "",
      date_to: "",
      passengers: "",
      map_1_show: false,
      map_2_show: false,
      available_ports: {},
      limit: 10,
      page: 1,
      order_by: "",
      order_key: 1,
      available_flights: [],
      departure_port: "",
      destination_port: "",
      locationError: "",
      passengerError: "",
    };
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

  changeFrom() {
    this.setState({
      location_from_latitude: localStorage.getItem("from_latitude"),
    });
    this.setState({
      location_from_longitude: localStorage.getItem("from_longitude"),
    });
    this.setState({ departure_port: localStorage.getItem("departure_port") });
    this.setState({ map_1_show: false });
  }

  removeFrom() {
    this.setState({
      location_from_latitude: "",
    });
    this.setState({
      location_from_longitude: "",
    });
    this.setState({ departure_port: "" });
    this.setState({ map_1_show: false });
  }

  changeFrom2() {
    this.setState({
      location_to_latitude: localStorage.getItem("to_latitude"),
    });
    this.setState({
      location_to_longitude: localStorage.getItem("to_longitude"),
    });
    this.setState({
      destination_port: localStorage.getItem("destination_port"),
    });
    this.setState({ map_2_show: false });
  }

  removeFrom2() {
    this.setState({
      location_to_latitude: "",
    });
    this.setState({
      location_to_longitude: "",
    });
    this.setState({
      destination_port: "",
    });
    this.setState({ map_2_show: false });
  }

  fromClicked() {
    this.setState({ map_1_show: true });
    localStorage.setItem("location_dir", "from");
  }

  toClicked() {
    this.setState({ map_2_show: true });
    localStorage.setItem("location_dir", "to");
  }

  closeFromMap() {
    this.setState({ map_1_show: false });
  }

  async availableFlights() {
    console.log(this.state);
    let flight = {};
    if (this.state.passengers !== "") {
      flight.number_of_passengers = parseInt(this.state.passengers);
    }
    if (this.state.date_from !== "") {
      flight.date_from = this.state.date_from;
    }
    if (this.state.date_to !== "") {
      flight.date_to = this.state.date_to;
    }
    if (this.state.departure_port !== "") {
      flight.location_from = {
        latitude: parseFloat(this.state.location_from_latitude),
        longitude: parseFloat(this.state.location_from_longitude),
        name: this.state.departure_port,
      };
    }
    if (this.state.destination_port !== "") {
      flight.location_to = {
        latitude: parseFloat(this.state.location_to_latitude),
        longitude: parseFloat(this.state.location_to_longitude),
        name: this.state.destination_port,
      };
    }
    await fetch(
      `https://one-aviation.herokuapp.com/api/v1/order/sharing?limit=&page=&order_by=&order_key=`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(flight),
      }
    )
      .then(async (res) => {
        const data = await res.json();
        this.setState({ available_flights: data.flights });
        this.changeDate();
        this.props.history.push({
          pathname: "/discover-flights",
          state: this.state,
        });
      })
      .catch((err) => console.log(err));
  }

  async changeDate() {
    for (let flight in this.state.available_flights) {
      let from_date = new Date(
        this.state.available_flights[flight].departure_time
      )
        .toISOString()
        .split("T")[0];
      let from_time = new Date(
        this.state.available_flights[flight].departure_time
      )
        .toISOString()
        .split("T")[1];
      let to_date = new Date(this.state.available_flights[flight].arrival_time)
        .toISOString()
        .split("T")[0];
      let to_time = new Date(this.state.available_flights[flight].arrival_time)
        .toISOString()
        .split("T")[1];
      this.state.available_flights[flight].departure_time = from_time;
      this.state.available_flights[flight].departure_date = from_date;
      this.state.available_flights[flight].arrival_time = to_time;
      this.state.available_flights[flight].arrival_date = to_date;
    }
    console.log("fomatted", this.state.available_flights);
  }

  handleSubmit(e) {
    e.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      this.availableFlights();
    }
  }

  validate = () => {
    let locationError = "";
    let passengerError = "";
    if (this.state.passengers > 8) {
      passengerError = "⚠️ Maximum passengers number is 8";
    }
    if (this.state.departure_port === this.state.destination_port) {
      locationError = "⚠️ Departure and destination ports must be different";
    }
    if (
      this.state.departure_port === "" &&
      this.state.destination_port === ""
    ) {
      locationError = "";
    }
    if (passengerError || locationError) {
      this.setState({ passengerError, locationError });
      return false;
    }
    if (!passengerError && !locationError) {
      passengerError = "";
      locationError = "";
      this.setState({ passengerError, locationError });
      return true;
    }
  };

  alertDisable() {
    setTimeout(() => {
      if (this.state.passengerError !== "") {
        this.setState({ passengerError: "" });
      }
      if (this.state.locationError !== "") {
        this.setState({ locationError: "" });
      }
      if (this.state.passengerError !== "" && this.state.locationError !== "") {
        this.setState({ locationError: "" });
        this.setState({ passengerError: "" });
      }
    }, 3000);
  }

  onDDateChange(date) {
    console.log("not form", date._d);
    let dateformat = new Date(date._d).toISOString();
    let formatted_date = dateformat.split("T")[0];
    var datetime = formatted_date + "T00:00:00Z";
    console.log("departure", datetime);
    this.setState({ date_from: datetime });
  }

  onRDateChange(date) {
    console.log("not form", date._d);
    let dateformat = new Date(date._d).toISOString();
    let formatted_date = dateformat.split("T")[0];
    console.log("date", formatted_date);
    var datetime = formatted_date + "T00:00:00Z";
    console.log("departure", datetime);
    this.setState({ date_to: datetime });
  }

  dateFormat = () => {
    for (var flight in this.state.available_flights.toString()) {
      var arrival = new Date(
        this.state.available_flights[flight].arrival_time[0].toString()
      );
      var arrival_month = arrival.getMonth();
      var arrival_day = arrival.getDay();
      var arrival_date = arrival_day + " " + arrival_month;
      var departure = new Date(
        this.state.available_flights[flight].departure_time[0].toString()
      );
      this.state.available_flights[flight].arrival_time = arrival;
      this.state.available_flights[flight].departure_time = departure;
      console.log("jj", arrival_date);
    }
  };

  render() {
    return (
      <div>
        <Container>
          <Modal
            id="map"
            show={this.state.map_1_show}
            onHide={() => this.setState({ map_1_show: false })}
          >
            <Modal.Header closeButton>
              <Modal.Title>Select the departure point</Modal.Title>
            </Modal.Header>
            <Modal.Body id="map-modal-body">
              <Map1
                google={this.props.google}
                center={{ lat: 44.573355, lng: 12.156921 }}
                height="100px"
                onChange={(e) => this.forceUpdate()}
              />
            </Modal.Body>
            <Modal.Footer>
              <button onClick={() => this.removeFrom()} className="map-btn-1">
                Clear
              </button>
              <button onClick={() => this.changeFrom()} className="map-btn">
                Select
              </button>
            </Modal.Footer>
          </Modal>
          <Modal
            id="map"
            show={this.state.map_2_show}
            onHide={() => this.setState({ map_2_show: false })}
          >
            <Modal.Header closeButton>
              <Modal.Title>Select the destination point</Modal.Title>
            </Modal.Header>
            <Modal.Body id="map-modal-body">
              <Map1
                google={this.props.google}
                center={{ lat: 44.573355, lng: 12.156921 }}
                height="100px"
                onChange={(e) => this.forceUpdate()}
              />
            </Modal.Body>
            <Modal.Footer>
              <button onClick={() => this.removeFrom2()} className="map-btn-1">
                Clear
              </button>
              <button onClick={() => this.changeFrom2()} className="map-btn">
                Select
              </button>
            </Modal.Footer>
          </Modal>
          <Card className="flight-search-card">
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <Row>
                <Col>
                  <Row>
                    <label for="departure">From</label>
                    <input
                      className="flight-input"
                      value={this.state.departure_port}
                      placeholder="Click to select the departure port"
                      id="departure"
                      onClick={() => this.fromClicked()}
                    ></input>
                  </Row>
                </Col>
                <Col md={1} id="from_to_icon_col">
                  <img src={from_to} alt="from_to"></img>
                </Col>
                <Col>
                  <Row>
                    <label for="destination">To</label>
                    <input
                      className="flight-input"
                      placeholder="Click to select the destination port"
                      id="destination"
                      value={this.state.destination_port}
                      onClick={() => this.toClicked()}
                    ></input>
                  </Row>
                </Col>

                <Col md={1} className="btn-col">
                  <button id="search-btn" onClick={(e) => this.handleSubmit(e)}>
                    Search
                  </button>
                </Col>
              </Row>
              <br />
              <Row>
                <Col>
                  <Row>
                    <Col>
                      <label for="passengers" id="date-label">
                        Departure date
                      </label>
                      <DatePicker
                        className="enter-input"
                        placeholder=""
                        onChange={(e) => this.onDDateChange(e)}
                      />
                    </Col>
                    <Col>
                      <label for="passengers" id="date-label">
                        Return date
                      </label>
                      <DatePicker
                        className="enter-input"
                        placeholder=""
                        onChange={(e) => this.onRDateChange(e)}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Row>
                    <label for="passengers">Passengers</label>
                    <input
                      className="flight-input"
                      type="number"
                      placeholder="Enter the number of passengers"
                      id="passengers"
                      maxLength={1}
                      onChange={(e) =>
                        this.setState({ passengers: e.target.value })
                      }
                    ></input>
                  </Row>
                </Col>
                <Col md={1} className="btn-col">
                  <Link to="/create-flight/flight-information">
                    <button id="new-btn">Create new flight</button>
                  </Link>
                </Col>
              </Row>
            </form>
          </Card>
        </Container>
        {this.state.locationError !== "" && this.state.passengerError !== "" ? (
          <Alert
            variant={"danger"}
            onChange={this.alertDisable()}
            className="search-alert"
          >
            <Alert.Heading>❌ You got an error!</Alert.Heading>
            {this.state.locationError}
            {this.state.passengerError}
          </Alert>
        ) : null}
        {this.state.passengerError !== "" ? (
          <Alert
            variant={"danger"}
            onChange={this.alertDisable()}
            className="search-alert"
          >
            <Alert.Heading>❌ You got an error!</Alert.Heading>
            {this.state.passengerError}
          </Alert>
        ) : null}
        {this.state.locationError !== "" ? (
          <Alert
            variant={"danger"}
            onChange={this.alertDisable()}
            className="search-alert"
          >
            <Alert.Heading>❌ You got an error!</Alert.Heading>
            {this.state.locationError}
          </Alert>
        ) : null}
      </div>
    );
  }
}

export default withRouter(FlightSearch);
