import React from "react";
import { Card, Col, Row, Alert } from "react-bootstrap";
import "../../assets/styles/enter/sign-in.css";
import Loading from "../../components/reused/Loading";
import AOS from "aos";
import logo from "../../assets/static/backgrounds/enter/sign-in-back.jpg";
import { Link } from "react-router-dom";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      isLoading: true,
      email: "",
      password: "",
      formValues: "",
      emailError: "",
      passwordError: "",
    };
  }

  componentDidMount() {
    AOS.init();
    const timer = setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 1500);
    return () => clearTimeout(timer);
  }

  validate = () => {
    let emailError = "";
    let passwordError = "";
    if (!this.state.email.includes("@") || !this.state.email.includes(".")) {
      emailError = "⚠️ Invalid email";
    }
    if (this.state.password.length < 8) {
      passwordError = "⚠️ Password must be at least 8 characters";
    }
    if (emailError || passwordError) {
      this.setState({ emailError, passwordError });
      return false;
    }
    if (!emailError && !passwordError) {
      emailError = "";
      passwordError = "";
      this.setState({ emailError, passwordError });
      return true;
    }
  };

  alertDisable() {
    setTimeout(() => {
      this.setState({
        show: false,
      });
    }, 3000);
  }

  async signIn() {
    const user = {
      password: this.state.password,
      email: this.state.email,
    };
    await fetch("https://one-aviation.herokuapp.com/api/v1/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then(async (res) => {
        const data = await res.json();
        console.log(data.id);
        if (res.ok) {
          sessionStorage.setItem("access_token", data.access_token);
          sessionStorage.setItem("refresh_token", data.refresh_token);
          localStorage.setItem("isLoggedIn", true);
          this.props.history.push({
            pathname: `/user/profile/orders`,
            state: data,
          });
        } else {
          this.setState({ show: true });
        }
      })
      .catch((err) => console.log(err));
  }

  async userInfo() {
    await fetch("https://one-aviation.herokuapp.com/api/v1/profile/my", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
    })
      .then(async (res) => {
        const data = await res.json();
        console.log(data);
        this.setState({ user_info: data });
      })
      .catch((err) => console.log(err));
  }

  handleSubmit(e) {
    e.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      this.signIn();
    }
  }

  render() {
    return this.state.isLoading ? (
      <Loading />
    ) : (
      <div id="sign-in">
        <div id="back">
          <Link to="/">
            <button>🏠 Main</button>
          </Link>
        </div>
        <div className="sign-in">
          <Card
            className="card"
            data-aos="fade"
            data-aos-offset="100"
            data-aos-easing="ease-in-sine"
          >
            <form onSubmit={this.handleSubmit}>
              <Row className="row">
                <Col className="column" id="enter-card-left">
                  <img
                    className="enter-img"
                    src={logo}
                    alt="sign-in-back"
                  ></img>
                </Col>
                <Col className="column" id="enter-card-right">
                  <h1>Welcome,</h1>
                  <h2>Sign in to continue!</h2>
                  <label for="email">Email</label>
                  <input
                    className="enter-input"
                    id="email"
                    onChange={(e) => this.setState({ email: e.target.value })}
                  ></input>
                  <div className="form-errors">{this.state.emailError}</div>
                  <label for="password">Password</label>
                  <input
                    className="enter-input"
                    id="password"
                    type="password"
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                  ></input>
                  <div className="form-errors">{this.state.passwordError}</div>
                  <button
                    className="enter-btn"
                    onClick={(e) => this.handleSubmit(e)}
                  >
                    Sign in
                  </button>
                  <br></br>
                  <a className="pass-a" href="/password-reset">
                    Forgot your password?
                  </a>
                  <p className="enter-p">
                    Don't have an account?{" "}
                    <a className="enter-a" href="/sign-up">
                      Sign up
                    </a>
                  </p>
                </Col>
              </Row>
            </form>
          </Card>
          {this.state.show === true ? (
            <Alert variant={"danger"} onChange={this.alertDisable()}>
              <Alert.Heading>❌ You got an error!</Alert.Heading>
              Either email or password is incorrect!
            </Alert>
          ) : null}
        </div>
      </div>
    );
  }
}

export default SignIn;
