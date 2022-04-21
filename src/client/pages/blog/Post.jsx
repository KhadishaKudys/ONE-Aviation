import React from "react";
import { Container, Form, Modal, Alert } from "react-bootstrap";
import "../../assets/styles/blog/post.css";
import Loading from "../../components/reused/Loading";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      post_info: {},
      liked: null,
      token: sessionStorage.getItem("access_token"),
      show_login: false,
      password: "",
      email: "",
      passwordError: "",
      emailError: "",
      show: false,
      show_success: false,
    };
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
  }

  componentDidMount() {
    console.log(this.state);
    this.getPost(this.props.match.params.id);
    const timer = setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 2000);
    return () => clearTimeout(timer);
  }

  async clickLike(id) {
    if (this.state.post_info.liked === false) {
      this.state.post_info.liked = true;
      this.setState({
        post_info: this.state.post_info,
      });
      this.likeThePost(id);
    } else {
      this.state.post_info.liked = false;
      this.setState({
        post_info: this.state.post_info,
      });
      this.unlikeThePost(id);
    }
  }

  async checkLoggedIn(e, id) {
    if (this.state.token === null) {
      this.setState({
        show_login: true,
      });
    } else {
      this.likeThePost(id);
    }
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

  handleSubmit(e, id) {
    e.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      this.signIn();
    }
  }

  async likeThePost(id) {
    console.log(id);
    await fetch(`https://one-aviation.herokuapp.com/api/v1/blog/like/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.state.token,
      },
    })
      .then(async (res) => {
        const data = await res.json();
        let items = [...this.state.all_blogs];
        let item = { ...items[1] };
        item.liked = true;
        items[1] = item;
        this.setState({ items });
        console.log(data);
      })
      .catch((err) => this.setState({ posts: [] }));
  }

  async unlikeThePost(id) {
    console.log(id);
    await fetch(`https://one-aviation.herokuapp.com/api/v1/blog/unlike/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.state.token,
      },
    })
      .then(async (res) => {
        const data = await res.json();

        console.log(data);
      })
      .catch((err) => this.setState({ posts: [] }));
  }

  goBack() {
    window.history.back();
  }

  forceUpdateHandler() {
    this.forceUpdate();
  }

  async getPost(id) {
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
    console.log(id);
    await fetch(`https://one-aviation.herokuapp.com/api/v1/blog/${id}`, {
      method: "GET",
      headers: fetch_header,
    })
      .then(async (res) => {
        const data = await res.json();
        this.setState({
          post_info: data,
        });
        console.log(data);
      })
      .catch((err) => this.setState({ posts: [] }));
  }

  handleClose = () => {
    this.setState({
      show_login: false,
    });
  };

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
        console.log(data);
        if (res.ok) {
          sessionStorage.setItem("access_token", data.access_token);
          this.setState({ token: data.access_token });
          sessionStorage.setItem("refresh_token", data.refresh_token);
          sessionStorage.setItem("isLoggedIn", true);
          this.setState({ show_success: true });
          setTimeout(() => {
            this.setState({
              show_login: false,
            });
          }, 3000);
        } else {
          this.setState({ show: true });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({ show: true });
      });
  }

  alertDisable() {
    setTimeout(() => {
      this.setState({
        show: false,
      });
      this.setState({
        show_success: false,
      });
    }, 3000);
  }

  render() {
    return (
      <div className="post">
        {this.state.isLoading ? (
          <Loading />
        ) : (
          <div className="post-page">
            <div id="post-header">
              <img
                src={this.state.post_info.image}
                alt="blog_2"
                width="100%"
              ></img>
              <div id="btn-div">
                <button className="back-btn" onClick={() => this.goBack()}>
                  ← Back
                </button>
              </div>
              <div className="cont">
                <h1>{this.state.post_info.title}</h1>
                <div
                  className="heart-btn"
                  onClick={(e) =>
                    this.checkLoggedIn(e, this.state.post_info.id)
                  }
                >
                  <div
                    className={`content ${
                      this.state.post_info.liked ? "heart-active" : ""
                    }`}
                  >
                    <span
                      className={`heart ${
                        this.state.post_info.liked ? "heart-active" : ""
                      }`}
                    ></span>
                    <span
                      className={`like ${
                        this.state.post_info.liked ? "heart-active" : ""
                      }`}
                    >
                      Like
                    </span>
                  </div>
                </div>
              </div>
              <Container>
                <p>{this.state.post_info.content}</p>
              </Container>
            </div>
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <Modal
                show={this.state.show_login}
                onHide={this.handleClose}
                id="auth-modal"
              >
                <Modal.Header closeButton>
                  <Modal.Title>Sign In</Modal.Title>
                </Modal.Header>

                <Modal.Body id="auth-modal-body">
                  <Form className="login-form">
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicEmail"
                      onChange={(e) => this.setState({ email: e.target.value })}
                    >
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" />
                    </Form.Group>
                    <div className="form-errors">{this.state.emailError}</div>
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicPassword"
                      onChange={(e) =>
                        this.setState({ password: e.target.value })
                      }
                    >
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" />
                    </Form.Group>
                    <div className="form-errors">
                      {this.state.passwordError}
                    </div>
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicCheckbox"
                    ></Form.Group>
                    <button
                      variant="primary"
                      type="submit"
                      className="enter-btn"
                      onClick={(e) =>
                        this.handleSubmit(e, this.state.post_info.id)
                      }
                    >
                      Sign in
                    </button>
                  </Form>
                </Modal.Body>
              </Modal>
            </form>

            {this.state.show_success === true ? (
              <Alert variant={"success"} onChange={this.alertDisable()}>
                <Alert.Heading>✅ Success!</Alert.Heading>
                You are logged in!
              </Alert>
            ) : (
              <p></p>
            )}
            {this.state.show === true ? (
              <Alert variant={"danger"} onChange={this.alertDisable()}>
                <Alert.Heading>❌ You got an error!</Alert.Heading>
                Either email or password is incorrect!
              </Alert>
            ) : (
              <p></p>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Post;
