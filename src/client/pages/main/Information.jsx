import React from "react";
import {Card, Container, Row, Col} from "react-bootstrap"
import "../../assets/styles/home/information.css"
import AOS from 'aos'
import info1 from "../../assets/static/backgrounds/home/info-1-back.svg"
import info2 from "../../assets/static/backgrounds/home/info-2-back.svg"
import info3 from "../../assets/static/backgrounds/home/info-3-back.svg"
import line from "../../assets/static/icons/home/line.svg"

class Information extends React.Component{

    componentDidMount() {
        AOS.init()
    }

    render(){
        return(
            <div className="information">
                <Container id="info-cont">
                    <Row>
                        <Col md={2} data-aos="fade-up" data-aos-easing="ease-in-sine" data-aos-offset="300">
                            <h1 id="lrg-text">01</h1>
                        </Col>
                        <Col md={6} className="col-info">
                            <Col><h5 data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine">╼ SKILLS AND PASSION</h5>
                            </Col>
                            <h3 data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine">At what level our aerospace skills are?</h3>
                            <p data-aos-delay="200" data-aos="fade-right" data-aos-easing="ease-in-sine">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse fringilla, urna eget porta dictum, leo ex ornare lacus, at sodales lectus tortor sed orci. Donec egestas nulla ac egestas auctor. Aenean tristique ultrices gravida. Donec pharetra leo massa, ac ultricies sapien mattis in. Nullam imperdiet et nisi sed lacinia. 
                            </p>
                            <a data-aos-delay="300" data-aos="fade-right" data-aos-easing="ease-in-sine">read more →</a>
                        </Col>
                        <Col className="col-img" data-aos="flip-left" data-aos-offset="500"
     data-aos-duration="500">
                            {/* <img className="info-img-hover" src={info1hover} alt="info-1"></img> */}
                            <img className="info-img" src={info1} alt="info-1-back"></img>
                        </Col>

                    </Row>
                    <Row>
                        <Col className="col-img-1" md={4} data-aos="flip-right" data-aos-offset="500" data-aos-duration="500"> 
                            <img className="info-img" src={info2} alt="info-2-back"></img>
                        </Col>
                        <Col md={2} data-aos="fade-up" data-aos-easing="ease-in-sine" data-aos-offset="300">
                            <h1 id="lrg-text">02</h1>
                        </Col>
                        <Col md={6} className="col-info">
                            <h5 data-aos="fade-left" data-aos-offset="300" data-aos-easing="ease-in-sine">╼ PRODUCTS AND SERVICES</h5>
                            <h3 data-aos="fade-left" data-aos-offset="300" data-aos-easing="ease-in-sine">Why we are so unique & reliable?</h3>
                            <p data-aos-delay="300" data-aos="fade-left" data-aos-easing="ease-in-sine">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse fringilla, urna eget porta dictum, leo ex ornare lacus, at sodales lectus tortor sed orci. Donec egestas nulla ac egestas auctor. Aenean tristique ultrices gravida. Donec pharetra leo massa, ac ultricies sapien mattis in. Nullam imperdiet et nisi sed lacinia. 
                            </p>
                            <a data-aos-delay="300" data-aos="fade-left" data-aos-easing="ease-in-sine">read more →</a>
                        </Col>

                    </Row>
                    <Row>
                        <Col md={2} data-aos="fade-up" data-aos-easing="ease-in-sine" data-aos-offset="300">
                            <h1 id="lrg-text">03</h1>
                        </Col>
                        <Col md={6} className="col-info">
                            <h5 data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine">╼ SAFETY STANDARDS AND PROTOCOL</h5>
                            <h3 data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine">Why you can trust our safety <br></br> standards?</h3>
                            <p data-aos-delay="200" data-aos="fade-right" data-aos-easing="ease-in-sine">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse fringilla, urna eget porta dictum, leo ex ornare lacus, at sodales lectus tortor sed orci. Donec egestas nulla ac egestas auctor. Aenean tristique ultrices gravida. Donec pharetra leo massa, ac ultricies sapien mattis in. Nullam imperdiet et nisi sed lacinia. 
                            </p>
                            <a data-aos-delay="300" data-aos="fade-right" data-aos-easing="ease-in-sine">read more →</a>
                            
                        </Col>
                        <Col className="col-img" data-aos="flip-left" data-aos-offset="500"
     data-aos-duration="500">
                            <img className="info-img" src={info3} alt="info-3-back"></img>
                        </Col>

                    </Row>
                </Container>
                    
            </div>
        );
    }
}

export default (Information)