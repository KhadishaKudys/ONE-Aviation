import React from "react";
import {Link} from 'react-router-dom';
import {Navbar, Nav, Container} from "react-bootstrap";
import "../../assets/styles/home/components.css"


class Header extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            token: localStorage.hasOwnProperty('access_token')
        }
    }

    componentDidMount(){
        console.log(localStorage)
    }

    render(){
        return(
            <Navbar className="nav" bg="none" variant="light">
                <Container>
                <Navbar.Brand id="brand" href="/home">ONE Aviation</Navbar.Brand>
                <Nav className="m-auto">
                <Nav.Link href="/about-us">About</Nav.Link>
                <Nav.Link href="/blog">Blog</Nav.Link>
                <Nav.Link href="#pricing">Services</Nav.Link>
                </Nav>
                {this.state.token === false ?
                <Nav className="le-auto">
                    <Link to="/sign-in">
                        <button id="nav-btn">Sign in</button>
                    </Link>
                </Nav>
                :
                <Nav className="le-auto">
                    <Link to="/user/profile">
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