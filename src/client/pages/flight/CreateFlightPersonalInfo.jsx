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
      token: sessionStorage.getItem("access_token"),
      listOfPass: null,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.iterateNumber();
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

  async upd() {
    this.componentDidMount();
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
    sessionStorage.setItem("create_shareable", false);
    sessionStorage.setItem("create_email", "");
    sessionStorage.setItem("create_phone", "");
    sessionStorage.setItem("create_trip", "one");
    sessionStorage.setItem("create_shareable", false);
  };

  async newFlight() {
    var fetch_header = {};
    if (this.state.token === null) {
      fetch_header = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
    } else {
      fetch_header = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.state.token,
      };
    }
    const flight = {
      email: sessionStorage.getItem("create_email"),
      document: {
        number: sessionStorage.getItem("create_doc_num"),
        type: sessionStorage.getItem("create_doc"),
      },
      passengers: [
        {
          direction: sessionStorage.getItem("create_dir"),
          document: {
            number: sessionStorage.getItem("create_doc_num"),
            type: sessionStorage.getItem("create_doc"),
          },
          first_name: sessionStorage.getItem("create_name"),
          middle_name: this.state.middle_name,
          last_name: sessionStorage.getItem("create_surname"),
          phone_number: sessionStorage.getItem("create_phone"),
          email: sessionStorage.getItem("create_email"),
        },
      ],
      phone_number: sessionStorage.getItem("create_phone"),
      from: {
        name: sessionStorage.getItem("create_dep_port"),
        latitude: parseFloat(localStorage.getItem("from_lat")),
        longitude: parseFloat(localStorage.getItem("from_long")),
      },
      to: {
        name: sessionStorage.getItem("create_des_port"),
        latitude: parseFloat(localStorage.getItem("to_lat")),
        longitude: parseFloat(localStorage.getItem("from_long")),
      },
      departure_time: sessionStorage.getItem("create_dep_dt"),
      shareable: JSON.parse(sessionStorage.getItem("create_shareable")),
    };

    if (sessionStorage.getItem("create_trip") === "round") {
      flight.return_time = sessionStorage.getItem("create_des_dt");
    }

    if (this.state.validPromo === true) {
      flight.promocode = sessionStorage.getItem("create_promo");
    }

    console.log(flight);
    await fetch("https://one-aviation.herokuapp.com/api/v1/order", {
      method: "POST",
      headers: fetch_header,
      body: JSON.stringify(flight),
    })
      .then(async (res) => {
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          this.setValues();
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

  iterateNumber = () => {
    console.log(sessionStorage);
    let listOfPass = [];
    for (
      let i = 1;
      i === parseInt(sessionStorage.getItem("create_pass"));
      i++
    ) {
      listOfPass.push(i);
    }
    this.setState({ listOfPass: listOfPass });
    console.log(listOfPass);
  };

  validate = () => {
    let documentError = "";
    let nameError = "";
    let surnameError = "";
    var reg = /^[a-z]+$/i;
    if (sessionStorage.getItem("create_doc_num") === "") {
      documentError = "⚠️ Document number cannot be empty";
    }
    if (sessionStorage.getItem("create_name") === "") {
      nameError = "⚠️ First name cannot be empty";
    } else {
      if (!reg.test(sessionStorage.getItem("create_name"))) {
        nameError = "⚠️ First name must consist of only letters";
      }
    }
    if (sessionStorage.getItem("create_surname") === "") {
      surnameError = "⚠️ Last name cannot be empty";
    } else {
      if (!reg.test(sessionStorage.getItem("create_surname"))) {
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
                      <label for="email" value={sessionStorage.getItem}>
                        First name *
                      </label>
                      <input
                        value={sessionStorage.getItem("create_name")}
                        className="enter-input"
                        id="email"
                        onChange={(e) => {
                          sessionStorage.setItem("create_name", e.target.value);
                          this.setState({ first_name: e.target.value });
                        }}
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
                        value={sessionStorage.getItem("create_surname")}
                        className="enter-input"
                        id="email"
                        onChange={(e) => {
                          sessionStorage.setItem(
                            "create_surname",
                            e.target.value
                          );
                          this.setState({ last_name: e.target.value });
                        }}
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
                        onChange={(e) => {
                          sessionStorage.setItem("create_doc", e.target.value);
                          this.setState({ document_type: e.target.value });
                        }}
                        value={sessionStorage.getItem("create_doc")}
                      >
                        <option value="passport">Passport</option>
                        <option value="id">ID</option>
                      </select>
                      <br />

                      <label for="password">Document number *</label>
                      <input
                        value={sessionStorage.getItem("create_doc_num")}
                        className="enter-input"
                        id="password"
                        onChange={(e) => {
                          sessionStorage.setItem(
                            "create_doc_num",
                            e.target.value
                          );
                          this.setState({ document: e.target.value });
                        }}
                      ></input>
                      <div className="form-errors">
                        {this.state.documentError}
                      </div>
                      <label for="password">Direction *</label>
                      <div style={{ height: "24px" }} />
                      <select
                        value={sessionStorage.getItem("create_dir")}
                        onChange={(e) => {
                          sessionStorage.setItem("create_dir", e.target.value);
                          this.setState({ direction: e.target.value });
                        }}
                      >
                        <option value="FORWARD">
                          {sessionStorage.getItem("create_dep_port")} →{" "}
                          {sessionStorage.getItem("create_des_port")}
                        </option>
                        {sessionStorage.getItem("create_trip") === "round" ? (
                          <option value="BACKWARD">
                            {sessionStorage.getItem("create_des_port")} →{" "}
                            {sessionStorage.getItem("create_dep_port")}
                          </option>
                        ) : null}
                        {sessionStorage.getItem("create_trip") === "round" ? (
                          <option value="FULL">Round-trip</option>
                        ) : null}
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
                        onChange={(e) => {
                          sessionStorage.setItem(
                            "create_promo",
                            e.target.value
                          );
                          this.setState({ promocode: e.target.value });
                        }}
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
