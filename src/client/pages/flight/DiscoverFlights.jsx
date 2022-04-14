import React from "react";
import '../../assets/styles/flight/discover-flights.css'
import Loading from "../../components/reused/Loading"
import {Card, Col, Row, Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {enGB} from "date-fns/locale";
import {DateRangePicker, END_DATE, START_DATE} from "react-nice-dates";
import from_to from "../../assets/static/icons/home/from_to.svg"
import ticket_plane from "../../assets/static/flights/ticket-plane.svg"


class DiscoverFlights extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            order_by: '',
            order_key: 1,
            limit: 20,
            page: 1,
            available_flights: this.props.history.location.state.available_flights
        }
    }

    componentDidMount() {
        console.log('ele', this.state)
        window.scrollTo(0,0);
        const timer = setTimeout(() => {
            this.setState({
                isLoading: false
            })
          }, 2000);
          return() => clearTimeout(timer);
    }

    async flightInfo(id) {
        await fetch(`https://one-aviation.herokuapp.com/api/v1/order/sharing/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(async(res) => {
            const data = await res.json();
            console.log(data);
            this.setState({flight_info:data})
            if( res.ok ) {
                console.log('OK');
                this.props.history.push({
                    pathname: `/about-flight/${id}`,
                    state: this.state.flight_info
                });
            }
        })
            .catch(err => console.log(err));
    }

    render(){
        return(
            <div className="discover-flights">
            {this.state.isLoading ? <Loading />
            :
            <div className="flights">
                <Container>
                <Card className="flight-search-card">
                        <Row>
                            <Col>
                            <Row>
                                <label for="departure">From</label>
                                <input className="flight-input" value={this.state.departure_port} id="departure" onClick={() => this.fromClicked()}></input>
                            </Row>
                            </Col>
                            <Col md={1} id="from_to_icon_col">
                                <img src={from_to} alt="from_to"></img>
                            </Col>
                            <Col>
                            <Row>
                                <label for="destination">To</label>
                                <input className="flight-input" id="destination" value={this.state.destination_port} onClick={() => this.toClicked()}></input>
                            </Row>
                            </Col>
                            
                            <Col md={1} className="btn-col">
                                <button id="search-btn" onClick={() => this.searchFlights()}>Search</button>
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                        <Col >
                            <Row>
                                <DateRangePicker
                                        startDate={this.state.date_from}
                                        endDate={this.state.date_to}
                                        onStartDateChange={this.setStartDate}
                                        onEndDateChange={this.setEndDate}
                                        minimumDate={new Date()}
                                        minimumLength={1}
                                        format='yyyy-MM-dd'
                                        locale={enGB}
                                    >
                                        {({ startDateInputProps, endDateInputProps, focus }) => (
                                            <div className='row date-range'>
                                                <Col>
                                                <label for="passengers">Departure date</label>
                                                <input
                                                    className={'enter-input' + (focus === START_DATE ? ' -focused' : '')}
                                                    {...startDateInputProps}
                                                    onChange={e => this.setState({date_to: e.target.value})}
                                                />
                                                </Col><Col>
                                                <label for="passengers">Return date</label>
                                                <input
                                                    className={'enter-input' + (focus === END_DATE ? ' -focused' : '')}
                                                    {...endDateInputProps}
                                                    onChange={e => this.setState({date_from: e.target.value})}
                                                />
                                                </Col>
                                            </div>
                                        )}
                                </DateRangePicker>
                            </Row>
                            </Col>
                            <Col>
                            <Row>
                                <label for="passengers">Passengers</label>
                                <input className="flight-input" id="passengers" onChange={e => this.setState({passengers: e.target.value})}></input>
                            </Row>
                            </Col>
                            <Col md={1} className="btn-col">
                                <Link to="/create-flight/flight-information"><button id="new-btn">Create new flight</button></Link>
                            </Col>
                        </Row>
                    </Card>
                </Container>
                <Card id="prices">
                    
                </Card>
                <Container id="tickets">
                    <Row>
                        <Col>
                        {this.state.available_flights.map(flight =>
                            <Card className="ticket">
                                <Row>
                                    <Col md='10'>
                                <Row>
                                    <Col md="2" id='from'>
                                        <h2>{Date(flight.departure_time)}</h2>
                                    </Col>
                                    <Col md="8">
                                        <p id="time">1h 50m</p>
                                    </Col>
                                    <Col md="2">
                                        <h2>{Date(flight.arrival_time)}</h2>
                                    </Col>
                                    </Row>
                                    <Row id="ticket-plane">
                                        <Col md="2">
                                        </Col>
                                        <Col md="8">
                                            <img src={ticket_plane} alt="ticket-plane"/>
                                        </Col>
                                        <Col md="2">
                                        </Col>
                                    </Row>
                                    <Row>
                                    <Col md="2" id="from">
                                        <h3>{flight.from.name}</h3>
                                    </Col>
                                    <Col md="8">
                                        <p id="way">Direct</p>
                                    </Col>
                                    <Col md="2">
                                        <h3>{flight.to.name}</h3>
                                    </Col>
                                </Row>
                                
                                </Col>
                                <Col md="2" id="price">
                                    <h2 id="cost">€ {parseInt(flight.price)}</h2>
                                    <button id="nav-btn" onClick={() => this.flightInfo(flight.id)}>Select</button>
                                </Col>
                                </Row>
                            </Card>
                        )}
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