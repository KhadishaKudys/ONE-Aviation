import React from "react";
import {Card, Container, Row, Col} from "react-bootstrap"
import "../../assets/styles/home/clients-comments.css"
import avatar1 from "../../assets/static/backgrounds/home/avatar-1.svg"


class ClientsComments extends React.Component{
    render(){
        return(
            <div className="clients-comments">
                <Container id="info-cont">
                    <Row>
                        <Col md={5}>
                        <h5 data-aos="fade-up"
     data-aos-anchor-placement="top-bottom" data-aos-easing="ease-in-sine" data-aos-offset="200">Testimonials</h5>
                            <h1 data-aos="fade-up"
     data-aos-anchor-placement="top-bottom" data-aos-easing="ease-in-sine" data-aos-offset="200" data-aos-delay="100">What Clients Say About Us</h1>
                        </Col>
                        <Col md={1}>
                            </Col>
                        <Col md={6} className="col-info">
                            <Card id="card-1" data-aos="fade-left" data-aos-easing="ease-in-sine" data-aos-offset="300" data-aos-delay="200">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse fringilla, urna eget porta dictum, leo ex ornare lacus, at sodales lectus tortor sed orci. Donec egestas nulla ac egestas auctor. Aenean tristique ultrices gravida. Donec pharetra leo massa, ac ultricies sapien mattis in. Nullam imperdiet et nisi sed lacinia. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse fringilla.</p>
                                <Row>
                                    <Col md={2}>
                                        <img src={avatar1} alt="avatar-1" width='100%'></img>
                                    </Col>
                                    <Col id="client-name">
                                        <h3>Emily Allen</h3>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>

                    </Row>
                </Container>
                    
            </div>
                    );
    }
}

export default (ClientsComments)