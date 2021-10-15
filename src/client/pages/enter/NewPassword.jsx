import React from "react";
import Loading from "../../components/reused/Loading"
import {Card} from "react-bootstrap";
import "../../assets/styles/enter/password-reset.css"


class NewPassword extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            email: this.props.location.state.email,
            password: '',
            password_2: '',
            verification: this.props.location.state.verification
        }
    }

    componentDidMount() {
        console.log(this.state)
        const timer = setTimeout(() => {
            this.setState({
                isLoading: false
            })
          }, 1500);
          return() => clearTimeout(timer)
    }

    async newPass(e) {
        if(this.state.password.localeCompare(this.state.password_2) === 0){
            const user = {
                password: this.state.password, 
                email: this.state.email
            }
            await fetch('https://one-aviation.herokuapp.com/api/v1/auth/reset/password', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer '+this.state.verification.token
                },
                body: JSON.stringify(user),
            }).then(async(res) => {
                const data = await res.json();
                console.log(data);
                if( res.ok ) {
                    this.props.history.push({
                        pathname: '/sign-in'
                    });
                }
            })
                .catch(err => console.log(err));
        }
    }

    render(){
        return(
            this.state.isLoading ? <Loading/> :
            <div className="pass-reset">
                <div id="info">
                <Card className="card">
                            <h1>Verification is passed!</h1>
                            <h2>Create new password</h2>
                            <label for="new-pass">New password</label>
                            <input className="enter-input" id="new-pass" onChange={e => this.setState({password: e.target.value})}></input>
                            <label for="new-pass-2">Repeat password</label>
                            <input className="enter-input" id="new-pass-2" onChange={e => this.setState({password_2: e.target.value})}></input>
                            <button className="enter-btn" onClick={() => this.newPass()}>Change</button>
                      
                </Card>
                </div>
                {/* <div id="overlapping">
                    <h1 id="lrg-txt">SIGN IN</h1>
                </div> */}
            </div>
        );
    }
}

export default (NewPassword);