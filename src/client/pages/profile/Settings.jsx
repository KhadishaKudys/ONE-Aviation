import React from "react";
import { Col, Row, Card } from "react-bootstrap";
import "../../assets/styles/profile/settings.css";
import Loading from "../../components/reused/Loading";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      isLoading: true,
      token: sessionStorage.getItem("access_token"),
      order_history: [],
      email: "sandra@fake.com",
      is_subscribed: true,
      user: this.props.user,
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

  async emailSubscribe() {
    await fetch(
      `https://one-aviation.herokuapp.com/api/api/v1/subscription/subscribe/${this.state.email}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.state.token,
        },
      }
    )
      .then(async (res) => {
        const data = await res.json();
        console.log(data);
        this.setState({ flight_info: data });
        if (res.ok) {
          console.log("OK");
          this.setState({ is_subscribed: true });
          alert("You subscribed successfully!");
        }
      })
      .catch((err) => console.log(err));
  }

  async emailUnsubscribe() {
    await fetch(
      `https://one-aviation.herokuapp.com/api/api/v1/subscription/unsubscribe/${this.state.email}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.state.token,
        },
      }
    )
      .then(async (res) => {
        const data = await res.json();
        console.log(data);
        this.setState({ flight_info: data });
        if (res.ok) {
          console.log("OK");
          this.setState({ is_subscribed: false });
          alert("You unsubscribed successfully!");
        }
      })
      .catch((err) => console.log(err));
  }

  render() {
    return this.state.isLoading ? (
      <Loading />
    ) : (
      <div className="settings">
        <h1>Settings</h1>
        <div>
          <Card id="personal-data">
            <h3>Personal information</h3>
            <Row>
              <Col>
                <h5>First name</h5>
                <h5>Last name</h5>
                {this.state.user.middle_name !== "" ? (
                  <h5>Middle name</h5>
                ) : null}
                <h5>Phone number</h5>
                <h5>Email</h5>
              </Col>
              <Col>
                <h5>{this.state.user.first_name}</h5>
                <h5>{this.state.user.last_name}</h5>
                {this.state.user.middle_name !== "" ? (
                  <h5>{this.state.user.middle_name}</h5>
                ) : null}
                <h5>{this.state.user.phone_number}</h5>
                <h5>{this.state.user.email}</h5>
              </Col>
            </Row>
          </Card>
          <br></br>
          <Row>
            <Col md={3}>
              <h3>Email subscription</h3>
            </Col>
            <Col>
              {this.state.is_subscribed ? (
                <button onClick={() => this.emailUnsubscribe()}>
                  Unsubscribe
                </button>
              ) : (
                <button onClick={() => this.emailSubscribe()}>Subscribe</button>
              )}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Settings;
