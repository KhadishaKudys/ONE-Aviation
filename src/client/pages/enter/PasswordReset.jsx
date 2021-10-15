import React from "react";
import {Card} from "react-bootstrap";
import Loading from "../../components/reused/Loading"
import "../../assets/styles/enter/password-reset.css"


class PasswordReset extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            verification: {},
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

    goBack(){
        window.history.back();
    }

    async forgotPass(e) {
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
            }
        })
            .catch(err => console.log(err));
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
                            <h1>Forgot your password?</h1>
                            <h2>Enter your email!</h2>
                            <label for="email">Email</label>
                            <input className="enter-input" id="email" onChange={e => this.setState({email: e.target.value})}></input>
                            <button className="enter-btn" onClick={() => this.forgotPass()}>Send</button>
                      
                </Card>
                </div>
                {/* <div id="overlapping">
                    <h1 id="lrg-txt">SIGN IN</h1>
                </div> */}
            </div>
        );
    }
}

export default (PasswordReset);