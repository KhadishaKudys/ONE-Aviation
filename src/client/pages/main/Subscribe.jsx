import React from "react";
import {Card, Container, Row, Col} from "react-bootstrap"
import "../../assets/styles/home/subscribe.css"


class Information extends React.Component{
    render(){
        return(
            <div className="subscribe">
                <Container id="info-cont">
                    <Row>
                        <Col md={5}>
                            <Card id="card-1" data-aos="fade-right" data-aos-offset="200" data-aos-easing="ease-in-sine">
                                <label for="email">Name</label>
                                <input className="enter-input" id="name"></input>
                                <label for="email">Email</label>
                                <input className="enter-input" id="email"></input>
                                <label for="password">Message</label>
                                <textarea className="enter-input" id="message"></textarea>
                                <div className="btn-subscribe">
                                    <button>Submit</button>
                                </div>
                            </Card>
                        </Col>
                        <Col md={2}>
                        </Col>
                        <Col md={5} className="col-info">
                            <h5 data-aos="fade-up"
     data-aos-anchor-placement="top-bottom" data-aos-easing="ease-in-sine" data-aos-offset="200">Contact us & Stay in touch</h5>
                            <h1 data-aos="fade-up"
     data-aos-anchor-placement="top-bottom" data-aos-easing="ease-in-sine" data-aos-offset="200" data-aos-delay="100">Subscribe & Send Us A Message</h1>
                            <Card id="card-2" data-aos="fade-left" data-aos-easing="ease-in-sine" data-aos-delay="200">
                                <label for="email">Email</label>
                                <input className="enter-input" id="email"></input>
                                <div className="btn-subscribe">
                                    <button>Subscribe</button>
                                </div>
                            </Card>
                        </Col>

                    </Row>
                </Container>
                    
            </div>
        );
    }
}

export default (Information)