// import React from "react";
// import {Card, Col, Row, Container, Nav} from "react-bootstrap"
// import "../../assets/styles/flight/create-flight.css"
// import Loading from "../../components/reused/Loading"
// import {DateRangePicker, END_DATE, START_DATE} from "react-nice-dates";
// import {enGB} from "date-fns/locale";
// import Map from "../../components/flight/Map"
// import TimePicker from 'react-gradient-timepicker';
// import 'react-nice-dates/build/style.css'

// class CreateFlight extends React.Component{

//     constructor(props) {
//         super(props);
//         this.state = {
//             isLoading: true,
//             departure_latitude: localStorage.getItem('from_lat'),
//             departure_longitude: localStorage.getItem('from_long'),
//             destination_latitude: localStorage.getItem('to_lat'),
//             destination_longitude: localStorage.getItem('to_long'),
//             email: '',
//             phone_number: '',
//             time: '2021-10-21T12:00:00Z',
//             first_name: '',
//             middle_name: '',
//             last_name: ''
//         }
//     }

//     componentDidMount() {
//         console.log(localStorage)
//         const timer = setTimeout(() => {
//             this.setState({
//                 isLoading: false
//             })
//           }, 2000);
//           return() => clearTimeout(timer)
//     }

//     async upd(){
//         this.componentDidMount()
//     }

//     async newFlight(e) {
//         const flight = {
//             email: this.state.email,
//             passengers: [
//                 {
//                     document: this.state.document,
//                     email :this.state.email,
//                     first_name: this.state.first_name,
//                     middle_name: this.state.middle_name,
//                     last_name: this.state.last_name,
//                     phone_number: this.state.phone_number
//                 }
//             ],
//             phone_number: this.state.phone_number,
//             from: {
//                 latitude: parseInt(this.state.departure_latitude),
//                 longitude: parseInt(this.state.departure_longitude)
//             },
//             to: {
//                 latitude: parseInt(this.state.destination_latitude),
//                 longitude: parseInt(this.state.departure_longitude)
//             },
//             departure_time: this.state.time,
//             document: this.state.document
//         }
//             await fetch('https://one-aviation.herokuapp.com/api/v1/order', {
//                 method: 'POST',
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(flight),
//             }).then(async(res) => {
//                 const data = await res.json();
//                 console.log(data);
//                 if( res.ok ) {
//                     console.log('OK')
//                 }
//             })
//                 .catch(err => console.log(err));
//     }

//     // handleSubmit = (event) => {
//     //     event.preventDefault();
//     //     let f = this.state.filterData;
//     //     if( this.state.start_date !== null ) {
//     //         f = {
//     //             ...f,
//     //             start_date: this.convertDate(this.state.start_date),
//     //             due_date: this.convertDate(this.state.due_date)
//     //         }
//     //     }
//     //     else {
//     //         f = {
//     //             ...f,
//     //             start_date: this.convertDate(new Date()),
//     //             due_date: ""
//     //         }
//     //     }

//     // }

//     handleChange = (title, data) => {
//         let newFilter = {
//             ...this.state.filterData,
//             [title]: data
//         }

//         this.setState({ filterData: newFilter });
//     }

//     convertDate = (inputFormat) => {
//         function pad(s) { return (s < 10) ? '0' + s : s; }
//         let d = new Date(inputFormat);
//         return [d.getFullYear(), pad(d.getMonth()+1), pad(d.getDate())].join('-');
//     }

//     setEndDate = (date) => {
//         this.setState({due_date: date});
//     }

//     setStartDate = (date) => {
//         this.setState({start_date: date});
//     }

//     render(){
//         return(
//             <div className="flight">
//             {this.state.isLoading ? <Loading />
//             :
//             <div className="create-flight">
//                 <Container>
//                     <h1>New flight</h1>
//                     <Map
// 					google={this.props.google}
// 					center={{lat: 44.573355, lng: 12.156921}}
// 					height='300px'
// 					zoom={8}
//                     onChange={e => this.forceUpdate()}
// 				    />
//                     <div style={{height: "50px"}}/>
//                     <Card>
//                         <Row>
//                             <Col md="5">
//                                 <h2>Flight information</h2>
//                                 <Row>
//                                     <Col>
//                                 <label for="email">Departure latitude</label>
//                                 <input className="enter-input" id="email" value={this.state.departure_latitude} onChange={e => this.setState({departure_latitude: e.target.value})}></input>
//                                 </Col><Col>
//                                 <label for="email">Departure longitude</label>
//                                 <input className="enter-input" id="email" value={this.state.departure_longitude} onChange={e => this.setState({departure_longitude: e.target.value})}></input>
//                                 </Col>
//                                 </Row>
//                                 <Row>
//                                     <Col>
//                                 <label for="email">Destination latitude</label>
//                                 <input className="enter-input" id="email" value={this.state.destination_latitude} onChange={e => this.setState({destination_latitude: e.target.value})}></input>
//                                 </Col><Col>
//                                 <label for="email">Destination longitude</label>
//                                 <input className="enter-input" id="email" value={this.state.destination_longitude} onChange={e => this.setState({destination_longitude: e.target.value})}></input>
//                                 </Col>
//                                 </Row>
//                                 <label for="email">Date</label>
//                                 <DateRangePicker
//                                         startDate={this.state.start_date}
//                                         endDate={this.state.due_date}
//                                         onStartDateChange={this.setStartDate}
//                                         onEndDateChange={this.setEndDate}
//                                         minimumDate={new Date()}
//                                         minimumLength={1}
//                                         format='yyyy-MM-dd'
//                                         locale={enGB}
//                                     >
//                                         {({ startDateInputProps, endDateInputProps, focus }) => (
//                                             <div className='row date-range'>
//                                                 <Col>
//                                                 <input
//                                                     className={'enter-input' + (focus === START_DATE ? ' -focused' : '')}
//                                                     {...startDateInputProps}
//                                                     placeholder='Departure date'
//                                                     onChange={e => this.setState({departure_date: e.target.value})}
//                                                 />
//                                                 </Col><Col>
//                                                 <input
//                                                     className={'enter-input' + (focus === END_DATE ? ' -focused' : '')}
//                                                     {...endDateInputProps}
//                                                     placeholder='Return date'
//                                                     onChange={e => this.setState({return_date: e.target.value})}
//                                                 />
//                                                 </Col>
//                                             </div>
//                                         )}
//                                 </DateRangePicker>
//                                 <label for="password">Time</label>
//                                 <TimePicker
//                                      className="enter-input"
//                                     time="12:00"
//                                     color1="#EE7F00"
//                                     placeholder="Start Time"
//                                     onSet={(val) => {
//                                       alert('time is ' + JSON.stringify(val));
//                                     }}
//                                     onChange={e => this.setState({time: e.target.value})}
//                                 />
                                
//                             </Col>
//                             <Col md="2">
//                             </Col>
//                             <Col md="5">
//                                 <h2>Passenger information</h2>
//                                 <label for="email">First name</label>
//                                 <input className="enter-input" id="email" onChange={e => this.setState({first_name: e.target.value})}></input>
//                                 <label for="password">Middle name</label>
//                                 <input className="enter-input" id="password" onChange={e => this.setState({middle_name: e.target.value})}></input>
//                                 <label for="email">Last name</label>
//                                 <input className="enter-input" id="email" onChange={e => this.setState({last_name: e.target.value})}></input>
//                                 <label for="password">Email</label>
//                                 <input className="enter-input" id="password" onChange={e => this.setState({email: e.target.value})}></input>
//                                 <label for="password">Phone number</label>
//                                 <input className="enter-input" id="password" onChange={e => this.setState({phone_number: e.target.value})}></input>
//                             </Col>
//                         </Row>
//                         <button className="enter-btn" onClick={() => this.newFlight()}>Continue</button>
//                     </Card>
//                 </Container>
//             </div>
//             }
//             </div>
//         );
//     }
// }

// export default (CreateFlight)