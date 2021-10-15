import React from "react";
// import {Card, Container, Row, Col} from "react-bootstrap"
import "../../assets/styles/home/components.css"
import { FingerprintSpinner } from 'react-epic-spinners'


class Loading extends React.Component{
    render(){
        return(
            <div className="loading">
                <FingerprintSpinner color="#0076BD"/>
            </div>
        );
    }
}

export default (Loading)