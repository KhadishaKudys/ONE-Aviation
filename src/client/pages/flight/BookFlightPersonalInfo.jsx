import React from "react";
import {Card, Col, Row, Container} from "react-bootstrap"
import "../../assets/styles/flight/create-flight.css"
import Loading from "../../components/reused/Loading"



class BookFlightPersonalInfo extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            first_name: '',
            middle_name: '',
            last_name: '',
            document: '',
            passengers_num: 5,
            flight: this.props.history.location.state,
            document_type: ''
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

    async upd(){
        this.componentDidMount()
    }

    async bookFlight(e) {
        const token = sessionStorage.getItem('access_token')
        const booking = {
            document: {
                number: this.state.document,
                type: this.state.document_type
            },
            email: this.state.flight.email,
            order_id: parseInt(this.state.flight.flight_id),
            passengers: [
                {
                    direction: "FORWARD",
                    document: {
                        number: this.state.document,
                        type: this.state.document_type
                    },
                    first_name: this.state.first_name,
                    middle_name: this.state.middle_name,
                    last_name: this.state.last_name,
                    phone_number: this.state.flight.phone_number,
                    email: this.state.flight.email
                }
            ],
            phone_number: this.state.flight.phone_number,
        }
        await fetch(`https://one-aviation.herokuapp.com/api/v1/order/join`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(booking),
        }).then(async(res) => {
            const data = await res.json();
            console.log(data);
            this.setState({available_flights:data})
            if( res.ok ) {
                console.log('OK');
                this.props.history.push({
                    pathname: "/book-flight/success"
                });
            }
        })
            .catch(err => console.log(err));
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
        this.setState({due_date: date});
    }

    setStartDate = (date) => {
        this.setState({start_date: date});
    }

    render(){
        return(
            <div className="flight">
            {this.state.isLoading ? <Loading />
            :
            <div className="create-flight">
                <Container>
                    <h1>Book flight</h1>
                    <Card>
                                <h2>Personal information</h2>
                                {/* {this.state.blogs.map(pos =>  { */}
                                <div className="passengers-info">
                                    <Row id="passenger">
                                        <Col>
                                            <h4>Passenger #1</h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="5">
                                        <label for="email">First name</label>
                                    <input className="enter-input" id="email" onChange={e => this.setState({first_name: e.target.value})}></input>
                                    <label for="password">Middle name</label>
                                    <input className="enter-input" id="password" onChange={e => this.setState({middle_name: e.target.value})}></input>
                                    <label for="email">Last name</label>
                                    <input className="enter-input" id="email" onChange={e => this.setState({last_name: e.target.value})}></input>
                                        </Col>
                                        <Col md="2">
                                        </Col>
                                            
                                <Col md="5">
                                    <label for="password">Document</label><br/>
                                    <select  onChange={e => this.setState({document_type: e.target.value})}>
                                        <option value="passport">Passport</option>
                                        <option value="id">ID</option>
                                    </select><br/><br/>
                                    {/* <input className="enter-input" id="password" onChange={e => this.setState({email: e.target.value})}></input> */}
                                    <label for="password">Document number</label>
                                    <input className="enter-input" id="password" onChange={e => this.setState({document: e.target.value})}></input>
                                </Col>
                            </Row>
                        </div>
                                {/* })} */}
                        <button className="enter-btn" onClick={() => this.bookFlight()}>Continue</button>
                    </Card>
                </Container>
            </div>
            }
            </div>
        );
    }
}

export default (BookFlightPersonalInfo)