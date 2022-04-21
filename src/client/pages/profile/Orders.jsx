import React from "react";
import { Card, Col, Row, Nav } from "react-bootstrap";
import "../../assets/styles/profile/orders.css";
import Loading from "../../components/reused/Loading";
import empty from "../../assets/static/backgrounds/profile/empty-cart.png";
import ticket_plane from "../../assets/static/flights/ticket-plane.svg";

class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      isLoading: true,
      access_token: sessionStorage.getItem("access_token"),
      order_history: [],
    };
  }

  componentDidMount() {
    const timer = setTimeout(() => {
      this.orderHistory();
      this.setState({
        isLoading: false,
      });
    }, 1500);
    return () => clearTimeout(timer);
  }

  async changeDate() {
    for (let flight in this.state.order_history) {
      let from_date = new Date(this.state.order_history[flight].departure_time)
        .toISOString()
        .split("T")[0];
      let from_time = new Date(this.state.order_history[flight].departure_time)
        .toISOString()
        .split("T")[1];
      let to_date = new Date(this.state.order_history[flight].arrival_time)
        .toISOString()
        .split("T")[0];
      let to_time = new Date(this.state.order_history[flight].arrival_time)
        .toISOString()
        .split("T")[1];
      this.state.order_history[flight].departure_time = from_time;
      this.state.order_history[flight].departure_date = from_date;
      this.state.order_history[flight].arrival_time = to_time;
      this.state.order_history[flight].arrival_date = to_date;
    }
    console.log("fomatted", this.state.order_history);
  }

  async orderHistory() {
    await fetch(
      "https://one-aviation.herokuapp.com/api/v1/order/history?limit=&page=&order_by=&order_key=",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.state.access_token,
        },
      }
    )
      .then(async (res) => {
        const data = await res.json();
        console.log("rr");
        console.log(data);
        this.setState({ order_history: data.orders });
        this.changeDate();
      })
      .catch((err) => this.setState({ order_history: [] }));
  }

  render() {
    return this.state.isLoading ? (
      <Loading />
    ) : (
      <div className="orders">
        <h1>My Orders</h1>
        {this.state.order_history.length === 0 ? (
          <div className="nothing">
            <div id="empty">
              <img src={empty} alt="empty-cart" width="30%" />
            </div>
            <h3>You don't have any orders!</h3>
          </div>
        ) : (
          <div id="orders">
            {this.state.order_history.map((flight) => (
              <Card className="ticket">
                <Row>
                  <Col md="10">
                    <Row>
                      <Col md="2" id="from">
                        <h3>{flight.departure_date}</h3>
                      </Col>
                      <Col md="8">
                        <p id="time">1h 50m</p>
                      </Col>
                      <Col md="2">
                        <h3>{flight.arrival_date}</h3>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="2" id="from">
                        <h4>{flight.from.name}</h4>
                      </Col>
                      <Col md="8">
                        <img src={ticket_plane} alt="ticket-plane" />
                      </Col>
                      <Col md="2">
                        <h4>{flight.to.name}</h4>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="2" id="from">
                        <p>{flight.departure_time}</p>
                      </Col>
                      <Col md="8">
                        <p id="way">Direct</p>
                      </Col>
                      <Col md="2">
                        <p>{flight.arrival_time}</p>
                      </Col>
                    </Row>
                  </Col>
                  <Col md="2" id="price" style={{ height: "150px" }}>
                    <div style={{ height: "33%" }} />
                    <h2 id="cost">€ {parseInt(flight.price)}</h2>
                  </Col>
                </Row>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Orders;
