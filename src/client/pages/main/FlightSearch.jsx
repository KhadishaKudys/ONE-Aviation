import React from "react";
import {Card, Container, Row, Col} from "react-bootstrap"
import "../../assets/styles/home/flight-search.css"
import from_to from "../../assets/static/icons/home/from_to.svg"
import {Link} from 'react-router-dom'

class FlightSearch extends React.Component{
    render(){
        return(
            <div className="flight-search">
                <h1 id="lrg-text">Seaplanes</h1>
                <h3>FIND YOUR ADVENTURE</h3>
                <Container>
                    <Card className="flight-search-card">
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
                            <Col md={2} className="btn-col">
                                <Link to="/create-flight"><button id="new-btn">Create new flight</button></Link>
                            </Col>
                        </Row>
                    </Card>
                </Container>
            </div>
        );
    }
}

export default (FlightSearch)