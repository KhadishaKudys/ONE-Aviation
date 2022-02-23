import React from "react";
import {Card, Col, Row} from "react-bootstrap";
import "../../assets/styles/enter/sign-up.css"
import Loading from "../../components/reused/Loading"
import logo from '../../assets/static/backgrounds/enter/sign-up-back.jpg'


class SignUp extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            repeat_password: "",
            isLoading: true,
        }
        this.signUp = this.signUp.bind(this);
    }

    componentDidMount() {
        const timer = setTimeout(() => {
            this.setState({
                isLoading: false
            })
          }, 1500);
          return() => clearTimeout(timer)
    }

    signUp() {
        this.props.history.push({
            pathname: "/create-account",
            state: this.state
        });
    }

    goBack(){
        window.history.back();
    }

    render(){
        return(
            this.state.isLoading ? <Loading/> :
            <div id="sign-up">
                <div id="back">
                    <button onClick={() => this.goBack()}>← Back</button>
                </div>
            <div className="sign-up">
                <Card className="card">
                      <Row className="row">
                        <Col className="column" id="enter-card-left">
                            <img className="enter-img" src={logo} alt="sign-in-back"></img>
                        </Col>
                        <Col className="column" id="enter-card-right">
                            <h1>Create Account,</h1>
                            <h2>Sign up to get started!</h2>
                            <label for="email">Email</label>
                            <input className="enter-input" id="email" onChange={e => this.setState({email: e.target.value})}></input>
                            <label for="password">Password</label>
                            <input className="enter-input" id="password" onChange={e => this.setState({password: e.target.value})}></input>
                            <label for="password">Repeat password</label>
                            <input className="enter-input" id="repeat-password" onChange={e => this.setState({repeat_password: e.target.value})}></input>
                            <button className="enter-btn" onClick={this.signUp}>Sign up</button>
                            <p className="enter-p">Already have an account? <a className="enter-a" href="/sign-in">Sign in</a></p>
                        </Col>
                      </Row>
                </Card>
                {/* <div id="overlapping">
                    <h1 id="lrg-txt">SIGN IN</h1>
                </div> */}
            </div>
            </div>
        );
    }
}

export default (SignUp);