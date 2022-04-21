import React from "react";
import { Card, Container, Row, Col, Alert } from "react-bootstrap";
import "../../assets/styles/home/subscribe.css";

class Subscribe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      email_sub: "",
      message: "",
      name: "",
      is_authorized: false,
      show_danger: false,
      show_success: false,
      token: sessionStorage.getItem("access_token"),
      emailError: "",
      emailError1: "",
      nameError: "",
      messageError: "",
      message_success: false,
    };
  }

  componentDidMount() {
    console.log(this.state);
  }

  async emailSubscription() {
    var fetch_header = {};
    if (this.state.token !== null) {
      fetch_header = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.state.token,
      };
    } else {
      fetch_header = {
        Accept: "application/json",
        "Content-Type": "application/json",
      };
    }
    await fetch(
      `https://one-aviation.herokuapp.com/api/v1/subscription/subscribe?email=${this.state.email}`,
      {
        method: "PUT",
        headers: fetch_header,
      }
    )
      .then(async (res) => {
        const data = await res.json();
        console.log(data);
        this.setState({ flight_info: data });
        if (res.ok) {
          console.log("OK");
          this.setState({
            show_success: true,
          });
          this.setState({
            email_sub: "",
          });
        }
      })
      .catch((err) =>
        this.setState({
          show_danger: true,
        })
      );
  }

  async writeMessage() {
    const message = {
      email: this.state.email,
      message: this.state.message,
      name: this.state.name,
    };
    await fetch("https://one-aviation.herokuapp.com/api/v1/message", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    })
      .then(async (res) => {
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          console.log("OK");
          this.setState({
            message_success: true,
          });
          this.setState({ message: "" });
          this.setState({ name: "" });
          this.setState({ email: "" });
        }
      })
      .catch((err) =>
        this.setState({
          show_danger: true,
        })
      );
  }

  alertDisable() {
    setTimeout(() => {
      this.setState({
        show_success: false,
      });
      this.setState({
        message_success: false,
      });
    }, 3000);
  }

  validateMessage = () => {
    let emailError1 = "";
    let nameError = "";
    let messageError = "";
    if (this.state.email === "") {
      emailError1 = "⚠️ Email cannot be empty";
    } else {
      if (!this.state.email.includes("@") || !this.state.email.includes(".")) {
        emailError1 = "⚠️ Invalid email";
      }
    }
    if (this.state.message === "") {
      messageError = "⚠️ Message cannot be empty";
    }
    if (this.state.name === "") {
      nameError = "⚠️ Name cannot be empty";
    }
    if (emailError1 || messageError || nameError) {
      this.setState({ emailError1, nameError, messageError });
      return false;
    }
    if (!emailError1 && !messageError && !nameError) {
      emailError1 = "";
      nameError = "";
      messageError = "";
      this.setState({ emailError1, messageError, nameError });
      return true;
    }
  };

  handleSubmitMessage(e) {
    e.preventDefault();
    const isValid = this.validateMessage();
    if (isValid) {
      this.writeMessage();
    }
  }

  validateSubscription = () => {
    let emailError = "";
    if (this.state.email_sub === "") {
      emailError = "⚠️ Email cannot be empty";
    } else {
      if (
        !this.state.email_sub.includes("@") ||
        !this.state.email_sub.includes(".")
      ) {
        emailError = "⚠️ Invalid email";
      }
    }
    if (emailError) {
      this.setState({ emailError });
      return false;
    }
    if (!emailError) {
      emailError = "";
      this.setState({ emailError });
      return true;
    }
  };

  handleSubmitSubscription(e) {
    e.preventDefault();
    const isValid = this.validateSubscription();
    if (isValid) {
      this.emailSubscription();
    }
  }

  render() {
    return (
      <div className="subscribe">
        <Container id="info-cont">
          <Row>
            <Col md={5}>
              <Card
                id="card-1"
                data-aos="fade-right"
                data-aos-offset="200"
                data-aos-easing="ease-in-sine"
              >
                <form onSubmit={(e) => this.handleSubmitMessage(e)}>
                  <label for="email">Name</label>
                  <input
                    className="enter-input"
                    id="name"
                    value={this.state.name}
                    onChange={(e) => this.setState({ name: e.target.value })}
                  ></input>
                  <div className="form-errors">{this.state.nameError}</div>
                  <label for="email">Email</label>
                  <input
                    className="enter-input"
                    id="email"
                    value={this.state.email}
                    onChange={(e) => this.setState({ email: e.target.value })}
                  ></input>
                  <div className="form-errors">{this.state.emailError1}</div>
                  <label for="password">Message</label>
                  <textarea
                    className="enter-input"
                    id="message"
                    value={this.state.message}
                    onChange={(e) => this.setState({ message: e.target.value })}
                  ></textarea>
                  <div className="form-errors">{this.state.messageError}</div>
                  <div className="btn-subscribe">
                    <button onClick={(e) => this.handleSubmitMessage(e)}>
                      Submit
                    </button>
                  </div>
                </form>
              </Card>
              {this.state.message_success === true ? (
                <Alert
                  variant={"success"}
                  onChange={this.alertDisable()}
                  className="subscribe-alert"
                >
                  <Alert.Heading>✅ Success!</Alert.Heading>
                  Your message is sent to us!
                </Alert>
              ) : (
                <p></p>
              )}
            </Col>
            <Col md={2}></Col>
            <Col md={5} className="col-info">
              <h5
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
                data-aos-easing="ease-in-sine"
                data-aos-offset="200"
              >
                Contact us & Stay in touch
              </h5>
              <h1
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
                data-aos-easing="ease-in-sine"
                data-aos-offset="200"
                data-aos-delay="100"
              >
                Subscribe & Send Us A Message
              </h1>
              <Card
                id="card-2"
                data-aos="fade-left"
                data-aos-easing="ease-in-sine"
                data-aos-delay="200"
              >
                <form onSubmit={(e) => this.handleSubmitSubscription(e)}>
                  <label for="email">Email</label>
                  <input
                    className="enter-input"
                    id="email"
                    value={this.state.email_sub}
                    onChange={(e) =>
                      this.setState({ email_sub: e.target.value })
                    }
                  ></input>
                  <div className="form-errors">{this.state.emailError}</div>
                  <div className="btn-subscribe">
                    <button onClick={(e) => this.handleSubmitSubscription(e)}>
                      Subscribe
                    </button>
                  </div>
                </form>
              </Card>
              {this.state.show_success === true ? (
                <Alert
                  variant={"success"}
                  onChange={this.alertDisable()}
                  className="subscribe-alert"
                >
                  <Alert.Heading>Success!</Alert.Heading>
                  Your email is subscribed to our news and notifications!
                </Alert>
              ) : (
                <p></p>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Subscribe;
