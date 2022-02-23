import {Col, Row} from 'react-bootstrap'
import React from "react";

export default function Passengers() {
    const allPassengers = (cb) => {
      return cb();
    };
  
    return (
      <div>
        { 
        allPassengers(() => {
                               for(var i = 0; i < 3; i++){
                                <div className="passengers-info">
                                    <Row id="passenger">
                                        <Col>
                                            <h4>Passenger #1</h4>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="5">
                                        <label for="email">First name</label>
                                    <input className="enter-input" id="email" onChange={e => this.setState({first_name: e.target.value})}></input>
                                    <label for="password">Middle name</label>
                                    <input className="enter-input" id="password" onChange={e => this.setState({middle_name: e.target.value})}></input>
                                    <label for="email">Last name</label>
                                    <input className="enter-input" id="email" onChange={e => this.setState({last_name: e.target.value})}></input>
                                        </Col>
                                        <Col md="2">
                                        </Col>
                                            
                                <Col md="5">
                                    <label for="password">Document</label><br/>
                                    <select  onChange={e => this.setState({document_type: e.target.value})}>
                                        <option value="passport">Passport</option>
                                        <option value="id">ID</option>
                                    </select><br/><br/>
                                    {/* <input className="enter-input" id="password" onChange={e => this.setState({email: e.target.value})}></input> */}
                                    <label for="password">Document number</label>
                                    <input className="enter-input" id="password" onChange={e => this.setState({document: e.target.value})}></input>
                                </Col>
                            </Row>
                        </div>
}})}
      </div>
    );
  }