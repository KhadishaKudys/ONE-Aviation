import React from "react";
import { Card, Col, Row, Alert } from "react-bootstrap";
import "../../assets/styles/enter/sign-up.css";
import Loading from "../../components/reused/Loading";

class CreateAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      middle_name: "",
      last_name: "",
      phone_number: "",
      isLoading: true,
      phoneError: "",
      nameError: "",
      surnameError: "",
      show_success: false,
    };
  }

  componentDidMount() {
    const timer = setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 1500);
    return () => clearTimeout(timer);
  }

  alertDisable() {
    setTimeout(() => {
      this.setState({
        show_success: false,
      });
    }, 3000);
  }

  async createAccount() {
    let userPrev = this.props.history.location.state;
    const user = {
      email: userPrev.email,
      password: userPrev.password,
      first_name: this.state.first_name,
      middle_name: this.state.middle_name,
      last_name: this.state.last_name,
      phone_number: this.state.phone_number,
    };
    await fetch("https://one-aviation.herokuapp.com/api/v1/auth/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        console.log(res);
        if (res.ok) {
          this.setState({ show_success: true });
          setTimeout(() => {
            this.props.history.push("/sign-in");
          }, 3000);
        }
      })
      .catch((err) => console.log(err));
  }

  validate = () => {
    let phoneError = "";
    let nameError = "";
    let surnameError = "";
    var reg = /^[a-z]+$/i;
    var reg2 = /^\d+$/;
    if (this.state.phone_number === "") {
      phoneError = "⚠️ Phone number cannot  be empty";
    } else {
      if (
        this.state.phone_number.length < 10 ||
        !reg2.test(this.state.phone_number)
      ) {
        phoneError = "⚠️ Invalid phone number";
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
    if (phoneError || nameError || surnameError) {
      this.setState({ phoneError, nameError, surnameError });
      return false;
    }
    if (!phoneError && !nameError && !surnameError) {
      phoneError = "";
      nameError = "";
      surnameError = "";
      this.setState({ phoneError, nameError, surnameError });
      return true;
    }
  };

  goBack() {
    window.history.back();
  }

  handleSubmit(e) {
    e.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      this.createAccount();
    }
  }

  render() {
    return this.state.isLoading ? (
      <Loading />
    ) : (
      <div className="create-account">
        <div id="back">
          <button onClick={() => this.goBack()}>← Back</button>
        </div>
        <div id="info">
          <Card className="card">
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <h1>Congrats,</h1>
              <h2>Continue by filling the remaining fields!</h2>
              <Row className="row">
                <Col className="column" id="enter-card-left">
                  <label htmlFor="first-name">First name *</label>
                  <input
                    className="enter-input"
                    id="first-name"
                    onChange={(e) =>
                      this.setState({ first_name: e.target.value })
                    }
                  ></input>
                  <div className="form-errors">{this.state.nameError}</div>
                  <label htmlFor="middle-name">Middle name</label>
                  <input
                    className="enter-input"
                    id="middle-name"
                    onChange={(e) =>
                      this.setState({ middle_name: e.target.value })
                    }
                  ></input>
                </Col>
                <Col className="column" id="enter-card-right">
                  <label htmlFor="last-name">Last name *</label>
                  <input
                    className="enter-input"
                    id="last-name"
                    onChange={(e) =>
                      this.setState({ last_name: e.target.value })
                    }
                  ></input>
                  <div className="form-errors">{this.state.surnameError}</div>
                  <label htmlFor="phone-number">Phone number *</label>
                  <input
                    className="enter-input"
                    id="phone-number"
                    onChange={(e) =>
                      this.setState({ phone_number: e.target.value })
                    }
                  ></input>
                  <div className="form-errors">{this.state.phoneError}</div>
                </Col>
              </Row>
              <button
                className="enter-btn"
                onClick={(e) => this.handleSubmit(e)}
              >
                Complete
              </button>
            </form>
          </Card>
          {this.state.show_success === true ? (
            <Alert variant={"success"} onChange={this.alertDisable()}>
              <Alert.Heading>✅ Success!</Alert.Heading>
              Account is created!
            </Alert>
          ) : (
            <p></p>
          )}
        </div>
      </div>
    );
  }
}

export default CreateAccount;
