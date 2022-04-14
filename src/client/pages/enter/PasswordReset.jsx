import React from "react";
import {Card, Alert} from "react-bootstrap";
import Loading from "../../components/reused/Loading"
import "../../assets/styles/enter/password-reset.css"


class PasswordReset extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            verification: {},
            isLoading: true.valueOf,
            emailError: "",
            show_error: false
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

    goBack(){
        window.history.back();
    }

    validate = () => {
        let emailError = '';
        if (this.state.email === ""){
            emailError = '⚠️ Email cannot be empty';
        }
        else {
            if (!this.state.email.includes('@') || !this.state.email.includes('.')){
                emailError = '⚠️ Invalid email';
            }
        }
        if (emailError) {
            this.setState({emailError});
            return false;
        }
        if(!emailError) {
            emailError = "";
            this.setState({emailError});
            return true;
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            this.forgotPass();
        }
    }

    
    alertDisable(){
        setTimeout(() => {
            this.setState({
                show_error: false
            })
          }, 3000);
    }

    async forgotPass() {
        const user = {
            email: this.state.email,
        }
        await fetch('https://one-aviation.herokuapp.com/api/v1/auth/reset/password/verify?email='+user.email, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(async(res) => {
            const data = await res.json();
            console.log(data);
            this.setState({verification:data})
            if( res.ok ) {
                this.props.history.push({
                    pathname: '/otp-verification',
                    state: this.state
                });
            } else{
                this.setState({show_error:true});
            }
        })
            .catch(err => {
                console.log(err);
                this.setState({show_error:true});
            });
    }

    render(){
        return(
            this.state.isLoading ? <Loading/> :
            <div className="pass-reset">
                <div id="back">
                    <button onClick={() => this.goBack()}>← Back</button>
                </div>
                <div id="info">
                <Card className="card">
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                            <h1>Forgot your password?</h1>
                            <h2>Enter your email!</h2>
                            <label for="email">Email</label>
                            <input className="enter-input" id="email" onChange={e => this.setState({email: e.target.value})}></input>
                            <div className="form-errors">{this.state.emailError}</div>
                            <button className="enter-btn" onClick={(e) => this.handleSubmit(e)}>Send</button>
                    </form>
                </Card>
                {this.state.show_error === true ?
                    <Alert variant={'danger'} onChange={this.alertDisable()}>
                        <Alert.Heading>❌ You got an error!</Alert.Heading>
                        We couldn't find an account with that email address.
                    </Alert>
                    : <p></p>
                }
                </div>
            </div>
        );
    }
}

export default (PasswordReset);