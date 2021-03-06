import React from "react";
import "../../assets/styles/about-us/about-us.css";
import { Container, Row, Col, Card } from "react-bootstrap";
import services from "../../assets/data/services";
import AOS from "aos";

class Strengths extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    AOS.init();
  }

  render() {
    return (
      <div className="strengths">
        <Container>
          <h1
            data-aos="fade-up"
            data-aos-offset="100"
            data-aos-easing="ease-in-sine"
          >
            Our strengths
          </h1>
          <Row>
            {services.map((service) => (
              <Col>
                <Card
                  data-aos="fade-up"
                  data-aos-offset="200"
                  data-aos-delay="200"
                  data-aos-easing="ease-in-sine"
                >
                  <h2>{service.title}</h2>
                  <p>{service.description}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    );
  }
}

export default Strengths;
