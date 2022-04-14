import React from "react";
import {Card, Col, Row, Container} from "react-bootstrap"
import "../../assets/styles/flight/create-flight.css"
import Loading from "../../components/reused/Loading"
import { Breadcrumb } from 'antd';
import { useEffect } from 'react';


class BookFlightPayment extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            creditcard_number: '',
            cvv: '',
            month: '',
            year: '',
            flight: this.props.history.location.state
        }
    }
    

    componentDidMount() {
        console.log(this.state.flight.order_id)
        window.scrollTo(0,0);
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

    formats(ele,e){
        if(ele.value.length<19){
          ele.value= ele.value.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
          return true;
        }else{
          return false;
        }
      }
      
    numberValidation(e){
        e.target.value = e.target.value.replace(/[^\d ]/g,'');
        return false;
      }

    async payForFlight(e) {
        const flight = {
            credit_card_info: {
                cvv: this.state.cvv,
                month: this.state.month,
                number: this.state.creditcard_number,
                year: this.state.year
            },
            order_id: this.state.flight.order_id
        }
        
        console.log(flight)
        const token = sessionStorage.getItem('access_token')
            await fetch('https://one-aviation.herokuapp.com/api/v1/payments/pay', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(flight),
            }).then(async(res) => {
                const data = await res.json();
                console.log(data);
                if( res.ok ) {
                    console.log('OK');
                    this.props.history.push({
                        pathname: "/book-flight/success"
                    });
                }
            })
                .catch(err => console.log(err));
    }

    render(){

        return(
            <div className="flight">
            {this.state.isLoading ? <Loading />
            :
            <div className="book-flight">
                <Container>
                    <h1>Book flight</h1>
                    <Breadcrumb>
                        <Breadcrumb.Item>
                        <a href="/create-flight/contact-information">Contact Information</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                        <a href="/create-flight/personal-information">Personal Information</a>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                       Payment
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <br/>
                    <Card>
                        <div>
                            <h3>
                            Remained Time
                            </h3>
                            <Row>
                                <Col md="7">
                                    <div className="details">
                                        <h3>Card Number</h3>
                                        <label>Enter the 16-digit card number</label>
                                        <br></br>
                                        <input type='text' onkeypress='return formats(this,event)' onkeyup="return numberValidation(event)"  className="creditcard" id="number"  onChange={e => this.setState({creditcard_number: e.target.value})}></input>
                                    </div>
                                    <div className="details">
                                        <Row>
                                            <Col>
                                                <h3>CVV Number</h3>
                                                <label>Enter the 3-digit card number</label>
                                            </Col>
                                            <Col>
                                            <input className="creditcard" id="cvv"  onChange={e => this.setState({cvv: e.target.value})}></input>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="details">
                                        <Row>
                                            <Col>
                                                <h3>Expiracy Date</h3>
                                                <label>Enter the expiration date of the card</label>
                                            </Col>
                                            <Col>
                                                <Row>
                                                    <Col md="5">
                                                        <input className="creditcard" id="cvv"  onChange={e => this.setState({month: e.target.value})}>
                                                        </input>
                                                    </Col>
                                                    <Col md='2'>
                                                        <h3>/</h3> 
                                                    </Col>
                                                    <Col md='5'>
                                                        <input className="creditcard" id="cvv"  onChange={e => this.setState({year: e.target.value})}>
                                                        </input>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </div>
                                    <button className="pay-btn" onClick={() => this.payForFlight()}>Pay Now</button>
                                </Col>
                                <Col md="1">
                                </Col>

                                <Col md="4">
                                    <Card id="receipt">
                                        <Row>
                                            <Col>
                                                <h5 className='titles'>Company</h5>
                                            </Col>
                                            <Col>
                                                <h5>ONE Aviation</h5>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                            <h5 className='titles'>Order Number</h5>
                                            </Col>
                                            <Col>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                            <h5 className='titles'>Customer Number</h5>
                                            </Col>
                                            <Col>
                                            </Col>
                                        </Row>
                                        <div id="sum">
                                        <h5 className='titles'>You have to pay</h5>
                                        
                                        </div>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                        
                    </Card>
                </Container>
            </div>
            }
            </div>
        );
    }
}

export default (BookFlightPayment)