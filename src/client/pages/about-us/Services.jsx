import React from "react";
import Header from "../../components/main/Header"
import Footer from "../../components/main/Footer"
import '../../assets/styles/about-us/about-us.css'
import {Container, Row, Col, Card} from 'react-bootstrap'
import summary from '../../assets/data/executive-summary'
import services from '../../assets/data/services'
import AOS from 'aos'
import italy from "../../assets/static/backgrounds/about/italy.svg"
import rec from "../../assets/static/backgrounds/about/rec-2.svg"

class Services extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        AOS.init()
    }

    render(){
        return(
            <div className="services">
                <Header />
                <Container>
                    <div className="about-page">
                        <Row id="about">
                            <Col md='6' data-aos="fade-right" data-aos-offset="100" data-aos-easing="ease-in-sine">
                                <img src={italy} alt="italy" width="160%"/>
                                {/* <img src={rec} id="pl" alt="rec" width="40%"/> */}
                            </Col>
                            <Col data-aos="fade-left" data-aos-offset="100" data-aos-easing="ease-in-sine" data-aos-delay="200">
                                <h1>ABOUT US</h1>
                                {/* <p>{summary}</p> */}
                            </Col>
                        </Row>
                        <h1  data-aos="fade-up" data-aos-offset="100" data-aos-easing="ease-in-sine">Our services</h1>
                        <Row>
                            {services.map(service => 
                                <Col>
                                    <Card  data-aos="fade-up" data-aos-offset="200" data-aos-delay="200" data-aos-easing="ease-in-sine">
                                        <h2>{service.title}</h2>
                                        <p>{service.description}</p>
                                    </Card>
                                </Col>
                            )}
                        </Row>
                    </div>
                </Container>
            </div>
        );
    }
}

export default (Services)