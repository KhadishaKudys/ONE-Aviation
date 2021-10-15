import React from "react";
import {Card, Col, Container, Row} from "react-bootstrap";
import "../../assets/styles/enter/sign-up.css"
import Loading from "../../components/reused/Loading"
import logo from '../../assets/static/backgrounds/enter/sign-up-back.jpg'


class CreateAccount extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            middle_name: "",
            last_name: "",
            phone_number: "",
            isLoading: true
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

    async createAccount(e) {
        let userPrev = this.props.history.location.state;
        const user = {
            email: userPrev.email,
            password: userPrev.password,
            first_name: this.state.first_name,
            middle_name: this.state.middle_name,
            last_name: this.state.last_name,
            phone_number: this.state.phone_number,
        }
        await fetch('https://one-aviation.herokuapp.com/api/v1/auth/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        }).then((res) => {
            console.log(res);
            if( res.ok ) {
                this.props.history.push('/sign-in');
            }
        })
            .catch(err => console.log(err));
    }

    goBack(){
        window.history.back();
    }

    render(){
        return(
            this.state.isLoading ? <Loading/> :
            <div className="create-account">
                <div id="back">
                    <button onClick={() => this.goBack()}>← Back</button>
                </div>
                <div id="info">
                <Card className="card">
                    <h1>Congrats,</h1>
                    <h2>Continue by filling the remaining fields!</h2>
                      <Row className="row">
                        <Col className="column" id="enter-card-left">
                        <label htmlFor="first-name">First name*</label>
                            <input className="enter-input" id="first-name" onChange={e => this.setState({first_name: e.target.value})}></input>
                            <label htmlFor="middle-name">Middle name</label>
                            <input className="enter-input" id="middle-name" onChange={e => this.setState({middle_name: e.target.value})}></input>
                        </Col>
                        <Col className="column" id="enter-card-right">
                        <label htmlFor="last-name">Last name*</label>
                            <input className="enter-input" id="last-name" onChange={e => this.setState({last_name: e.target.value})}></input>
                            <label htmlFor="phone-number">Phone number*</label>
                            <input className="enter-input" id="phone-number" onChange={e => this.setState({phone_number: e.target.value})}></input>
                        </Col>
                      </Row>
                      <button className="enter-btn" onClick={() => this.createAccount()}>Complete</button>
                </Card>
                </div>
                {/* <div id="overlapping">
                    <h1 id="lrg-txt">SIGN IN</h1>
                </div> */}
            </div>
        );
    }
}

export default (CreateAccount);