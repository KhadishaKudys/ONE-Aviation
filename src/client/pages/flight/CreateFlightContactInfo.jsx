import React from "react";
import { Card, Col, Row, Container } from "react-bootstrap";
import "../../assets/styles/flight/create-flight.css";
import Loading from "../../components/reused/Loading";
import "react-nice-dates/build/style.css";
import { Breadcrumb } from "antd";
import InputMask from "react-input-mask";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input/input";

class CreateFlightContactInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      email: "",
      phone_number: "",
      flight_info: this.props.history.location.state,
      emailError: "",
      phoneError: "",
    };
  }

  componentDidMount() {
    console.log(this.props);
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

  openPersonalInfo() {
    localStorage.setItem("email", this.state.email);
    this.props.history.push({
      pathname: "/create-flight/personal-information",
      state: this.state,
    });
  }

  validate = () => {
    let emailError = "";
    let phoneError = "";
    if (sessionStorage.getItem("create_email") === "") {
      emailError = "⚠️ Email cannot be empty";
    } else {
      if (
        !sessionStorage.getItem("create_email").includes("@") ||
        !sessionStorage.getItem("create_email").includes(".")
      ) {
        emailError = "⚠️ Invalid email";
      }
    }
    if (sessionStorage.getItem("create_phone") === "") {
      phoneError = "⚠️ Phone number cannot  be empty";
    } else {
      if (sessionStorage.getItem("create_phone").length < 8) {
        phoneError = "⚠️ Invalid phone number";
      }
    }
    if (emailError || phoneError) {
      this.setState({ emailError, phoneError });
      return false;
    }
    if (!emailError && !phoneError) {
      emailError = "";
      phoneError = "";
      this.setState({ emailError, phoneError });
      return true;
    }
  };

  handleSubmit(e) {
    e.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      this.openPersonalInfo();
    }
  }

  render() {
    return (
      <div className="flight">
        {this.state.isLoading ? (
          <Loading />
        ) : (
          <div className="create-flight">
            <Container>
              <h1>New Flight</h1>
              <Breadcrumb>
                <Breadcrumb.Item>
                  <a href="/create-flight/flight-information">
                    Flight Information
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Contact Information</Breadcrumb.Item>
              </Breadcrumb>
              <br />

              <Card>
                <h2 id="title-h">Contact information</h2>
                <Row>
                  <Col md="5">
                    <label for="email">Email *</label>
                    <input
                      className="enter-input"
                      id="email"
                      value={sessionStorage.getItem("create_email")}
                      onChange={(e) => {
                        this.setState({ email: e.target.value });
                        sessionStorage.setItem("create_email", e.target.value);
                      }}
                    ></input>
                    <div className="form-errors">{this.state.emailError}</div>
                  </Col>
                  <Col md="2"></Col>
                  <Col md="5">
                    <label for="phone-number">Phone number *</label>
                    <PhoneInput
                      className="enter-input"
                      value={sessionStorage.getItem("create_phone")}
                      onChange={(e) => {
                        this.setState({ phone_number: e });
                        sessionStorage.setItem("create_phone", e);
                      }}
                    />
                    <div className="form-errors">{this.state.phoneError}</div>
                  </Col>
                </Row>

                <button
                  className="enter-btn"
                  onClick={(e) => this.handleSubmit(e)}
                >
                  Continue
                </button>
              </Card>
            </Container>
          </div>
        )}
      </div>
    );
  }
}

export default CreateFlightContactInfo;
