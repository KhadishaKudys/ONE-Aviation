import React from "react";
import { Card, Col, Row, Container, Modal, Form } from "react-bootstrap";
import "../../assets/styles/flight/book-flight.css";
import Loading from "../../components/reused/Loading";

class BookFlightPersonalInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      first_name: "",
      middle_name: "",
      last_name: "",
      document: "",
      passengers_num: 5,
      flight: this.props.history.location.state,
      document_type: "",
      flight_id: this.props.match.params.flight_id,
      documentError: "",
      nameError: "",
      surnameError: "",
      show_login: false,
      promocode: "",
    };
  }

  componentDidMount() {
    console.log(this.state);
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 2000);
    return () => clearTimeout(timer);
  }

  handleClose() {
    this.setState({ show_login: false });
  }

  async upd() {
    this.componentDidMount();
  }

  goBack() {
    window.history.back();
  }

  async bookFlight() {
    const token = sessionStorage.getItem("access_token");
    const booking = {
      document: {
        number: this.state.document,
        type: this.state.document_type,
      },
      email: this.state.flight.email,
      order_id: parseInt(this.state.flight.flight_id),
      passengers: [
        {
          direction: "FORWARD",
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
      promocode: this.state.promocode,
    };
    await fetch(`https://one-aviation.herokuapp.com/api/v1/order/join`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(booking),
    })
      .then(async (res) => {
        const data = await res.json();
        console.log(data);
        this.setState({ available_flights: data });
        if (res.ok) {
          console.log("OK");
          this.props.history.push({
            pathname: `/book-flight/${this.state.flight_id}/payment`,
          });
        }
      })
      .catch((err) => console.log(err));
  }

  handleChange = (title, data) => {
    let newFilter = {
      ...this.state.filterData,
      [title]: data,
    };

    this.setState({ filterData: newFilter });
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
      documentError = "⚠️ Document number cannot  be empty";
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

  render() {
    return (
      <div className="flight">
        {this.state.isLoading ? (
          <Loading />
        ) : (
          <div className="book-flight">
            <Container>
              <div id="back">
                <button onClick={() => this.goBack()}>← Back</button>
              </div>
              <h1>Book flight</h1>
              <br />
              <Card>
                <h2>Personal information</h2>
                <div style={{ height: "50px" }} />
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
                <Card>
                  <h2>Flight Verification</h2>
                  <p>
                    Please, enter promocode if you have it and verify your
                    flight.
                  </p>
                  <label for="password">Promocode</label>
                  <input
                    className="enter-input"
                    id="password"
                    onChange={(e) =>
                      this.setState({ promocode: e.target.value })
                    }
                  ></input>
                  <button
                    className="enter-btn"
                    onClick={() => this.bookFlight()}
                  >
                    Book this flight
                  </button>
                </Card>
              ) : null}
            </Container>
          </div>
        )}
      </div>
    );
  }
}

export default BookFlightPersonalInfo;
