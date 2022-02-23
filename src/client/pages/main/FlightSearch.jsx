import React from "react";
import {Card, Container, Row, Col} from "react-bootstrap"
import "../../assets/styles/home/flight-search.css"
import from_to from "../../assets/static/icons/home/from_to.svg"
import Map1 from "../../components/flight/Googlemapsearch"
import {enGB} from "date-fns/locale";
import {DateRangePicker, END_DATE, START_DATE} from "react-nice-dates";
import {Link, withRouter} from 'react-router-dom'


class FlightSearch extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            location_from_latitude: '',
            location_from_longitude: '',
            location_to_latitude: '',
            location_to_longitude: '',
            date_from: '',
            date_to: '',
            passengers: '',
            map_1_show: false,
            map_2_show: false,
            available_ports: {},
            limit: 10,
            page: 1,
            order_by: '',
            order_key: 1,
            available_flights: {},
            departure_port: '',
            destination_port: ''
        }
    }

    componentDidMount(){
        // this.listOfPorts()
    }
    
    searchFlights(){
        this.availableFlights();
    }

    
    handleChange = (title, data) => {
        let newFilter = {
            ...this.state.filterData,
            [title]: data
        }

        this.setState({ filterData: newFilter });
    }

    convertDate = (inputFormat) => {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        let d = new Date(inputFormat);
        return [d.getFullYear(), pad(d.getMonth()+1), pad(d.getDate())].join('-');
    }

    setEndDate = (date) => {
        this.setState({date_to: date});
    }

    setStartDate = (date) => {
        this.setState({date_from: date});
    }

    changeFrom(){
        this.setState({location_from_latitude: localStorage.getItem('from_latitude')});
        this.setState({location_from_longitude: localStorage.getItem('from_longitude')});
        this.setState({departure_port: localStorage.getItem('departure_port')});
        this.setState({map_1_show:false});
    }

    changeFrom2(){
        this.setState({location_to_latitude: localStorage.getItem('to_latitude')});
        this.setState({location_to_longitude: localStorage.getItem('to_longitude')});
        this.setState({destination_port: localStorage.getItem('destination_port')});
        this.setState({map_2_show:false});
    }

    fromClicked(){
        this.setState({map_1_show:true})
        localStorage.setItem('location_dir', 'from')
    }

    toClicked(){
        this.setState({map_2_show:true})
        localStorage.setItem('location_dir', 'to')
    }

    async availableFlights(e) {
        const flight = {
            date_from: this.state.date_from,
            date_to: this.state.date_to,
            location_from: {
                latitude: parseFloat(this.state.location_from_latitude),
                longitude: parseFloat(this.state.location_from_longitude),
                name: this.state.departure_port
            },
            location_to: {
                latitude: parseFloat(this.state.location_to_latitude),
                longitude: parseFloat(this.state.location_to_longitude),
                name: this.state.destination_port
            },
            number_of_passengers: parseInt(this.state.passengers)
        }
        await fetch(`https://one-aviation.herokuapp.com/api/v1/order/sharing?limit=&page=&order_by=&order_key=`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(flight),
        }).then(async(res) => {
            const data = await res.json();
            this.setState({available_flights: data})
            this.props.history.push({
                pathname: "/discover-flights",
                state: this.state
            });
        })
            .catch(err => console.log(err));
    }


    render(){
        return(
            <div className="flight-search">
                <h1 id="lrg-text">Seaplanes</h1>
                <h2 style={{color: 'white'}}>FIND YOUR ADVENTURE</h2>
                <br/>
                <Container>
                    {this.state.map_1_show ? 
                    <div className="map-bck">
                    <Card id="map">
                        <h3>Select the departure point</h3>
                    <Map1
                                google={this.props.google}
                                center={{lat: 44.573355, lng: 12.156921}}
                                height='300px'
                                onChange={e => this.forceUpdate()}
				    />
                    <Row>
                        <Col><button id="cancel-btn"  onClick={() => this.setState({map_1_show:false})}>Cancel</button></Col>
                        <Col><button onClick={() => this.changeFrom()}>Select</button></Col>
                    </Row>
                    </Card>
                    </div>
                    :<div/>
                    }
                    {this.state.map_2_show ? 
                    <div className="map-bck">
                    <Card id="map">
                        <h3>Select the destination point</h3>
                    <Map1
                                google={this.props.google}
                                center={{lat: 44.573355, lng: 12.156921}}
                                height='300px'
                                onChange={e => this.forceUpdate()}
				    />
                    <Row>
                        <Col><button id="cancel-btn"  onClick={() => this.setState({map_2_show:false})}>Cancel</button></Col>
                        <Col><button onClick={() => this.changeFrom2()}>Select</button></Col>
                    </Row>
                    </Card>
                    </div>
                    :<div/>
                    }
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
                                <input className="flight-input" id="destination" value={this.state.destination_port} id="destination-in" onClick={() => this.toClicked()}></input>
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
            </div>
        );
    }
}

export default withRouter(FlightSearch)