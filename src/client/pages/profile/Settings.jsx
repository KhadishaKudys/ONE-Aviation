import React from "react";
import {Card, Col, Row} from "react-bootstrap";
import "../../assets/styles/profile/settings.css"
import Loading from "../../components/reused/Loading"
import empty from '../../assets/static/backgrounds/profile/empty-cart.png'
import {Link} from "react-router-dom";
import ticket_plane from "../../assets/static/flights/ticket-plane.svg"

class Settings extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            isLoading: true,
            token: localStorage.getItem("access_token"),
            order_history: [],
            email: 'sandra@fake.com',
            is_subscribed: true
        }
    }

    componentDidMount() {
        const timer = setTimeout(() => {
            this.setState({
                isLoading: false
            })
          }, 1500);
          return() => clearTimeout(timer)
    }

    async emailSubscribe() {
        await fetch(`https://one-aviation.herokuapp.com/api/api/v1/subscription/subscribe/${this.state.email}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.token
            },
        }).then(async(res) => {
            const data = await res.json();
            console.log(data);
            this.setState({flight_info:data})
            if( res.ok ) {
                console.log('OK');
                this.setState({is_subscribed:true});
                alert('You subscribed successfully!')
            }
        })
            .catch(err => console.log(err));
    }

    async emailUnsubscribe() {
        await fetch(`https://one-aviation.herokuapp.com/api/api/v1/subscription/unsubscribe/${this.state.email}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.state.token
            },
        }).then(async(res) => {
            const data = await res.json();
            console.log(data);
            this.setState({flight_info:data})
            if( res.ok ) {
                console.log('OK');
                this.setState({is_subscribed:false});
                alert('You unsubscribed successfully!')
            }
        })
            .catch(err => console.log(err));
    }

    render(){
        return(
            this.state.isLoading ? <Loading/> :
            <div className="settings">
                <h1>Settings</h1>
                <div>
                    <br></br>
                    <Row>
                        <Col md={3}>
                        <h3>Email subscription</h3> 
                        </Col>
                        <Col>
                        {this.state.is_subscribed?
                        <button onClick={()=>this.emailUnsubscribe()}>Unsubscribe</button>
                        : <button onClick={()=>this.emailSubscribe()}>Subscribe</button> 
                        }
                        </Col> 
                    </Row>   
                </div>
            </div>
        );
    }
}

export default (Settings);