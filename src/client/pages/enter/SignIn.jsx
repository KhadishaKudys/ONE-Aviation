import React from "react";
import {Card, Col, Container, Row, Alert, Form} from "react-bootstrap";
import "../../assets/styles/enter/sign-in.css"
import Loading from "../../components/reused/Loading"
import {Link} from "react-router-dom";
import AOS from 'aos'
import logo from '../../assets/static/backgrounds/enter/sign-in-back.jpg'

// const AlertDismissible = ({show}) => {
//     if (show === true) {
//       return (
//         <Alert variant="danger" onClose={() => this.setState({show: false})>
//           <Alert.Heading>You got an error!</Alert.Heading>
//           <p>
//             Either email or password is incorrect!
//           </p>
//         </Alert>
//       );
//     } return null;
// }

class SignIn extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            isLoading: true
        }
    }

    componentDidMount() {
        AOS.init();
        const timer = setTimeout(() => {
            this.setState({
                isLoading: false
            })
          }, 1500);
          return() => clearTimeout(timer)
    }

    goBack(){
        window.history.back();
    }

    alertDisable(){
        setTimeout(() => {
            this.setState({
                show: false
            })
          }, 3000);
    }

    async signIn(e) {
        const user = {
            password: this.state.password, 
            email: this.state.email
        }
        await fetch('https://one-aviation.herokuapp.com/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        }).then(async(res) => {
            const data = await res.json();
            console.log(data);
            if( res.ok ) {
                localStorage.setItem("access_token", data.access_token);
                localStorage.setItem("refresh_token", data.refresh_token);
                localStorage.setItem("isLoggedIn", true);
                this.props.history.push({
                    pathname: '/user/profile',
                    state: data
                });
            } else{
                this.setState({show: true})
            }
        })
            .catch(err => 
                console.log(err),
                
            )
    }

    render(){
        return(
            this.state.isLoading ? <Loading/> :
            <div id="sign-in">
                <div id="back">
                    <button onClick={() => this.goBack()}>← Back</button>
                </div>
            <div className="sign-in">
                <Card className="card"  data-aos="fade" data-aos-offset="100" data-aos-easing="ease-in-sine">
                      <Row className="row">
                        <Col className="column" id="enter-card-left">
                            <img className="enter-img" src={logo} alt="sign-in-back"></img>
                        </Col>
                        <Col className="column" id="enter-card-right">
                            <h1>Welcome,</h1>
                            <h2>Sign in to continue!</h2>
                            {/* <Form.Group as={Col} controlId="signUpEmailValidation" >
                            <label for="email">Email</label>
                                        <Form.Control 
                                            required
                                            type="email"
                                            id="email"
                                            className="enter-a"
                                            onChange={e => this.setState({email: e.target.value})}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter an email
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <label for="password">Password</label>
                                    <Form.Group as={Col} controlId="signUpPasswordValidation">
                                        <Form.Control
                                            required
                                            type="password"
                                            id="password"
                                            className="enter-a"
                                            onChange={e => this.setState({password: e.target.value})}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please enter a password
                                        </Form.Control.Feedback>
                                    </Form.Group> */}
                            <label for="email">Email</label>
                            <input className="enter-input" id="email" onChange={e => this.setState({email: e.target.value})}></input>
                            <label for="password">Password</label>
                            <input className="enter-input" id="password" type="password" onChange={e => this.setState({password: e.target.value})}></input>
                                <button className="enter-btn" onClick={() => this.signIn()}>Sign in</button>
                            <br></br>
                            <a className="pass-a" href="/password-reset">Forgot your password?</a>
                            <p className="enter-p">Don't have an account? <a className="enter-a" href="/sign-up">Sign up</a></p>
                        </Col>
                      </Row>
                </Card>
                {this.state.show === true ?
                    <Alert variant={'danger'} onChange={this.alertDisable()}>
                        <Alert.Heading>You got an error!</Alert.Heading>
                        Either email or password is incorrect!
                    </Alert>
                    : <p></p>
                }
                {/* <div id="overlapping">
                    <h1 id="lrg-txt">SIGN IN</h1>
                </div> */}
            </div>
            </div>
        );
    }
}

export default (SignIn);