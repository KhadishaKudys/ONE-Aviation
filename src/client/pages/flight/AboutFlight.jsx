import React from "react";
import {Card, Col, Row, Container} from "react-bootstrap"
import "../../assets/styles/flight/about-flight.css"
import flight_back from "../../assets/static/backgrounds/home/main-bckgrnd.png"
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
                    <h1 id="flight-locations">{this.state.flight_info.from.name} ✈ {this.state.flight_info.to.name}</h1>
                    </Col>
                    <Col md='2'>
                    <button onClick={() => this.bookingFlight()}>Book</button>
                    </Col>
                </Row>
                <Row id="flight-cards">
                    <Col md={9}>
                        <Row>
                            <Col md="4">
                            <h5>{this.state.flight_info.from.name}</h5>
                            </Col>
                            <Col md={2}>
                            <p>✈</p>
                            </Col>
                            <Col md="4">
                            <h5>{this.state.flight_info.to.name}</h5>
                            </Col>
                        </Row>
                        <Card id="flight-data">
                            <h1 id="title-table">Flight Information</h1>
                            <hr></hr>
                            <Row>
                                <Col>
                                    <h2>From</h2>
                                </Col>
                                <Col>
                                    <p>{this.state.flight_info.from.name}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h2>To</h2>
                                </Col>
                                <Col>
                                    <p>{this.state.flight_info.to.name}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h2>Departure date</h2>
                                </Col>
                                <Col>
                                    <p>{this.state.flight_info.departure_time}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h2>Departure time</h2>
                                </Col>
                                <Col>
                                    <p>{this.state.flight_info.departure_time}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h2>Arrival date</h2>
                                </Col>
                                <Col>
                                    <p>{this.state.flight_info.arrival_time}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h2>Arrival time</h2>
                                </Col>
                                <Col>
                                    <p>{this.state.flight_info.arrival_time}</p>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col>
                    <Card id="price-info">
                        <Row>
                            <h2>€ {parseInt(this.state.flight_info.price)}</h2>
                            <p><b>{this.state.flight_info.available_seats} seats</b> available</p>
                        </Row>
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