import React from "react";
import { Card, Col, Row, Container, Alert } from "react-bootstrap";
import "../../assets/styles/flight/create-flight.css";
import Loading from "../../components/reused/Loading";

class BookFlightPayment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      creditcard_number: "",
      cvv: "",
      month: "",
      year: "",
      flight: this.props.history.location.state,
      show_modal: false,
      numberError: "",
      cvvError: "",
      dateError: "",
      name: "",
      nameError: "",
      token: sessionStorage.getItem("access_token"),
      show_error: true,
      email: localStorage.getItem("email"),
    };
  }

  componentDidMount() {
    console.log(this.state.flight);
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

  formats(ele, e) {
    if (ele.value.length < 19) {
      ele.value = ele.value.replace(/\W/gi, "").replace(/(.{4})/g, "$1 ");
      return true;
    } else {
      return false;
    }
  }

  numberValidation(e) {
    e.target.value = e.target.value.replace(/[^\d ]/g, "");
    return false;
  }

  cancelOrder() {
    this.props.history.push({
      pathname: "/",
    });
  }

  cancelPayment() {
    this.props.history.push({
      pathname: "/",
    });
  }

  alertDisable() {
    setTimeout(() => {
      this.setState({
        show_error: false,
      });
    }, 3000);
  }

  async payForFlight() {
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
      credit_card_info: {
        cvv: this.state.cvv,
        month: this.state.month,
        number: this.state.creditcard_number,
        name: this.state.name,
        year: this.state.year,
      },
      order_id: parseInt(this.state.flight.flight_id),
    };

    console.log(flight);
    const token = sessionStorage.getItem("access_token");
    await fetch("https://one-aviation.herokuapp.com/api/v1/payments/pay", {
      method: "POST",
      headers: fetch_header,
      body: JSON.stringify(flight),
    })
      .then(async (res) => {
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          console.log("OK");
          this.props.history.push({
            pathname: "/create-flight/success",
          });
          localStorage.removeItem("email");
        }
      })
      .catch((err) => console.log(err));
  }

  handleModalClose() {
    this.setState({ show_modal: false });
  }

  handleSubmit(e) {
    e.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      this.payForFlight();
    }
  }

  validate = () => {
    let cvvError = "";
    let dateError = "";
    let numberError = "";
    let nameError = "";
    var reg = /^[a-z]+$/i;
    var reg2 = /^\d+$/;
    if (this.state.creditcard_number === "") {
      numberError = "⚠️ Credit card number cannot be empty";
    } else {
      if (
        this.state.creditcard_number.length < 16 ||
        this.state.creditcard_number.length > 16
      ) {
        numberError = "⚠️ Credit card number must consist of 16 digits";
      }
      if (!reg2.test(this.state.creditcard_number)) {
        numberError = "⚠️ Invalid credit card number";
      }
    }
    if (this.state.cvv === "") {
      cvvError = "⚠️ CVV number cannot be empty";
    } else {
      if (this.state.cvv.length < 3 || this.state.cvv.length > 3) {
        cvvError = "⚠️ CVV number must consist of 3 digits";
      }
      if (!reg2.test(this.state.cvv)) {
        cvvError = "⚠️ Invalid CVV number";
      }
    }
    if (this.state.month === "" || this.state.year === "") {
      dateError = "⚠️ Date cannot be empty";
    } else {
      if (
        parseInt(this.state.month) < 0 ||
        parseInt(this.state.month) > 12 ||
        parseInt(this.state.year) < 22
      ) {
        dateError = "⚠️ Invalid date";
      }
    }
    if (this.state.name === "") {
      nameError = "⚠️ Name cannot be empty";
    }

    if (numberError || cvvError || dateError || nameError) {
      this.setState({ numberError, cvvError, dateError, nameError });
      return false;
    }
    if (!numberError && !cvvError && !dateError && !nameError) {
      numberError = "";
      cvvError = "";
      dateError = "";
      nameError = "";
      this.setState({ numberError, cvvError, dateError, nameError });
      return true;
    }
  };

  render() {
    return (
      <div className="flight">
        {this.state.isLoading ? (
          <Loading />
        ) : (
          <div className="book-flight">
            <Container>
              <h1>Payment</h1>
              <br />
              <Card>
                <div>
                  <Row>
                    <Col md="7">
                      <div className="details">
                        <h3>Card Number</h3>
                        <label>Enter the 16-digit card number</label>
                        <br></br>
                        <input
                          onkeypress="return formats(this,event)"
                          onkeyup="return numberValidation(event)"
                          className="creditcard"
                          id="number"
                          maxLength={16}
                          onChange={(e) =>
                            this.setState({ creditcard_number: e.target.value })
                          }
                        ></input>
                        <div className="form-errors">
                          {this.state.numberError}
                        </div>
                      </div>
                      <div className="details">
                        <Row>
                          <Col>
                            <h3>CVV Number</h3>
                            <label>Enter the 3-digit card number</label>
                          </Col>
                          <Col>
                            <input
                              className="creditcard"
                              id="cvv"
                              maxLength={3}
                              onChange={(e) =>
                                this.setState({ cvv: e.target.value })
                              }
                            ></input>
                            <div className="form-errors">
                              {this.state.cvvError}
                            </div>
                          </Col>
                        </Row>
                      </div>
                      <div className="details">
                        <Row>
                          <Col>
                            <h3>Expiracy Date</h3>
                            <label>Enter the expiration date of the card</label>
                          </Col>
                          <Col>
                            <Row>
                              <Col md="5">
                                <input
                                  className="creditcard"
                                  id="cvv"
                                  maxLength={2}
                                  onChange={(e) =>
                                    this.setState({ month: e.target.value })
                                  }
                                ></input>
                                <div className="form-errors">
                                  {this.state.dateError}
                                </div>
                              </Col>
                              <Col md="2">
                                <h3>/</h3>
                              </Col>
                              <Col md="5">
                                <input
                                  className="creditcard"
                                  id="cvv"
                                  maxLength={4}
                                  onChange={(e) =>
                                    this.setState({ year: e.target.value })
                                  }
                                ></input>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </div>
                      <div className="details">
                        <h3>Cardholder Name</h3>
                        <label>Enter cardholder's name</label>
                        <br></br>
                        <input
                          type="text"
                          onkeypress="return formats(this,event)"
                          onkeyup="return numberValidation(event)"
                          className="creditcard"
                          id="number"
                          onChange={(e) =>
                            this.setState({ name: e.target.value })
                          }
                        ></input>
                        <div className="form-errors">
                          {this.state.nameError}
                        </div>
                      </div>
                      <Row>
                        <Col>
                          <button
                            className="pay-btn"
                            onClick={(e) => this.handleSubmit(e)}
                          >
                            Pay Now
                          </button>
                        </Col>
                        <Col>
                          <button
                            className="cancel-btn"
                            onClick={() => this.cancelPayment()}
                          >
                            Cancel Order
                          </button>
                        </Col>
                      </Row>
                    </Col>
                    <Col md="1"></Col>

                    <Col md="4">
                      <Card id="receipt">
                        <Row>
                          <Col>
                            <h5 className="titles">Company</h5>
                          </Col>
                          <Col>
                            <h5>ONE Aviation</h5>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <h5 className="titles">Order Number</h5>
                          </Col>
                          <Col>
                            <h5>{this.state.flight.flight_id}</h5>
                          </Col>
                        </Row>
                        <div id="sum">
                          <h5 className="titles" style={{ marginTop: "30px" }}>
                            You have to pay
                          </h5>
                          <h4 style={{ fontWeight: "700" }}>
                            € {parseInt(this.state.flight.price)}
                          </h4>
                        </div>
                      </Card>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Container>
          </div>
        )}

        {this.state.show_error === true ? (
          <Alert
            variant={"danger"}
            onChange={this.alertDisable()}
            className="alert-payment"
          >
            <Alert.Heading>❌ Card number is not valid!</Alert.Heading>
            Please enter the correct 16-digit number
          </Alert>
        ) : null}
      </div>
    );
  }
}

export default BookFlightPayment;
