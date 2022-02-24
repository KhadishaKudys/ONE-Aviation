import React from "react";
import {Card, Col, Row, Container} from "react-bootstrap"
import "../../assets/styles/flight/create-flight.css"
import Loading from "../../components/reused/Loading"
import 'react-nice-dates/build/style.css'
import { Breadcrumb } from 'antd';

class CreateFlightContactInfo extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            email: '',
            phone_number: '',
            flight_info: this.props.history.location.state
        }
    }

    componentDidMount() {
        console.log(this.props)
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

    openPersonalInfo(){
        this.props.history.push({
            pathname: "/create-flight/personal-information",
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
                    <h1>New Flight</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item><a href="/create-flight/flight-information">Flight Information</a></Breadcrumb.Item>
                        <Breadcrumb.Item>
                        Contact Information
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <br/>

                        <Card>
                    <h2 id="title-h">Contact information</h2>
                                <Row>
                                <Col md="5">
                                <label for="email">Email</label>
                                    
                                <input className="enter-input" id="email" value={this.state.email} onChange={e => this.setState({email: e.target.value})}></input>
                                </Col>
                                <Col md="2">
                                    </Col>
                                <Col md="5">
                                <label for="phone-number">Phone number</label>
                                <input className="enter-input" id="phone-number" value={this.state.phone_number} onChange={e => this.setState({phone_number: e.target.value})}></input>
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

export default (CreateFlightContactInfo)