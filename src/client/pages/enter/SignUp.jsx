import React from "react";
import {Card, Col, Row, Alert} from "react-bootstrap";
import "../../assets/styles/enter/sign-up.css"
import Loading from "../../components/reused/Loading";
import logo from '../../assets/static/backgrounds/enter/sign-up-back.jpg';
import { Link } from "react-router-dom";
import PasswordStrengthBar from 'react-password-strength-bar';


class SignUp extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            repeat_password: "",
            isLoading: true,
            emailError: "",
            passwordError: "",
            passwordMatchError: "",
            show: false
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

    alertDisable(){
        setTimeout(() => {
            this.setState({
                show: false
            })
          }, 3000);
    }

    validate = () => {
        let emailError = '';
        let passwordError = '';
        let passwordMatchError = '';
        if (!this.state.email.includes('@') || !this.state.email.includes('.')){
            emailError = '⚠️ Invalid email';
        }
        if(this.state.password.length < 8){
            passwordError = '⚠️ Password must be at least 8 characters';
        }
        if(this.state.password !== this.state.repeat_password) {
            passwordMatchError = '⚠️ Passwords do not match';
            this.setState({show:true});
        }
        if (emailError || passwordError || passwordMatchError) {
            this.setState({emailError, passwordError, passwordMatchError});
            return false;
        }
        if(!emailError && !passwordError && !passwordMatchError) {
            emailError = "";
            passwordError = "";
            passwordMatchError = "";
            this.setState({emailError, passwordError, passwordMatchError});
            return true;
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            this.signUp();
        }
    }

    signUp() {
        this.props.history.push({
            pathname: "/create-account",
            state: this.state
        });
    }

    render(){
        return(
            this.state.isLoading ? <Loading/> :
            <div id="sign-up">
                <div id="back">
                    <Link to="/">
                            <button>🏠 Main</button>
                    </Link>
                </div>
            <div className="sign-up">
                <Card className="card">
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                      <Row className="row">
                        <Col className="column" id="enter-card-left">
                            <img className="enter-img" src={logo} alt="sign-in-back"></img>
                        </Col>
                        <Col className="column" id="enter-card-right">
                            <h1>Create Account,</h1>
                            <h2>Sign up to get started!</h2>
                            <label for="email">Email</label>
                            <input className="enter-input" id="email" onChange={e => this.setState({email: e.target.value})}></input>
                            <div className="form-errors">{this.state.emailError}</div>
                            <label for="password">Password</label>
                            <input className="enter-input" id="password" type="password" onChange={e => this.setState({password: e.target.value})}></input>
                            <PasswordStrengthBar className="pass-bar" password={this.state.password} minLength={8} />
                            <div className="form-errors">{this.state.passwordError}</div>
                            <label for="password">Repeat password</label>
                            <input className="enter-input" id="repeat-password" type="password" onChange={e => this.setState({repeat_password: e.target.value})}></input>
                            <button className="enter-btn" onClick={(e) => this.handleSubmit(e)}>Sign up</button>
                            <p className="enter-p">Already have an account? <a className="enter-a" href="/sign-in">Sign in</a></p>
                        </Col>
                      </Row>
                    </form>
                </Card>
                {this.state.show === true ?
                    <Alert variant={'danger'} onChange={this.alertDisable()}>
                        <Alert.Heading>❌ You got an error!</Alert.Heading>
                        Passwords don't match!
                    </Alert>
                    : <p></p>
                }
            </div>
            </div>
        );
    }
}

export default (SignUp);