import React from "react";
import FlightSearch from "./FlightSearch"
import Information from "./Information"
import BlogPreview from "./BlogPreview"
import Subscribe from "./Subscribe"
import ClientsComments from "./ClientsComments"

class Main extends React.Component{

    componentDidMount(){
        localStorage.setItem(
            'from_lat', '',
        );
        localStorage.setItem('from_long', '')
        localStorage.setItem('departure_port', '')
        localStorage.setItem('to_lat', '')
        localStorage.setItem('to_long', '')
        localStorage.setItem('destination_port', '')
    }

    render(){
        return(
            <div className="home">
                <FlightSearch />
                <Information />
                <BlogPreview />
                <ClientsComments />
                <Subscribe />
            </div>
        );
    }
}

export default (Main)