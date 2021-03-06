import React from "react";
import "../../assets/styles/about-us/about-us.css";
import Aircraft from "./Aircraft";
import Services from "./Services";
import Loading from "../../components/reused/Loading";

class AboutUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    const timer = setTimeout(() => {
      this.setState({
        isLoading: false,
      });
    }, 2000);
    return () => clearTimeout(timer);
  }

  render() {
    return (
      <div className="about-us">
        {this.state.isLoading ? (
          <Loading />
        ) : (
          <div className="about-us">
            <Services />
            <Aircraft />
            {/* <Strengths /> */}
          </div>
        )}
      </div>
    );
  }
}

export default AboutUs;
