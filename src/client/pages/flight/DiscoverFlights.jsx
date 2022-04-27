import React from "react";
import "../../assets/styles/flight/discover-flights.css";
import Loading from "../../components/reused/Loading";
import { Card, Col, Row, Container, Alert, Modal } from "react-bootstrap";
import noFlights from "../../assets/static/flights/no-f.png";
import ticket_plane from "../../assets/static/flights/ticket-plane.svg";
import FlightSearch from "../main/FlightSearch";
import from_to from "../../assets/static/icons/home/from_to.svg";
import Map1 from "../../components/flight/Googlemapsearch";
import { Link, withRouter } from "react-router-dom";
import * as moment from "moment";
import { DatePicker } from "antd";
import { isFriday } from "date-fns/esm";

class DiscoverFlights extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      order_by: "",
      order_key: 1,
      limit: 20,
      page: 1,
      available_flights: this.props.history.location.state.available_flights,
      flight: this.props.history.location.state,
      location_from_latitude: "",
      location_from_longitude: "",
      location_to_latitude: "",
      location_to_longitude: "",
      date_from: this.props.history.location.state.date_from,
      date_to: this.props.history.location.state.date_to,
      passengers: this.props.history.location.state.passengers,
      map_1_show: false,
      map_2_show: false,
      available_ports: {},
      departure_port: this.props.history.location.state.departure_port,
      destination_port: this.props.history.location.state.destination_port,
      locationError: "",
      passengerError: "",
      flexible: false,
    };
  }

  componentDidMount() {
    console.log("ele", this.state);
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 2000);
    return () => clearTimeout(timer);
  }

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
    let flight = {
      flexible: this.state.flexible,
    };
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
        .toDateString()
        .substring(4, 10);
      let from_time = new Date(
        this.state.available_flights[flight].departure_time
      )
        .toLocaleTimeString("en", {
          timeStyle: "short",
          hour12: false,
          timeZone: "UTC",
        })
        .substring(0, 5);
      // let from_time = new Date(
      //   this.state.available_flights[flight].departure_time
      // )
      //   .toISOString()
      //   .split("T")[1];
      let to_date = new Date(this.state.available_flights[flight].arrival_time)
        .toDateString()
        .substring(4, 10);
      // let to_time = new Date(this.state.available_flights[flight].arrival_time)
      //   .toISOString()
      //   .split("T")[1];
      let to_time = new Date(this.state.available_flights[flight].arrival_time)
        .toLocaleTimeString("en", {
          timeStyle: "short",
          hour12: false,
          timeZone: "UTC",
        })
        .substring(0, 5);

      let travel_hr =
        parseInt(to_time.substring(0, 2)) - parseInt(from_time.substring(0, 2));
      if (travel_hr < 0) {
        travel_hr = 24 - -1 * travel_hr;
      }

      let travel_min =
        parseInt(to_time.substring(4, 6)) - parseInt(from_time.substring(4, 6));
      if (travel_min < 0) {
        travel_min = 60 - -1 * travel_min;
      }

      let travel_time = travel_hr.toString() + "h ";
      console.log(travel_hr, travel_min, travel_time);

      this.state.available_flights[flight].departure_time = from_time;
      this.state.available_flights[flight].departure_date = from_date;
      this.state.available_flights[flight].arrival_time = to_time;
      this.state.available_flights[flight].arrival_date = to_date;
      this.state.available_flights[flight].travel_time = travel_time;
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

  async flightInfo(id) {
    await fetch(
      `https://one-aviation.herokuapp.com/api/v1/order/sharing/${id}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then(async (res) => {
        const data = await res.json();
        console.log(data);
        this.setState({ flight_info: data });
        this.changeDate1();
        if (res.ok) {
          console.log("OK");
          this.props.history.push({
            pathname: `/about-flight/${id}`,
            state: this.state.flight_info,
          });
        }
      })
      .catch((err) => console.log(err));
  }

  flexibleFlights = () => {
    if (this.state.flexible === true) {
      this.setState({ flexible: false });
    } else {
      this.setState({ flexible: true });
    }
  };

  async changeDate1() {
    let from_date = new Date(this.state.flight_info.departure_time)
      .toISOString()
      .split("T")[0];
    let from_time = new Date(this.state.flight_info.departure_time)
      .toLocaleTimeString("en", {
        timeStyle: "short",
        hour12: false,
        timeZone: "UTC",
      })
      .substring(0, 5);
    let to_date = new Date(this.state.flight_info.arrival_time)
      .toISOString()
      .split("T")[0];
    let to_time = new Date(this.state.flight_info.arrival_time)
      .toLocaleTimeString("en", {
        timeStyle: "short",
        hour12: false,
        timeZone: "UTC",
      })
      .substring(0, 5);
    this.state.flight_info.departure_time = from_time;
    this.state.flight_info.departure_date = from_date;
    this.state.flight_info.arrival_time = to_time;
    this.state.flight_info.arrival_date = to_date;
    console.log("fomatted", this.state.flight_info);
  }

  render() {
    return (
      <div className="discover-flights">
        {this.state.isLoading ? (
          <Loading />
        ) : (
          <div className="flights">
            <div id="banner-flights">
              <Row>
                <Col md={3} style={{ textAlign: "left" }}>
                  {this.state.flight.departure_port ? (
                    <h1 className="h-banner">
                      {this.state.flight.departure_port}
                    </h1>
                  ) : (
                    <h1 className="h-banner">Any</h1>
                  )}
                </Col>
                <Col md={6} id="flight-way" style={{ textAlign: "center" }}>
                  <img src={ticket_plane} alt="ticket-plane" id="plane" />
                </Col>
                <Col md={3} style={{ textAlign: "right" }}>
                  {this.state.flight.destination_port ? (
                    <h1 className="h-banner">
                      {this.state.flight.destination_port}
                    </h1>
                  ) : (
                    <h1 className="h-banner">Any</h1>
                  )}
                </Col>
              </Row>
            </div>
            <Container id="tickets">
              <Row>
                <Col md={3}>
                  <Modal
                    id="map"
                    show={this.state.map_1_show}
                    onHide={() => this.setState({ map_1_show: false })}
                  >
                    <Modal.Header closeButton>
                      <Modal.Title>Select the departure port</Modal.Title>
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
                      <button
                        onClick={() => this.removeFrom()}
                        className="map-btn-1"
                      >
                        Clear
                      </button>
                      <button
                        onClick={() => this.changeFrom()}
                        className="map-btn"
                      >
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
                      <Modal.Title>Select the destination port</Modal.Title>
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
                      <button
                        onClick={() => this.removeFrom2()}
                        className="map-btn-1"
                      >
                        Clear
                      </button>
                      <button
                        onClick={() => this.changeFrom2()}
                        className="map-btn"
                      >
                        Select
                      </button>
                    </Modal.Footer>
                  </Modal>
                  <Card id="searching-flights">
                    <div style={{ width: "100%", textAlign: "center" }}>
                      <h2>Flight Search</h2>
                    </div>
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                      <label for="departure">Departure port</label>
                      <input
                        className="flight-input"
                        value={this.state.departure_port}
                        placeholder="Click to select location"
                        id="departure"
                        onClick={() => this.fromClicked()}
                      ></input>
                      <label for="destination">Destination port</label>
                      <input
                        className="flight-input"
                        id="destination"
                        placeholder="Click to select location"
                        value={this.state.destination_port}
                        onClick={() => this.toClicked()}
                      ></input>
                      <label for="passengers">Departure date</label>
                      <DatePicker
                        className="enter-input"
                        placeholder=""
                        onChange={(e) => this.onDDateChange(e)}
                        value={this.state.from_date}
                      />
                      <label for="passengers">Return date</label>
                      <DatePicker
                        className="enter-input"
                        placeholder=""
                        onChange={(e) => this.onRDateChange(e)}
                        value={this.state.to_date}
                      />

                      <label for="passengers">Passengers</label>
                      <input
                        className="flight-input"
                        value={this.state.passengers}
                        type="number"
                        placeholder="Enter the number of passengers"
                        id="passengers"
                        onChange={(e) =>
                          this.setState({
                            passengers: e.target.value,
                          })
                        }
                      ></input>
                      <input
                        style={{ marginTop: "5px" }}
                        className="flex-input"
                        type="checkbox"
                        onChange={() => this.flexibleFlights(this)}
                      ></input>
                      <label
                        for="passengers"
                        style={{
                          marginLeft: "10px",
                          padding: "0px",
                        }}
                      >
                        +/- 5 days
                      </label>
                      <div style={{ height: "50px" }} />
                      <div style={{ width: "100%", textAlign: "center" }}>
                        <button
                          id="search-btn"
                          onClick={(e) => this.handleSubmit(e)}
                        >
                          Search
                        </button>
                      </div>
                    </form>
                    {this.state.locationError !== "" &&
                    this.state.passengerError !== "" ? (
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
                  </Card>
                </Col>

                <Col id="tickets-col">
                  {this.state.available_flights === null ? (
                    <div id="no-flights-div">
                      <img
                        src={noFlights}
                        id="no-flights-img"
                        alt="no-flights-img"
                      ></img>
                    </div>
                  ) : (
                    <div>
                      {this.state.available_flights?.map((flight) => (
                        <Card className="ticket">
                          <Row>
                            <Col md="10">
                              <Row>
                                <Col
                                  md="3"
                                  id="from"
                                  style={{ textAlign: "center" }}
                                >
                                  <h3>{flight.departure_date}</h3>
                                </Col>
                                <Col md="6" style={{ textAlign: "center" }}>
                                  <p id="time">{flight.travel_time}</p>
                                </Col>
                                <Col md="3" style={{ textAlign: "center" }}>
                                  <h3>{flight.arrival_date}</h3>
                                </Col>
                              </Row>
                              <Row>
                                <Col
                                  md="3"
                                  id="from"
                                  style={{ textAlign: "center" }}
                                >
                                  <h4>{flight.from.name}</h4>
                                </Col>
                                <Col md="6">
                                  <img src={ticket_plane} alt="ticket-plane" />
                                </Col>
                                <Col md="3" style={{ textAlign: "center" }}>
                                  <h4>{flight.to.name}</h4>
                                </Col>
                              </Row>
                              <Row>
                                <Col
                                  md="3"
                                  id="from"
                                  style={{ textAlign: "center" }}
                                >
                                  <p>{flight.departure_time}</p>
                                </Col>
                                <Col md="6" style={{ textAlign: "center" }}>
                                  <p id="way">Direct</p>
                                </Col>
                                <Col md="3" style={{ textAlign: "center" }}>
                                  <p>{flight.arrival_time}</p>
                                </Col>
                              </Row>
                            </Col>
                            <Col md="2" id="price">
                              {/* <div style={{ height: "20%" }} /> */}
                              <button
                                id="nav-btn"
                                onClick={() => this.flightInfo(flight.id)}
                              >
                                <p id="cost">€ {parseInt(flight.price)}</p>
                              </button>
                            </Col>
                          </Row>
                        </Card>
                      ))}
                    </div>
                  )}
                </Col>
              </Row>
            </Container>
          </div>
        )}
      </div>
    );
  }
}

export default DiscoverFlights;
