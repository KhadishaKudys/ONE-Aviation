import React from "react";
import Loading from "../../components/reused/Loading"
import {Card} from "react-bootstrap";
import "../../assets/styles/enter/password-reset.css"


class EnterOtp extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            otp: '',
            verification: this.props.location.state.verification,
            email: this.props.location.state.email
        }
    }

    componentDidMount() {
        console.log(this.state.verification)
        const timer = setTimeout(() => {
            this.setState({
                isLoading: false
            })
          }, 1500);
          return() => clearTimeout(timer)
    }


    async checkOtp() {
        if(this.state.otp.localeCompare(this.state.verification.otp) === 0){
            console.log('kk')
            this.props.history.push({
                pathname: '/new-password',
                state: this.state
            });
        }
    }

    render(){
        return(
            this.state.isLoading ? <Loading/> :
            <div className="pass-reset">
                <div id="info">
                <Card className="card">
                            <h1>Received an email?</h1>
                            <h2>Enter your one-time password!</h2>
                            <label for="otp">One-time password</label>
                            <input className="enter-input" id="otp" onChange={e => this.setState({otp: e.target.value})}></input>
                            <button className="enter-btn" onClick={() => this.checkOtp()}>Check</button>
                      
                </Card>
                </div>
                {/* <div id="overlapping">
                    <h1 id="lrg-txt">SIGN IN</h1>
                </div> */}
            </div>
        );
    }
}

export default (EnterOtp);