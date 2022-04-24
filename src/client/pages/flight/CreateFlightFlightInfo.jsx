import React from "react";
import { Card, Col, Row, Container, Modal } from "react-bootstrap";
import "../../assets/styles/flight/create-flight.css";
import Loading from "../../components/reused/Loading";
import Map from "../../components/flight/Googlemap";
import CustomMap from "../../components/flight/Map_1";
import "react-nice-dates/build/style.css";
import { TimePicker } from "antd";
import "antd/dist/antd.css";
import { DatePicker } from "antd";

class CreateFlightFlightInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      Ropen: false,
      Dopen: false,
      departure_latitude: localStorage.getItem("from_lat"),
      departure_longitude: localStorage.getItem("from_long"),
      destination_latitude: localStorage.getItem("to_lat"),
      destination_longitude: localStorage.getItem("to_long"),
      shareable: false,
      departure_time: "",
      return_time: "",
      departure_date: "",
      formatted_d_date: "",
      formatted_r_date: "",
      formatted_d_time: "",
      formatted_r_time: "",
      return_date: "",
      map_show: false,
      map_show_1: false,
      custom_map_show: false,
      location_dir: "from",
      passengers: "",
      departure_port: localStorage.getItem("departure_port"),
      destination_port: localStorage.getItem("destination_port"),
      departureError: "",
      destinationError: "",
      passengerError: "",
      ddateError: "",
      rdateError: "",
      dtimeError: "",
      rtimeError: "",
    };
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
  }

  componentDidMount() {
    console.log(localStorage);
    window.scrollTo(0, 0);
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

  handleDOpenChange = (Dopen) => {
    this.setState({ Dopen });
  };

  handleROpenChange = (Ropen) => {
    this.setState({ Ropen });
  };

  handleDClose = () => this.setState({ Dopen: false });

  handleRClose = () => this.setState({ Ropen: false });

  dirFrom() {
    this.setState({ map_show: true });
    localStorage.setItem("location_dir", "from");
  }

  selectedFrom() {
    this.setState({ departure_latitude: localStorage.getItem("from_lat") });
    this.setState({ departure_longitude: localStorage.getItem("from_long") });
    this.setState({ departure_port: localStorage.getItem("departure_port") });
    this.setState({ map_show: false });
  }

  dirTo() {
    this.setState({ map_show_1: true });
    localStorage.setItem("location_dir", "to");
  }

  selectedTo() {
    this.setState({ destination_latitude: localStorage.getItem("to_lat") });
    this.setState({ destination_longitude: localStorage.getItem("to_long") });
    this.setState({
      destination_port: localStorage.getItem("destination_port"),
    });
    this.setState({ map_show_1: false });
  }

  onDDateChange(date) {
    console.log("not form", date._d);
    let dateformat = new Date(date._d).toISOString();
    let formatted_date = dateformat.split("T")[0];
    console.log("date", formatted_date);
    this.setState({ formatted_d_date: formatted_date });
    if (this.state.formatted_d_time !== "") {
      var datetime = formatted_date + "T" + this.state.formatted_d_time + "Z";
      console.log("time", datetime);
      this.setState({ departure_date: datetime });
      console.log("departure", this.state.departure_date);
    } else {
      this.setState({ formatted_d_date: formatted_date });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      this.openContactInfo();
    }
  }

  validate = () => {
    let departureError = "";
    let destinationError = "";
    let passengerError = "";
    let ddateError = "";
    let rdateError = "";
    let dtimeError = "";
    let rtimeError = "";
    if (this.state.passengers === "") {
      passengerError = "⚠️ Passengers field needs to be filled in";
    } else {
      if (this.state.passengers > 8) {
        passengerError = "⚠️ Maximum passengers number is 8";
      }
    }
    if (this.state.departure_port === "") {
      departureError = "⚠️ Departure port cannot be empty";
    } else {
      departureError = "";
    }
    if (this.state.destination_port === "") {
      destinationError = "⚠️ Destination port cannot be empty";
    } else {
      destinationError = "";
    }
    if (this.state.departure_port === this.state.destination_port) {
      departureError = "⚠️ Departure and destination ports must be different";
    } else {
      departureError = "";
    }
    if (this.state.formatted_d_date === "") {
      ddateError = "⚠️ Departure date cannot be empty";
    } else {
      ddateError = "";
    }
    if (this.state.formatted_r_date === "") {
      rdateError = "⚠️ Return date cannot be empty";
    } else {
      rdateError = "";
    }
    if (this.state.formatted_d_time === "") {
      dtimeError = "⚠️ Departure time cannot be empty";
    } else {
      dtimeError = "";
    }
    if (this.state.formatted_r_time === "") {
      rtimeError = "⚠️ Return time cannot be empty";
    } else {
      rtimeError = "";
    }
    if (
      passengerError ||
      departureError ||
      destinationError ||
      ddateError ||
      rdateError ||
      dtimeError ||
      rtimeError
    ) {
      this.setState({
        passengerError,
        destinationError,
        departureError,
        ddateError,
        rdateError,
        dtimeError,
        rtimeError,
      });
      return false;
    }
    if (
      !passengerError &&
      !departureError &&
      !destinationError &&
      !ddateError &&
      !rdateError &&
      !dtimeError &&
      !rtimeError
    ) {
      passengerError = "";
      departureError = "";
      destinationError = "";
      ddateError = "";
      rdateError = "";
      dtimeError = "";
      rtimeError = "";
      this.setState({
        passengerError,
        destinationError,
        departureError,
        ddateError,
        rdateError,
        dtimeError,
        rtimeError,
      });
      return true;
    }
  };

  onRDateChange(date) {
    console.log("not form", date._d);
    let dateformat = new Date(date._d).toISOString();
    let formatted_date = dateformat.split("T")[0];
    console.log("date", formatted_date);
    this.setState({ formatted_r_date: formatted_date });
    if (this.state.formatted_r_time !== "") {
      var datetime = formatted_date + "T" + this.state.formatted_r_time + "Z";
      console.log("time", datetime);
      this.setState({ return_date: datetime });
      console.log("return", this.state.return_date);
    } else {
      this.setState({ formatted_r_date: formatted_date });
    }
  }

  customDirFrom() {
    this.setState({ custom_map_show: true });
    localStorage.setItem("location_dir", "from");
  }

  customDirTo() {
    this.setState({ custom_map_show: true });
    localStorage.setItem("location_dir", "to");
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

  openContactInfo() {
    this.props.history.push({
      pathname: "/create-flight/contact-information",
      state: this.state,
    });
  }

  departureTimeSetting = (time) => {
    var t = new Date(time._d);
    var hr = t.getHours();
    hr = ("0" + hr).slice(-2);
    var min = t.getMinutes();
    min = ("0" + min).slice(-2);
    var formatted_time = hr + ":" + min + ":00";
    this.setState({ formatted_d_time: formatted_time });
    if (this.state.formatted_d_date !== "") {
      var datetime = this.state.formatted_d_date + "T" + formatted_time + "Z";
      console.log("time", datetime);
      this.setState({ departure_date: datetime });
    } else {
      this.setState({ formatted_d_time: formatted_time });
    }
    console.log("departure", this.state.departure_date);
  };

  returnTimeSetting = (time) => {
    var t = new Date(time._d);
    console.log(this.state.formatted_r_date);
    var hr = t.getHours();
    hr = ("0" + hr).slice(-2);
    var min = t.getMinutes();
    min = ("0" + min).slice(-2);
    var formatted_time = hr + ":" + min + ":00";
    this.setState({ formatted_r_time: formatted_time });
    if (this.state.formatted_r_date !== "") {
      var datetime = this.state.formatted_r_date + "T" + formatted_time + "Z";
      console.log("time", datetime);
      this.setState({ return_date: datetime });
    } else {
      this.setState({ formatted_r_time: formatted_time });
    }
    console.log("return", this.state.return_date);
  };

  goBack() {
    this.setState({ map_show: false });
    this.forceUpdateHandler();
  }

  forceUpdateHandler() {
    this.forceUpdate();
  }

  render() {
    return (
      <div className="flight">
        {this.state.isLoading ? (
          <Loading />
        ) : (
          <div className="create-flight">
            <Container>
              <h1>New flight</h1>
              <Card id="flightInfo">
                <Modal
                  id="map"
                  show={this.state.map_show}
                  onHide={() => this.setState({ map_show: false })}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Select the departure point</Modal.Title>
                  </Modal.Header>
                  <Modal.Body id="map-modal-body">
                    <Map
                      google={this.props.google}
                      center={{ lat: 44.573355, lng: 12.156921 }}
                      height="100px"
                      onChange={(e) => this.forceUpdate()}
                      loc_dir={this.state.location_dir}
                    />
                  </Modal.Body>
                  <Modal.Footer>
                    <button
                      onClick={() => this.selectedFrom()}
                      className="map-btn"
                    >
                      Select
                    </button>
                  </Modal.Footer>
                </Modal>
                <Modal
                  id="map"
                  show={this.state.map_show_1}
                  onHide={() => this.setState({ map_show_1: false })}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Select the destination point</Modal.Title>
                  </Modal.Header>
                  <Modal.Body id="map-modal-body">
                    <Map
                      google={this.props.google}
                      center={{ lat: 44.573355, lng: 12.156921 }}
                      height="100px"
                      onChange={(e) => this.forceUpdate()}
                      loc_dir={this.state.location_dir}
                    />
                  </Modal.Body>
                  <Modal.Footer>
                    <button
                      onClick={() => this.selectedTo()}
                      className="map-btn"
                    >
                      Select
                    </button>
                  </Modal.Footer>
                </Modal>
                <div>
                  <h2 id="title-h">Flight information</h2>
                  <Row>
                    <Row>
                      <Col>
                        <label htmlFor="email">Location *</label>
                      </Col>
                    </Row>
                    <Col>
                      <input
                        className="enter-input"
                        id="email"
                        placeholder="Departure port"
                        value={this.state.departure_port}
                        onClick={() => this.dirFrom()}
                      ></input>
                      <div className="form-errors">
                        {this.state.departureError}
                      </div>
                    </Col>
                    <Col>
                      <input
                        className="enter-input"
                        id="email"
                        placeholder="Destination port"
                        value={this.state.destination_port}
                        onClick={() => this.dirTo()}
                      ></input>
                      <div className="form-errors">
                        {this.state.destinationError}
                      </div>
                    </Col>
                  </Row>
                  <label htmlFor="email">Date *</label>

                  <Row>
                    <Col>
                      <br />
                      <DatePicker
                        className="enter-input"
                        placeholder="Departure date"
                        onChange={(e) => this.onDDateChange(e)}
                      />
                      <div className="form-errors">{this.state.ddateError}</div>
                    </Col>
                    <Col>
                      <br />
                      <DatePicker
                        className="enter-input"
                        placeholder="Return date"
                        onChange={(e) => this.onRDateChange(e)}
                      />
                      <div className="form-errors">{this.state.rdateError}</div>
                    </Col>
                  </Row>
                  <br />
                  <label htmlFor="password">Time *</label>
                  <br />
                  <br />
                  <Row>
                    <Col>
                      <TimePicker
                        className="enter-input"
                        placeholder="Departure time"
                        open={this.state.Dopen}
                        onOpenChange={(e) => this.handleDOpenChange(e)}
                        format={"HH:mm"}
                        onOk={(time) => {
                          this.departureTimeSetting(time);
                        }}
                      />
                      <div className="form-errors">{this.state.dtimeError}</div>
                    </Col>
                    <Col>
                      <TimePicker
                        className="enter-input"
                        open={this.state.Ropen}
                        placeholder="Return time"
                        onOpenChange={(e) => this.handleROpenChange(e)}
                        format={"HH:mm"}
                        onOk={(time) => {
                          this.returnTimeSetting(time);
                        }}
                      />
                      <div className="form-errors">{this.state.rtimeError}</div>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col>
                      <label htmlFor="passengers">Number of passenger *</label>
                      <input
                        className="enter-input"
                        type="number"
                        id="passengers"
                        onChange={(e) =>
                          this.setState({ passengers: e.target.value })
                        }
                      ></input>
                      <div className="form-errors">
                        {this.state.passengerError}
                      </div>
                    </Col>
                    <Col></Col>
                  </Row>
                  <label htmlFor="email">Make this flight shareable?</label>
                  <input
                    className="checkbox-input"
                    type="checkbox"
                    id="email"
                    placeholder="Latitude"
                    onChange={(e) => this.setState({ shareable: true })}
                  ></input>
                  <br />
                  <button
                    className="enter-btn"
                    onClick={(e) => this.handleSubmit(e)}
                  >
                    Continue
                  </button>
                </div>
              </Card>
            </Container>
          </div>
        )}
      </div>
    );
  }
}

export default CreateFlightFlightInfo;
