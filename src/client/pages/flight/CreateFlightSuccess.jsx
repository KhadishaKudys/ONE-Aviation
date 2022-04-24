import React from "react";
import { Container } from "react-bootstrap";
import "../../assets/styles/flight/create-flight.css";
import Loading from "../../components/reused/Loading";
import "react-nice-dates/build/style.css";
import seaplane from "../../assets/static/flights/seaplane-success.png";

class CreateFlightSuccess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    console.log(sessionStorage);
    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 2000);
    return () => clearTimeout(timer);
  }

  render() {
    return (
      <div className="flight">
        {this.state.isLoading ? (
          <Loading />
        ) : (
          <div className="create-flight" id="flight-created-success">
            <Container>
              <h1>Flight is created!</h1>
            </Container>
          </div>
        )}
      </div>
    );
  }
}

export default CreateFlightSuccess;
