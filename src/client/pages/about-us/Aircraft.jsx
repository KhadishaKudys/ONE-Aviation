import React from "react";
import '../../assets/styles/about-us/about-us.css'
import {Container, Row, Col, Card} from 'react-bootstrap'
import aircraft from '../../assets/data/aircraft'
import AOS from 'aos'
import seaplane from "../../assets/static/backgrounds/about/seaplane.png"

class Aircraft extends React.Component{

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
            <div className="aircraft">
                <div id="info">
                <Container>
                    <h2  data-aos="fade-right" data-aos-offset="100" data-aos-easing="ease-in-sine">{aircraft.title}</h2>
                </Container>
                <Row id="plane">
                <Col md="3">
                    <h1>AIRCRAFT</h1>
                    </Col>
                    <Col>
                    <div id="bubbles"  data-aos="fade" data-aos-offset="300" data-aos-delay="600" data-aos-easing="ease-in-sine">
                        <Card id="w">
                            <Card className="info" id="wid">
                                <h5>Overall width</h5>
                                <Row>
                                    <Col>
                                        <h6>Feet:</h6>
                                    </Col>
                                    <Col>
                                        <p>624.8</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <h6>Meters:</h6>
                                    </Col>
                                    <Col>
                                        <p>15.87</p>
                                    </Col>
                                </Row>
                            </Card>
                        </Card>

                        <Card id="h">
                        <Card className="info" id="hei">
                        <h5>Overall height</h5>
                                <Row>
                                    <Col>
                                        <h6>Feet:</h6>
                                    </Col>
                                    <Col>
                                        <p>15</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <h6>Meters:</h6>
                                    </Col>
                                    <Col>
                                        <p>4.60</p>
                                    </Col>
                                </Row>
                            </Card>
                        </Card>

                        <Card id="l">
                            <Card className="info" id="len">
                            <h5>Overall length</h5>
                                <Row>
                                    <Col>
                                        <h6>Feet:</h6>
                                    </Col>
                                    <Col>
                                        <p>41</p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <h6>Meters:</h6>
                                    </Col>
                                    <Col>
                                        <p>12.67</p>
                                    </Col>
                                </Row>
                            </Card>
                        </Card>
                        </div>
                    <img src={seaplane} alt="seaplane" width="100%"  data-aos="fade-down-right" data-aos-offset="200" data-aos-delay="200" data-aos-easing="ease-in-sine"></img>
                    </Col>
                </Row>
                </div>
                <div id="info-2">
                <Container>
                    
                        <Row id="strengths">
                            <Col>
                                <h3>Our strengths</h3>
                            </Col>
                            <Col>
                            <Card  data-aos="fade-up" data-aos-offset="200" data-aos-delay="200" data-aos-easing="ease-in-sine">
                                        <h2>Innovative</h2>
                            </Card>
                            </Col>
                            <Col>
                            <Card  data-aos="fade-up" data-aos-offset="200" data-aos-delay="200" data-aos-easing="ease-in-sine">
                                        <h2>Flexible & user-friendly</h2>
                            </Card>
                            </Col>
                            <Col>
                            <Card  data-aos="fade-up" data-aos-offset="200" data-aos-delay="200" data-aos-easing="ease-in-sine">
                                        <h2>Safe, high-quality & sustainable</h2>
                            </Card>
                            </Col>
                            <Col>
                            <Card  data-aos="fade-up" data-aos-offset="200" data-aos-delay="200" data-aos-easing="ease-in-sine">
                                        <h2>Experienced professional</h2>
                            </Card>
                            </Col>
                        </Row>
                        
                        </Container>
                        </div>
            </div>
        );
    }
}

export default (Aircraft)