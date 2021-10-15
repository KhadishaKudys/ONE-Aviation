import React from "react";
import Header from "../../components/main/Header"
import Footer from "../../components/main/Footer"
import Home from "./Home"
import {Container} from "react-bootstrap"
import "../../assets/styles/home/components.css"
import Loading from "../../components/reused/Loading"

class Main extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }}

        componentDidMount() {
            const timer = setTimeout(() => {
                this.setState({
                    isLoading: false
                })
              }, 2000);
              return() => clearTimeout(timer)
        }
    

    render(){
        return(
            <div>
                {this.state.isLoading ? <Loading />
                :
                <div data-aos="fade" data-aos-offset="100" data-aos-easing="ease-in-sine">
                    <Container>
                        <Header />
                    </Container>
                    <Home />
                    <Footer />
                </div>
                }
            </div>
        );
    }
}

export default (Main)