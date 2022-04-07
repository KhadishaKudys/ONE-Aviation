import React from "react";
import {Card, Container, Row, Col, Alert} from "react-bootstrap"
import "../../assets/styles/home/subscribe.css"


class Subscribe extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            is_authorized: false,
            show_danger: false, 
            show_success: false,
            token: sessionStorage.getItem('access_token')
        }
    }

    async emailSubscription() {
        var fetch_header = {}
        if (this.state.is_authorized === true) {
            fetch_header = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.token
            }
        } else {
            fetch_header = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        await fetch(`https://one-aviation.herokuapp.com/api/api/v1/subscription/subscribe/${this.state.email}`, {
            method: 'PUT',
            headers: fetch_header,
        }).then(async(res) => {
            const data = await res.json();
            console.log(data);
            this.setState({flight_info:data})
            if( res.ok ) {
                console.log('OK');
                this.setState({
                    show_success : true
                })
            }
        })
            .catch(err => this.setState({
                show_danger : true
            }));
    }

    alertDisable(){
        setTimeout(() => {
            this.setState({
                show_success: false
            })
          }, 3000);
    }


    render(){
        return(
            <div className="subscribe">
                <Container id="info-cont">
                    <Row>
                        <Col md={5}>
                            <Card id="card-1" data-aos="fade-right" data-aos-offset="200" data-aos-easing="ease-in-sine">
                                <label for="email">Name</label>
                                <input className="enter-input" id="name"></input>
                                <label for="email">Email</label>
                                <input className="enter-input" id="email"></input>
                                <label for="password">Message</label>
                                <textarea className="enter-input" id="message"></textarea>
                                <div className="btn-subscribe">
                                    <button>Submit</button>
                                </div>
                            </Card>
                        </Col>
                        <Col md={2}>
                        </Col>
                        <Col md={5} className="col-info">
                            <h5 data-aos="fade-up"
     data-aos-anchor-placement="top-bottom" data-aos-easing="ease-in-sine" data-aos-offset="200">Contact us & Stay in touch</h5>
                            <h1 data-aos="fade-up"
     data-aos-anchor-placement="top-bottom" data-aos-easing="ease-in-sine" data-aos-offset="200" data-aos-delay="100">Subscribe & Send Us A Message</h1>
                            <Card id="card-2" data-aos="fade-left" data-aos-easing="ease-in-sine" data-aos-delay="200">
                                <label for="email">Email</label>
                                <input className="enter-input" id="email" onChange={e => this.setState({email: e.target.value})}></input>
                                <div className="btn-subscribe">
                                    <button onClick={()=> this.emailSubscription()}>Subscribe</button>
                                </div>
                            </Card>
                        </Col>

                    </Row>
                    {this.state.show_danger === true ?
                    <Alert variant={'danger'} onChange={this.alertDisable()}>
                        <Alert.Heading>You got an error!</Alert.Heading>
                        Email is incorrect!
                    </Alert>
                    : <p></p>
                    }
                    {this.state.show_success === true ?
                    <Alert variant={'success'} onChange={this.alertDisable()}>
                        <Alert.Heading>Success!</Alert.Heading>
                        Your email is subscribed to our news and notifications!
                    </Alert>
                    : <p></p>
                    }
                </Container>
                    
            </div>
        );
    }
}

export default (Subscribe)