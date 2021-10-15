import React from "react";
import FlightSearch from "./FlightSearch"
import Information from "./Information"
import BlogPreview from "./BlogPreview"
import Subscribe from "./Subscribe"
import ClientsComments from "./ClientsComments"

class Main extends React.Component{
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