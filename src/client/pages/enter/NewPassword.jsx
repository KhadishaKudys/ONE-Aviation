import React from "react";
import Loading from "../../components/reused/Loading";
import { Card, Alert } from "react-bootstrap";
import "../../assets/styles/enter/password-reset.css";
import PasswordStrengthBar from "react-password-strength-bar";

class NewPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.location.state.email,
      password: "",
      password_2: "",
      verification: this.props.location.state.verification,
      passwordError: "",
      passwordMatchError: "",
      show: false,
      show_success: false,
    };
  }

  componentDidMount() {
    console.log(this.state);
    const timer = setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 1500);
    return () => clearTimeout(timer);
  }

  validate = () => {
    let passwordError = "";
    let passwordMatchError = "";
    if (this.state.password.length < 8) {
      passwordError = "⚠️ Password must be at least 8 characters";
    }
    if (this.state.password !== this.state.password_2) {
      passwordMatchError = "⚠️ Passwords do not match";
      this.setState({ show: true });
    }
    if (passwordError || passwordMatchError) {
      this.setState({ passwordError, passwordMatchError });
      return false;
    }
    if (!passwordError && !passwordMatchError) {
      passwordError = "";
      passwordMatchError = "";
      this.setState({ passwordError, passwordMatchError });
      return true;
    }
  };

  async newPass() {
    if (this.state.password.localeCompare(this.state.password_2) === 0) {
      const user = {
        password: this.state.password,
        email: this.state.email,
      };
      await fetch(
        "https://one-aviation.herokuapp.com/api/v1/auth/reset/password",
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.state.verification.token,
          },
          body: JSON.stringify(user),
        }
      )
        .then(async (res) => {
          const data = await res.json();
          console.log(data);
          if (res.ok) {
            this.setState({ show_success: true });
            setTimeout(() => {
              this.props.history.push("/sign-in");
            }, 3000);
          }
        })
        .catch((err) => console.log(err));
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      this.newPass();
    }
  }

  render() {
    return this.state.isLoading ? (
      <Loading />
    ) : (
      <div className="pass-reset">
        <div id="info">
          <Card className="card">
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <h1>Verification is passed!</h1>
              <h2>Create new password</h2>
              <label for="new-pass">New password</label>
              <input
                className="enter-input"
                id="new-pass"
                onChange={(e) => this.setState({ password: e.target.value })}
              ></input>
              <PasswordStrengthBar
                className="pass-bar"
                password={this.state.password}
                minLength={8}
              />
              <div className="form-errors">{this.state.passwordError}</div>
              <label for="new-pass-2">Repeat password</label>
              <input
                className="enter-input"
                id="new-pass-2"
                onChange={(e) => this.setState({ password_2: e.target.value })}
              ></input>
              <button
                className="enter-btn"
                onClick={(e) => this.handleSubmit(e)}
              >
                Change
              </button>
            </form>
          </Card>
          {this.state.show === true ? (
            <Alert variant={"danger"} onChange={this.alertDisable()}>
              <Alert.Heading>❌ You got an error!</Alert.Heading>
              Passwords don't match!
            </Alert>
          ) : (
            <p></p>
          )}
          {this.state.show_success === true ? (
            <Alert variant={"success"} onChange={this.alertDisable()}>
              <Alert.Heading>✅ Success!</Alert.Heading>
              Password is changed!
            </Alert>
          ) : (
            <p></p>
          )}
        </div>
      </div>
    );
  }
}

export default NewPassword;
