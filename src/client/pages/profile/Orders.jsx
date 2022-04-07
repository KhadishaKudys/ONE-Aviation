import React from "react";
import {Card, Col, Row} from "react-bootstrap";
import "../../assets/styles/profile/orders.css"
import Loading from "../../components/reused/Loading"
import empty from '../../assets/static/backgrounds/profile/empty-cart.png'
import {Link} from "react-router-dom";
import ticket_plane from "../../assets/static/flights/ticket-plane.svg"

class Orders extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            isLoading: true,
            access_token: sessionStorage.getItem("access_token"),
            order_history: []
        }
    }

    componentDidMount() {
        const timer = setTimeout(() => {
            this.orderHistory()
            this.setState({
                isLoading: false
            })
          }, 1500);
          return() => clearTimeout(timer)
    }

    async orderHistory(e) {
        await fetch('https://one-aviation.herokuapp.com/api/v1/order/history?limit=&page=&order_by=&order_key=', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ this.state.access_token
            }
        }).then(async(res) => {
            const data = await res.json();
            console.log('rr')
            console.log(data);
            this.setState({order_history:data.orders});
        })
            .catch(err => this.setState({order_history: []}));
    }

    render(){
        return(
            this.state.isLoading ? <Loading/> :
            <div className="orders">
                            <h1>My Orders</h1>
                            {this.state.order_history.length == 0 ?
                                <div className="nothing">
                                    <div id="empty">
                                        <img src={empty} alt="empty-cart" width="30%"/>
                                    </div>
                                    <h3>You don't have any orders!</h3>
                                    <button>Search flights</button>
                                </div>
                            :
                            <div >
                                {this.state.order_history.orders.map(flight => 
                                    <Card className="ticket">
                                    <Row>
                                        <Col md='10'>
                                    <Row>
                                        <Col md="2" id='from'>
                                            <h2>{flight.departure_time}</h2>
                                        </Col>
                                        <Col md="8">
                                            <p id="time">1h 50m</p>
                                        </Col>
                                        <Col md="2">
                                            <h2>{flight.arrival_time}</h2>
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
                                            <h3>FLR</h3>
                                        </Col>
                                        <Col md="8">
                                            <p id="way">Direct</p>
                                        </Col>
                                        <Col md="2">
                                            <h3>CDG</h3>
                                        </Col>
                                    </Row>
                                    
                                    </Col>
                                    <Col md="2" id="price">
                                        <h2 id="cost">€ {parseInt(flight.price)}</h2>
                                        <Link to={`/about-flight/${flight.id}`}><button id="nav-btn">Select</button></Link>
                                    </Col>
                                    </Row>
                                </Card>
                                )}
                            </div>
                                }
            </div>
        );
    }
}

export default (Orders);