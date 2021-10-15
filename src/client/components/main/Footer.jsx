import React from "react";
import {Container, Row, Col} from "react-bootstrap";
import "../../assets/styles/home/components.css"
import fb from "../../assets/static/icons/home/fb.svg"
import twitter from "../../assets/static/icons/home/twitter.svg"
import google_play from "../../assets/static/icons/home/google_play.svg"
import apple_store from "../../assets/static/icons/home/apple_store.svg"
import inst from "../../assets/static/icons/home/inst.svg"

class Footer extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            show: false
        }
    }

    render(){
        return(
            <div className="footer">
                <Container>
                    <Row>
                        <Col>
                            <h1>ONE Aviation</h1>
                            <p>Book your trip in minute, get full<br></br>Control for much longer.</p>
                        </Col>
                        <Col>
                            <h2>Company</h2>
                            <a>About</a><br></br>
                            <a>Careers</a><br></br>
                            <a>Mobile</a>
                        </Col>
                        <Col>
                            <h2>Contact</h2>
                            <a>Help/FAQ</a><br></br>
                            <a>Press</a><br></br>
                            <a>Affilates</a>
                        </Col>
                        <Col>
                            <h2>More</h2>
                            <a>Privacy policy</a><br></br>
                            <a>Terms of use</a><br></br>
                            <a>Low fare tips</a>
                        </Col>
                        <Col>
                            <img className="icon-footer" src={fb} alt="icon-fb"></img>
                            <img className="icon-footer" src={inst} alt="icon-inst"></img>
                            <img className="icon-footer" src={twitter} alt="icon-twitter"></img>
                            <h3>Discover our app</h3>
                            <img className="icon-footer-1" src={google_play} alt="icon-gp" width="45%"></img>
                            <img className="icon-footer-1" src={apple_store} alt="icon-as" width="45%"></img>
                        </Col>
                    </Row>
                    <p>All rights reserved by ONE Aviation</p>
                </Container>
            </div>
        );
    }
}

export default (Footer);