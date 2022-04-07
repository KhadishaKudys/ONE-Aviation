import React from "react";
import {Link} from 'react-router-dom';
import {Navbar, Nav, Container} from "react-bootstrap";
import "../../assets/styles/home/components.css"


class Header extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            token: sessionStorage.hasOwnProperty('access_token')
        }
    }

    componentDidMount(){
        console.log(sessionStorage)
    }

    render(){
        return(
            <Navbar className="nav" bg="none" variant="light">
                <Container>
                <Navbar.Brand id="brand" href="/">THE Airline</Navbar.Brand>
                <Nav className="m-auto">
                <Nav.Link href="/">Main</Nav.Link>
                <Nav.Link href="/about-us">About us</Nav.Link>
                <Nav.Link href="/blog">Blog</Nav.Link>
                </Nav>
                {this.state.token === false ?
                <Nav className="le-auto">
                    <Link to="/sign-in">
                        <button id="nav-btn">Sign in</button>
                    </Link>
                </Nav>
                :
                <Nav className="le-auto">
                    <Link to="/user/profile/orders">
                        <button id="nav-btn">My account</button>
                    </Link>
                </Nav>
                }
                </Container>
            </Navbar>
        );
    }
}

export default (Header);