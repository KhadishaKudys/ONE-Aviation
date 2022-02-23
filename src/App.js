import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./client/components/main/Header";
import Footer from "./client/components/main/Footer";
import SignIn from "./client/pages/enter/SignIn"
import Main from "./client/pages/main/Main"
import SignUp from "./client/pages/enter/SignUp"
import PasswordReset from "./client/pages/enter/PasswordReset"
import Blog from "./client/pages/blog/Blog"
import Dashboard from "./client/pages/profile/Dashboard"
import CreateAccount from "./client/pages/enter/CreateAccount"
import Post from "./client/pages/blog/Post"
import AboutUs from "./client/pages/about-us/AboutUs"
import NewPassword from "./client/pages/enter/NewPassword"
import EnterOtp from "./client/pages/enter/EnterOtp"
import DiscoverFlights from './client/pages/flight/DiscoverFlights';
import AboutFlight from "./client/pages/flight/AboutFlight"
import CreateFlightFlightInfo from "./client/pages/flight/CreateFlightFlightInfo"
import CreateFlightContactInfo from "./client/pages/flight/CreateFlightContactInfo"
import CreateFlightPersonalInfo from "./client/pages/flight/CreateFlightPersonalInfo"
import CreateFlightPayment from "./client/pages/flight/CreateFlightPayment";
import CreateFlightAdditionalServices from './client/pages/flight/CreateFlightAdditionalServices';
import CreateFlightSuccess from './client/pages/flight/CreateFlightSuccess';
import BookFlightSuccess from './client/pages/flight/BookFlightSuccess';
import BookFlightContactInfo from './client/pages/flight/BookFlightContactInfo';
import BookFlightPersonalInfo from './client/pages/flight/BookFlightPersonalInfo';
import './App.css';

function App() {

  // const dispatch = useDispatch()
  //   const ports = useSelector(state => state.ports)
  //   console.log(ports)

  //   const getPorts = () => {
  //       dispatch({type: "GET_PORTS"})
  //   }

  //   useEffect(() => {
  //       const prt = getPorts();
  //   }, []);

  // useEffect()
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/home" component={Main} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/create-account" component={CreateAccount} />
          <Route path="/password-reset" component={PasswordReset} />
          <Route path="/otp-verification" component={EnterOtp} />
          <Route path="/new-password" component={NewPassword} />
          <Route path="/user/profile" component={Dashboard} />
          <Route path="/about-flight/:flight_id" component={AboutFlight} />
          <Route path="/book-flight/:flight_id/contact-information" component={BookFlightContactInfo} />
          <Route path="/book-flight/:flight_id/personal-information" component={BookFlightPersonalInfo} />
          <Route path="/book-flight/success" component={BookFlightSuccess} />
          {/* <Route>
            <Switch>
              <Route path="/user/profile">
                {localStorage.hasOwnProperty("access_token") === true ? 
                <Dashboard/>
                : <Redirect to="/sign-in"/>
                }
                </Route>
            </Switch>
          </Route> */}

          <Route>
            <Header/>
            <div className="App-content">
              <Switch>
                <Route path="/blog" component={Blog} />
                <Route path="/post" component={Post} />
                <Route path="/create-flight/flight-information" component={CreateFlightFlightInfo}/>
                <Route path="/create-flight/contact-information" component={CreateFlightContactInfo}/>
                <Route path="/create-flight/personal-information" component={CreateFlightPersonalInfo}/>
                <Route path="/create-flight/payment" component={CreateFlightPayment}/>
                <Route path="/create-flight/additional-services" component={CreateFlightAdditionalServices}/>
                <Route path="/create-flight/success" component={CreateFlightSuccess}/>
                <Route path="/discover-flights" component={DiscoverFlights}/>
                <Route path="/about-us" component={AboutUs}/>
              </Switch>
            </div>
            <Footer />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
