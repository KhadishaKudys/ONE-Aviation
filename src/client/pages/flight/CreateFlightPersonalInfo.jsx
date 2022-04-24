import React from "react";
import { Card, Col, Row, Container, Modal, Form, Alert } from "react-bootstrap";
import "../../assets/styles/flight/create-flight.css";
import Loading from "../../components/reused/Loading";
import { Link } from "react-router-dom";
import { Breadcrumb } from "antd";

class CreateFlightPersonalInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      order_id: "",
      promocode: "",
      show_login: false,
      passengers: [
        {
          first_name: "",
          middle_name: "",
          last_name: "",
          document: "",
          document_type: "",
        },
        {
          first_name: "",
          middle_name: "",
          last_name: "",
          document: "",
          document_type: "",
        },
      ],
      first_name: "",
      middle_name: "",
      last_name: "",
      document: "",
      document_type: "",
      direction: "",
      first_name_1: "",
      middle_name_1: "",
      last_name_1: "",
      document_1: "",
      document_type_1: "",
      direction_1: "",
      flight: this.props.history.location.state,
      documentError: "",
      nameError: "",
      surnameError: "",
      show_alert: false,
      checked: false,
      validPromo: null,
      price: "",
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 2000);
    return () => clearTimeout(timer);
  }

  openPayment() {
    this.newFlight();
    this.props.history.push({
      pathname: "/create-flight/additional-services",
      state: this.state,
    });
  }

  allPassengers() {
    for (var i = 0; i < 3; i++) {
      <div className="passengers-info">
        <Row id="passenger">
          <Col>
            <h4>Passenger #1</h4>
          </Col>
        </Row>
        <Row>
          <Col md="5">
            <label for="email">First name</label>
            <input
              className="enter-input"
              id="email"
              onChange={(e) => this.setState({ first_name: e.target.value })}
            ></input>
            <label for="password">Middle name</label>
            <input
              className="enter-input"
              id="password"
              onChange={(e) => this.setState({ middle_name: e.target.value })}
            ></input>
            <label for="email">Last name</label>
            <input
              className="enter-input"
              id="email"
              onChange={(e) => this.setState({ last_name: e.target.value })}
            ></input>
          </Col>
          <Col md="2"></Col>

          <Col md="5">
            <label for="password">Document</label>
            <br />
            <select
              onChange={(e) => this.setState({ document_type: e.target.value })}
            >
              <option value="passport">Passport</option>
              <option value="id">ID</option>
            </select>
            <br />
            <br />
            <label for="password">Document number</label>
            <input
              className="enter-input"
              id="password"
              onChange={(e) => this.setState({ document: e.target.value })}
            ></input>
            <br />
            <br />
            <label for="password">Direction</label>
            <br />
            <select
              onChange={(e) => this.setState({ direction: e.target.value })}
            >
              <option value="FORWARD">FORWARD</option>
              <option value="BACKWARD">BACKWARD</option>
              <option value="FULL">FULL</option>
            </select>
          </Col>
        </Row>
      </div>;
    }
  }

  async upd() {
    this.componentDidMount();
  }

  async newFlight() {
    const flight = {
      email: this.state.flight.email,
      document: {
        number: this.state.document,
        type: this.state.document_type,
      },
      passengers: [
        {
          direction: this.state.direction,
          document: {
            number: this.state.document,
            type: this.state.document_type,
          },
          first_name: this.state.first_name,
          middle_name: this.state.middle_name,
          last_name: this.state.last_name,
          phone_number: this.state.flight.phone_number,
          email: this.state.flight.email,
        },
      ],
      phone_number: this.state.flight.phone_number,
      from: {
        name: this.state.flight.flight_info.departure_port,
        latitude: parseFloat(this.state.flight.flight_info.departure_latitude),
        longitude: parseFloat(
          this.state.flight.flight_info.departure_longitude
        ),
      },
      to: {
        name: this.state.flight.flight_info.destination_port,
        latitude: parseFloat(
          this.state.flight.flight_info.destination_latitude
        ),
        longitude: parseFloat(
          this.state.flight.flight_info.destination_longitude
        ),
      },
      departure_time: this.state.flight.flight_info.departure_date,
      return_time: this.state.flight.flight_info.return_date,
      shareable: this.state.flight.flight_info.shareable,
    };

    if (this.state.validPromo === true) {
      flight.promocode = this.state.promocode;
    }

    console.log(flight);
    const token = sessionStorage.getItem("access_token");
    await fetch("https://one-aviation.herokuapp.com/api/v1/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(flight),
    })
      .then(async (res) => {
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          this.setState({ order_id: data.id });
          this.setState({ price: data.price });
          this.props.history.push({
            pathname: "/create-flight/payment",
            state: this.state,
          });
          this.handleClose();
        } else {
          this.setState({ show_alert: true });
        }
      })
      .catch((err) => console.log(err));
  }

  verifyFlight = () => {
    this.setState({
      show_login: true,
    });
  };

  handleClose = () => {
    this.setState({
      show_login: false,
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      this.setState({ show_login: true });
    }
  }

  validate = () => {
    let documentError = "";
    let nameError = "";
    let surnameError = "";
    var reg = /^[a-z]+$/i;
    var reg2 = /^\d+$/;
    if (this.state.document === "") {
      documentError = "⚠️ Document number cannot be empty";
    } else {
      if (!reg2.test(this.state.document)) {
        documentError = "⚠️ Invalid document number";
      }
    }
    if (this.state.first_name === "") {
      nameError = "⚠️ First name cannot be empty";
    } else {
      if (!reg.test(this.state.first_name)) {
        nameError = "⚠️ First name must consist of only letters";
      }
    }
    if (this.state.last_name === "") {
      surnameError = "⚠️ Last name cannot be empty";
    } else {
      if (!reg.test(this.state.last_name)) {
        surnameError = "⚠️ Last name must consist of only letters";
      }
    }
    if (documentError || nameError || surnameError) {
      this.setState({ documentError, nameError, surnameError });
      return false;
    }
    if (!documentError && !nameError && !surnameError) {
      documentError = "";
      nameError = "";
      surnameError = "";
      this.setState({ documentError, nameError, surnameError });
      return true;
    }
  };

  async validPromoCheck(promocode) {
    await fetch(
      `https://one-aviation.herokuapp.com/api/v1/promocode/validate/${promocode}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then(async (res) => {
        this.setState({ checked: true });
        if (res.ok) {
          this.setState({ validPromo: true });
        } else {
          this.setState({ validPromo: false });
        }
      })
      .catch((err) => console.log(err));
  }

  alertDisable() {
    setTimeout(() => {
      this.setState({
        show_alert: false,
      });
    }, 3000);
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
              <Breadcrumb>
                <Breadcrumb.Item>
                  <a href="/create-flight/flight-information">
                    Flight Information
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <a href="/create-flight/contact-information">
                    Contact Information
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Personal Information</Breadcrumb.Item>
              </Breadcrumb>
              <br />
              <Card>
                <h2 id="title-h">Personal information</h2>
                <div className="passengers-info">
                  <Row id="passenger">
                    <Col>
                      <h4>Passenger #1</h4>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="5">
                      <label for="email">First name *</label>
                      <input
                        className="enter-input"
                        id="email"
                        onChange={(e) =>
                          this.setState({ first_name: e.target.value })
                        }
                      ></input>
                      <div className="form-errors">{this.state.nameError}</div>
                      <label for="password">Middle name</label>
                      <input
                        className="enter-input"
                        id="password"
                        onChange={(e) =>
                          this.setState({ middle_name: e.target.value })
                        }
                      ></input>
                      <label for="email">Last name *</label>
                      <input
                        className="enter-input"
                        id="email"
                        onChange={(e) =>
                          this.setState({ last_name: e.target.value })
                        }
                      ></input>
                      <div className="form-errors">
                        {this.state.surnameError}
                      </div>
                    </Col>
                    <Col md="2"></Col>

                    <Col md="5">
                      <label for="password">Document *</label>
                      <div style={{ height: "24px" }} />
                      <select
                        onChange={(e) =>
                          this.setState({ document_type: e.target.value })
                        }
                      >
                        <option value="passport">Passport</option>
                        <option value="id">ID</option>
                      </select>
                      <br />

                      <label for="password">Document number *</label>
                      <input
                        className="enter-input"
                        id="password"
                        onChange={(e) =>
                          this.setState({ document: e.target.value })
                        }
                      ></input>
                      <div className="form-errors">
                        {this.state.documentError}
                      </div>
                      <label for="password">Direction *</label>
                      <div style={{ height: "24px" }} />
                      <select
                        onChange={(e) =>
                          this.setState({ direction: e.target.value })
                        }
                      >
                        <option value="FORWARD">Forward</option>
                        <option value="BACKWARD">Backward</option>
                        <option value="FULL">Full</option>
                      </select>
                    </Col>
                  </Row>
                </div>
                <button
                  className="enter-btn"
                  onClick={(e) => this.handleSubmit(e)}
                >
                  Continue
                </button>
              </Card>
              {this.state.show_login ? (
                <Card id="flight-verify-card">
                  <h2>Flight Verification</h2>
                  <p>
                    Please, enter promocode if you have it and verify your
                    flight.
                  </p>
                  <Row>
                    <Col>
                      <label for="password">Promocode</label>
                      <input
                        className="enter-input"
                        id="password"
                        onChange={(e) =>
                          this.setState({ promocode: e.target.value })
                        }
                      ></input>
                    </Col>
                    <Col>
                      <button
                        className="check-btn"
                        onClick={() =>
                          this.validPromoCheck(this.state.promocode)
                        }
                      >
                        Check
                      </button>
                    </Col>
                  </Row>
                  {this.state.checked ? (
                    <div>
                      {this.state.validPromo ? (
                        <p style={{ color: "green" }}>✅ Valid</p>
                      ) : (
                        <p style={{ color: "red" }}>❌ Not valid</p>
                      )}
                    </div>
                  ) : null}
                  <div>
                    {this.state.show_alert ? (
                      <Link to="/">
                        <button className="enter-btn">
                          Return to home page
                        </button>
                      </Link>
                    ) : (
                      <button
                        className="enter-btn"
                        onClick={() => this.newFlight()}
                      >
                        Create new flight
                      </button>
                    )}
                  </div>
                </Card>
              ) : null}
            </Container>
          </div>
        )}
        {this.state.show_alert === true ? (
          <Alert variant={"danger"} onChange={this.alertDisable()}>
            <Alert.Heading>❌ You got an error!</Alert.Heading>
            This flight can't be created!
          </Alert>
        ) : null}
      </div>
    );
  }
}

export default CreateFlightPersonalInfo;
