import React from "react";
import {Card, Col, Row, Container} from "react-bootstrap"
import "../../assets/styles/flight/about-flight.css"
import flight_back from "../../assets/static/flights/flight-bck.png"
import Loading from "../../components/reused/Loading"

class AboutFlight extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            flight_id: this.props.match.params.flight_id,
            flight_info: this.props.history.location.state
        }
    }

    componentDidMount() {
        const timer = setTimeout(() => {
            this.setState({
                isLoading: false
            })
          }, 2000);
          return() => clearTimeout(timer)
    }

    bookingFlight(){
        this.props.history.push({
            pathname: `/book-flight/${this.state.flight_id}/contact-information`,
            state: this.state
        });
    }

    goBack(){
        window.history.back();
    }

    render(){
        return(
            <div className="about-flight">
            {this.state.isLoading ? <Loading />
            :
            <div className="flight-info">
                <img src={flight_back} alt="blog_2" width="100%" height="500px"></img>
                <Container>
                <Row>
                    <Col md='2' id="back-btn">
                    <div id="back">
                        <button onClick={() => this.goBack()}>← Back</button>
                        </div>
                    </Col>
                    <Col md='8'>
                    <h1>Flight</h1>
                    </Col>
                    <Col md='2'>
                    <button onClick={() => this.bookingFlight()}>Book</button>
                    </Col>
                </Row>
                <Row id="flight-cards">
                    <Col>
                    <Card>
                        <Row>
                            <Col md="4">
                            <h5>From</h5>
                            </Col>
                            <Col>
                            <p>{this.state.flight_info.from.name}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="4">
                            <h5>{Date(this.state.flight_info.departure_time)}</h5>
                            </Col>
                            <Col>
                            <p>
                            
                            <p>08:40</p>
                            </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="4">
                            <h5>To</h5>
                            </Col><Col>
                            <p>{this.state.flight_info.to.name}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="4">
                            <h5>Arrival time</h5>
                            </Col>
                            <Col>
                            <p>{Date(this.state.flight_info.arrival_time)}</p>
                            </Col>
                            </Row>
                            <Row>
                                <Col md="4">
                            <h5>Journey duration</h5>
                            </Col>
                            <Col>
                            <p>1h 50min</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="4">
                            <h5>Price</h5>
                            </Col>
                            <Col>
                            <p>{this.state.flight_info.price}</p>
                            </Col>
                        </Row>

                    </Card>
                    </Col>
                    <Col>
                    <Card>

                    </Card>
                    </Col>
                </Row>
                </Container>
            </div>
            }
            </div>
        );
    }
}

export default (AboutFlight)