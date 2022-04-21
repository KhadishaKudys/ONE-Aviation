import React from "react";
import { Card, Col, Row, Container, Modal, Form } from "react-bootstrap";
import "../../assets/styles/flight/create-flight.css";
import Loading from "../../components/reused/Loading";
import { Breadcrumb } from "antd";

class CreateFlightPersonalInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      order_id: "",
      promocode: "DISCOUNTFORSTUDENTS2022",
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
      departure_time: this.state.flight.flight_info.departure_time,
      return_time: this.state.flight.flight_info.return_time,
      shareable: this.state.flight.flight_info.shareable,
      promocode: this.state.promocode,
    };

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
          this.setState({ order_id: data.order_id });
          this.props.history.push({
            pathname: "/create-flight/payment",
            state: this.state,
          });
          this.handleClose();
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
                      <h5>Passenger #1</h5>
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
                    </Col>
                    <Col md="2"></Col>

                    <Col md="5">
                      <label for="password">Document *</label>
                      <br />
                      <br />
                      <select
                        onChange={(e) =>
                          this.setState({ document_type: e.target.value })
                        }
                      >
                        <option selected disabled>
                          Select document type
                        </option>
                        <option value="passport">Passport</option>
                        <option value="id">ID</option>
                      </select>
                      <br />
                      <br />
                      {/* <input className="enter-input" id="password" onChange={e => this.setState({email: e.target.value})}></input> */}
                      <label for="password">Document number *</label>
                      <input
                        className="enter-input"
                        id="password"
                        onChange={(e) =>
                          this.setState({ document: e.target.value })
                        }
                      ></input>
                      <label for="password">Direction *</label>
                      <br />
                      <br />
                      <select
                        onChange={(e) =>
                          this.setState({ direction: e.target.value })
                        }
                      >
                        <option selected disabled>
                          Select flight direction
                        </option>
                        <option value="FORWARD">Forward</option>
                        <option value="BACKWARD">Backward</option>
                        <option value="FULL">Full</option>
                      </select>
                      <br />
                      <br />
                    </Col>
                  </Row>
                </div>
                <br />
                <button className="enter-btn" onClick={() => this.newFlight()}>
                  Create new flight
                </button>
              </Card>
            </Container>
          </div>
        )}
        <Modal
          show={this.state.show_login}
          onHide={this.handleClose}
          id="auth-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Flight Verification</Modal.Title>
          </Modal.Header>

          <Modal.Body id="auth-modal-body">
            Please, enter promocode if you have it and verify your flight.
            <Form className="login-form">
              <Form.Group
                className="mb-3"
                controlId="formBasicEmail"
                onChange={(e) => this.setState({ promocode: e.target.value })}
              >
                <Form.Label>Promocode</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Row>
                <Col>
                  <button
                    variant="primary"
                    type="submit"
                    className="enter-btn"
                    onClick={() => this.newFlight()}
                  >
                    Verify
                  </button>
                </Col>
                <Col>
                  <button
                    variant="primary"
                    type="submit"
                    className="enter-btn"
                    onClick={() => this.handleClose()}
                  >
                    Cancel
                  </button>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default CreateFlightPersonalInfo;
