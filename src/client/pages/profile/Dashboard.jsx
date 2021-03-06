import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../../assets/styles/profile/dashboard.css";
import Loading from "../../components/reused/Loading";
import avatar from "../../assets/static/backgrounds/profile/avatar.png";
import home from "../../assets/static/icons/profile/home-icon.svg";
import orders from "../../assets/static/icons/profile/orders-icon.svg";
import settings from "../../assets/static/icons/profile/settings-icon.svg";
import likedPosts from "../../assets/static/icons/home/isliked.svg";
import logout from "../../assets/static/icons/profile/logout.svg";
import Orders from "./Orders";
import LikedPosts from "./LikedPosts";
import Settings from "./Settings";
import { Link, Switch, Route } from "react-router-dom";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      isLoading: true,
      access_token: sessionStorage.getItem("access_token"),
      refresh_token: sessionStorage.getItem("refresh_token"),
      user_info: {},
    };
  }

  componentDidMount() {
    this.userInfo();
    const timer = setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 1500);
    return () => clearTimeout(timer);
  }

  async signOut(e) {
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
    window.location.href = "/sign-in";
  }

  async userInfo() {
    await fetch("https://one-aviation.herokuapp.com/api/v1/profile/my", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.state.access_token,
      },
    })
      .then(async (res) => {
        const data = await res.json();
        console.log(data);
        this.setState({ user_info: data });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return this.state.isLoading ? (
      <Loading />
    ) : (
      <div className="dashboard">
        <Row>
          <Col md={3}>
            <div id="sidebar">
              <Row>
                <Link to="/">
                  <h1>THE Airline</h1>
                </Link>
              </Row>
              <div className="menu">
                <Link to="/">
                  <Row className="item">
                    <Col md={3}>
                      <img src={home} alt="home-icon" width="18px"></img>
                    </Col>
                    <Col>
                      <h2>Home</h2>
                    </Col>
                  </Row>
                </Link>
              </div>
              <div className="menu">
                <Link to="/user/profile/orders">
                  <Row className="item">
                    <Col md={3}>
                      <img src={orders} alt="home-icon" width="18px"></img>
                    </Col>
                    <Col>
                      <h2>Orders</h2>
                    </Col>
                  </Row>
                </Link>
              </div>
              <div className="menu">
                <Link to="/user/profile/liked-posts">
                  <Row className="item">
                    <Col md={3}>
                      <img src={likedPosts} alt="home-icon" width="18px"></img>
                    </Col>
                    <Col>
                      <h2>Liked posts</h2>
                    </Col>
                  </Row>
                </Link>
              </div>
              <div className="menu">
                <Link to="/user/profile/settings">
                  <Row className="item">
                    <Col md={3}>
                      <img src={settings} alt="home-icon" width="18px"></img>
                    </Col>
                    <Col>
                      <h2>Settings</h2>
                    </Col>
                  </Row>
                </Link>
              </div>
              <div className="menu-last">
                <Row className="item">
                  <Col md={3}>
                    <img src={logout} alt="home-icon" width="18px"></img>
                  </Col>
                  <Col onClick={() => this.signOut()}>
                    <h2>Log out</h2>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          <Col className="content">
            <Container>
              <Row>
                <Col md={8}></Col>
                <Col md={3}>
                  <h2>
                    {this.state.user_info.first_name}{" "}
                    {this.state.user_info.last_name}
                  </h2>
                </Col>
                <Col md={1}>
                  <img src={avatar} alt="avatar" width="40px"></img>
                </Col>
              </Row>
              <div>
                <Switch>
                  <Route path="/user/profile/orders">
                    <Orders />
                  </Route>
                  <Route path="/user/profile/liked-posts">
                    <LikedPosts />
                  </Route>
                  <Route path="/user/profile/settings">
                    <Settings user={this.state.user_info} />
                  </Route>
                </Switch>
              </div>
            </Container>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
