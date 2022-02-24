import React from "react";
import {Card, Col, Row, Container} from "react-bootstrap"
import "../../assets/styles/flight/create-flight.css"
import Loading from "../../components/reused/Loading"
import Map from "../../components/flight/Googlemap"
// import TimePicker from 'react-gradient-timepicker';
import CustomMap from '../../components/flight/Map_1'
import 'react-nice-dates/build/style.css'
import { TimePicker } from 'antd';
import 'antd/dist/antd.css';
import { DatePicker } from 'antd';


class CreateFlightFlightInfo extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            Ropen: false,
            Dopen: false,
            departure_latitude: localStorage.getItem('from_lat'),
            departure_longitude: localStorage.getItem('from_long'),
            destination_latitude: localStorage.getItem('to_lat'),
            destination_longitude: localStorage.getItem('to_long'),
            shareable: false, 
            departure_time: '',
            return_time: '',
            map_show: false,
            custom_map_show: false,
            location_dir: 'from',
            passengers: '',
            departure_port: localStorage.getItem('departure_port'),
            destination_port: localStorage.getItem('destination_port')
        }
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    }

    componentDidMount() {
        console.log(localStorage)
        const timer = setTimeout(() => {
            this.setState({
                isLoading: false
            })
          }, 2000);
          return() => clearTimeout(timer)
    }

    async upd(){
        this.componentDidMount()
    }

    handleDOpenChange = Dopen => {
        this.setState({ Dopen });
      };

      handleROpenChange = Ropen => {
        this.setState({ Ropen });
      };
    
    handleDClose = () => this.setState({ Dopen: false });

    handleRClose = () => this.setState({ Ropen: false });

    dirFrom(){
        this.setState({map_show: true});
        localStorage.setItem('location_dir', 'from');
    }

    selectedFrom(){
        this.setState({departure_latitude: localStorage.getItem('form_lat')})
        this.setState({departure_longitude: localStorage.getItem('form_long')})
    }

    dirTo(){
        this.setState({map_show: true});
        localStorage.setItem('location_dir', 'to');
    }

    selectedTo(){
        this.setState({destination_latitude: localStorage.getItem('to_lat')})
        this.setState({destination_longitude: localStorage.getItem('to_long')})
    }

    onDDateChange(date) {
        console.log(date._d)
        let  dateformat = new Date(date._d)
        this.setState({departure_time: dateformat.toISOString()})
    }

    onRDateChange(date) {
        console.log(date._d)
        let dateformat = new Date(date._d)
        this.setState({return_time: dateformat.toISOString()})
    }

    customDirFrom(){
        this.setState({custom_map_show: true});
        localStorage.setItem('location_dir', 'from');
    }

    customDirTo(){
        this.setState({custom_map_show: true});
        localStorage.setItem('location_dir', 'to');
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
        this.setState({return_time: date});
    }

    setStartDate = (date) => {
        this.setState({departure_time: date});
    }

    openContactInfo(){
        this.props.history.push({
            pathname: "/create-flight/contact-information",
            state: this.state
        });
    }

    goBack(){
        this.setState({map_show: false})
        this.forceUpdateHandler()
    }

    forceUpdateHandler(){
        this.forceUpdate();
      };

    render(){
        return(
            <div className="flight">
            {this.state.isLoading ? <Loading />
            :
            <div className="create-flight">
                <Container>
                    <h1>New flight</h1>
                        <Card id="flightInfo">
                        {this.state.map_show || this.state.custom_map_show ?
                        <div>
                            { this.state.map_show ?
                        <div>
                            <button className="back-btn" onClick={() => this.goBack()}>← Back</button>
                            
                            <Map
                                google={this.props.google}
                                center={{lat: 41.573355, lng: 12.156921}}
                                height='570px'
                                onChange={e => this.forceUpdate()}
                                loc_dir = {this.state.location_dir}
				            />
                            </div>
                            :
                                <div>
                            <button onClick={e => this.setState({custom_map_show: false})}>Back</button>
                            <CustomMap
                                google={this.props.google}
                                center={{lat: 41.573355, lng: 12.156921}}
                                height='570px'
                                onChange={e => this.forceUpdate()}
                                loc_dir = {this.state.location_dir}
				            />
                            </div>
    }
                            </div>
                            : 
                            <div>
                    <h2 id="title-h">Flight information</h2>
                        
                                <Row>
                                    <Row>
                                        <Col>
                                <label for="email">Location</label>
                                </Col>
                                </Row>
                                    <Col>
                                <input className="enter-input" id="email" placeholder="Departure port" value={this.state.departure_port} onChange={() => this.selectedFrom()} onClick={() => this.dirFrom()}></input>
                                </Col>
                                <Col>
                                <input className="enter-input" id="email" placeholder="Destination port" value={this.state.destination_port} onChange={() => this.selectedTo()} onClick={() => this.dirTo()}></input>
                                </Col>
                                </Row>
                                <label for="email">Date</label>
                            
                                <Row>
                                    <Col>
                            
                            <br/>
                                <DatePicker className="enter-input" placeholder="Departure date" onChange={(e) => this.onDDateChange(e)}/>
                                </Col>
                                <Col>
                            <br/>
                                <DatePicker className="enter-input" placeholder="Return date" onChange={(e) => this.onRDateChange(e)}/>
                                </Col>
                                </Row>
                                {/* <DateRangePicker
                                        startDate={this.state.departure_time}
                                        endDate={this.state.return_time}
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
                                                <input
                                                    className={'enter-input' + (focus === START_DATE ? ' -focused' : '')}
                                                    {...startDateInputProps}
                                                    placeholder='Departure date'
                                                    onChange={e => this.setState({departure_time: e.target.value})}
                                                />
                                                </Col><Col>
                                                <input
                                                    className={'enter-input' + (focus === END_DATE ? ' -focused' : '')}
                                                    {...endDateInputProps}
                                                    placeholder='Return date'
                                                    onChange={e => this.setState({return_time: e.target.value})}
                                                />
                                                </Col>
                                            </div>
                                        )}
                                </DateRangePicker> */}
                                <br/>
                                <label for="password">Time</label>
                                <br/>
                                <br/>
                                <Row>
                                    <Col>
                                <TimePicker  className="enter-input"
                                    placeholder='Departure time'
                                    open={this.state.Dopen}
                                    onOpenChange={this.handleDOpenChange}
                                    format={'HH:mm'}
                                />
                                {/* <TimePicker
                                     className="enter-input"
                                    time="12:00"
                                    color1="#EE7F00"
                                    placeholder="Start Time"
                                    onSet={(val) => {
                                      alert('time is ' + JSON.stringify(val));
                                    }}
                                    onChange={e => this.setState({time: e.target.value})}
                                /> */}
                                </Col>
                                <Col>
                                <TimePicker  className="enter-input"
                                    open={this.state.Ropen}
                                    placeholder="Return time"
                                    onOpenChange={this.handleROpenChange}
                                    format={'HH:mm'}
                                />
                                </Col>
                                </Row>
                                <br/>
                            <Row>
                                <Col>
                                <label for="passengers">Number of passenger</label>
                                <input className="enter-input" type="number" id="passengers" onChange={e => this.setState({passengers: e.target.value})}></input>
                                </Col>
                                <Col>
                                </Col>
                            </Row>
                                <label for="email">Make this flight shareable?</label>
                                <input className="checkbox-input" type="checkbox" id="email" placeholder="Latitude" onChange={e => this.setState({shareable: true})}></input>
                           <br/>
                        <button className="enter-btn" onClick={() => this.openContactInfo()}>Continue</button>
                         </div>}
                    </Card>
                        
                </Container>
            </div>
            }
            </div>
        );
    }
}

export default (CreateFlightFlightInfo)