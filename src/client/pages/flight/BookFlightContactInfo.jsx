import React from "react";
import {Card, Col, Row, Container} from "react-bootstrap"
import "../../assets/styles/flight/create-flight.css"
import Loading from "../../components/reused/Loading"
import 'react-nice-dates/build/style.css'

class BookFlightContactInfo extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            email: '',
            phone_number: '',
            flight_info: this.props.history.location.state,
            flight_id: this.props.match.params.flight_id
        }
    }

    componentDidMount() {
        console.log(this.props.match)
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

    openPersonalInfo(){
        this.props.history.push({
            pathname: `/book-flight/${this.state.flight_id}/personal-information`,
            state: this.state
        });
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
                    <h2>Contact information</h2>
                                <Row>
                                <Col md="5">
                                <label for="email">Email</label>
                                    
                                <input className="enter-input" id="email" value={this.state.destination_latitude} onChange={e => this.setState({email: e.target.value})}></input>
                                </Col>
                                <Col md="2">
                                    </Col>
                                <Col md="5">
                                <label for="phone-number">Phone number</label>
                                <input className="enter-input" id="phone-number" value={this.state.destination_longitude} onChange={e => this.setState({phone_number: e.target.value})}></input>
                                </Col>
                                </Row>
                            
                        <button className="enter-btn" onClick={() => this.openPersonalInfo()}>Continue</button>
                    </Card>
                </Container>
            </div>
            }
            </div>
        );
    }
}

export default (BookFlightContactInfo)