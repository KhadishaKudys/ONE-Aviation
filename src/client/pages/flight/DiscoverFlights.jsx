import React from "react";
import '../../assets/styles/flight/discover-flights.css'
import Loading from "../../components/reused/Loading"
import {Card, Col, Row, Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import from_to from "../../assets/static/icons/home/from_to.svg"

class DiscoverFlights extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
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


    render(){
        return(
            <div className="discover-flights">
            {this.state.isLoading ? <Loading />
            :
            <div className="flights">
                <Container>
                <Card id="searchbar">
                    <Row>
                        <Col md={3}>
                            <Row>
                                <label for="departure">From</label>
                                <input className="flight-input" id="departure"></input>
                            </Row>
                            </Col>
                            <Col md={1} id="from_to_icon_col">
                                <img src={from_to} alt="from_to"></img>
                            </Col>
                            <Col md={3}>
                            <Row>
                                <label for="destination">To</label>
                                <input className="flight-input" id="destination"></input>
                            </Row>
                            </Col>
                            <Col md={2}>
                            <Row>
                                <label for="passengers">Passengers</label>
                                <input className="flight-input" id="passengers"></input>
                            </Row>
                            </Col>
                            <Col md={1} className="btn-col">
                                <Link to="/discover-flights"><button id="search-btn">Search</button></Link>
                            </Col>
                        </Row>
                </Card>
                </Container>
                <Card id="prices">
                    
                </Card>
                <Container id="tickets">
                    <Row>
                        <Col md="3">
                        </Col>
                        <Col>
                            <Card className="ticket">
                                <Row>
                                    <Col>
                                        <h2>06:50</h2>
                                        <h3>FLR</h3>
                                    </Col>
                                    
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

export default (DiscoverFlights)