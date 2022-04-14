import React from "react";
import {Container, Row, Col} from "react-bootstrap"
import "../../assets/styles/home/information.css"
import AOS from 'aos'
import info1 from "../../assets/static/backgrounds/home/info-1-back.svg"
import info2 from "../../assets/static/backgrounds/home/info-2-back.svg"
import info3 from "../../assets/static/backgrounds/home/info-3-back.svg"
import info from "../../assets/data/company-info"

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
                            <h3 data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine">{info.strengths[0].title}</h3>
                            <p data-aos-delay="200" data-aos="fade-right" data-aos-easing="ease-in-sine">
                            {info.strengths[0].text}
                            </p>
                            {/* <a data-aos-delay="300" data-aos="fade-right" data-aos-easing="ease-in-sine" href="/blog">read more →</a> */}
                        </Col>
                        <Col className="col-img" data-aos="flip-left" data-aos-offset="500"
     data-aos-duration="500">
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
                            <h3 data-aos="fade-left" data-aos-offset="300" data-aos-easing="ease-in-sine">{info.strengths[1].title}</h3>
                            <p data-aos-delay="300" data-aos="fade-left" data-aos-easing="ease-in-sine">
                            {info.strengths[1].text}
                            </p>
                            {/* <a data-aos-delay="300" data-aos="fade-left" data-aos-easing="ease-in-sine" href="/blog">read more →</a> */}
                        </Col>

                    </Row>
                    <Row>
                        <Col md={2} data-aos="fade-up" data-aos-easing="ease-in-sine" data-aos-offset="300">
                            <h1 id="lrg-text">03</h1>
                        </Col>
                        <Col md={6} className="col-info">
                            <h5 data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine">╼ SAFETY STANDARDS AND PROTOCOL</h5>
                            <h3 data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine">{info.strengths[2].title}</h3>
                            <p data-aos-delay="200" data-aos="fade-right" data-aos-easing="ease-in-sine">
                            {info.strengths[2].text}
                            </p>
                            {/* <a data-aos-delay="300" data-aos="fade-right" data-aos-easing="ease-in-sine" href="/blog">read more →</a> */}
                            
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