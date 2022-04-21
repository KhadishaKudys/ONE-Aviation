import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./client/components/main/Header";
import Footer from "./client/components/main/Footer";
import SignIn from "./client/pages/enter/SignIn";
import Main from "./client/pages/main/Main";
import SignUp from "./client/pages/enter/SignUp";
import PasswordReset from "./client/pages/enter/PasswordReset";
import Blog from "./client/pages/blog/Blog";
import Dashboard from "./client/pages/profile/Dashboard";
import CreateAccount from "./client/pages/enter/CreateAccount";
import Post from "./client/pages/blog/Post";
import AboutUs from "./client/pages/about-us/AboutUs";
import NewPassword from "./client/pages/enter/NewPassword";
import EnterOtp from "./client/pages/enter/EnterOtp";
import DiscoverFlights from "./client/pages/flight/DiscoverFlights";
import AboutFlight from "./client/pages/flight/AboutFlight";
import CreateFlightFlightInfo from "./client/pages/flight/CreateFlightFlightInfo";
import CreateFlightContactInfo from "./client/pages/flight/CreateFlightContactInfo";
import CreateFlightPersonalInfo from "./client/pages/flight/CreateFlightPersonalInfo";
import CreateFlightPayment from "./client/pages/flight/CreateFlightPayment";
import CreateFlightSuccess from "./client/pages/flight/CreateFlightSuccess";
import BookFlightSuccess from "./client/pages/flight/BookFlightSuccess";
import BookFlightContactInfo from "./client/pages/flight/BookFlightContactInfo";
import BookFlightPersonalInfo from "./client/pages/flight/BookFlightPersonalInfo";
import BookFlightPayment from "./client/pages/flight/BookFlightPayment";
import LikedPosts from "./client/pages/profile/LikedPosts";
import Settings from "./client/pages/profile/Settings";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/create-account" component={CreateAccount} />
          <Route path="/password-reset" component={PasswordReset} />
          <Route path="/otp-verification" component={EnterOtp} />
          <Route path="/new-password" component={NewPassword} />
          <Route path="/user/profile" component={Dashboard}></Route>
          <Route path="/user/profile/liked-posts" component={LikedPosts} />
          <Route path="/user/profile/settings" component={Settings} />
          <Route path="/about-flight/:flight_id" component={AboutFlight} />
          <Route
            path="/book-flight/:flight_id/contact-information"
            component={BookFlightContactInfo}
          />
          <Route
            path="/book-flight/:flight_id/personal-information"
            component={BookFlightPersonalInfo}
          />
          <Route
            path="/book-flight/:flight_id/payment"
            component={BookFlightPayment}
          />
          <Route path="/book-flight/success" component={BookFlightSuccess} />
          <Route path="/post/:id" component={Post} />
          <Route>
            <Header />
            <div className="App-content">
              <Switch>
                <Route path="/blog" component={Blog} />
                <Route
                  path="/create-flight/flight-information"
                  component={CreateFlightFlightInfo}
                />
                <Route
                  path="/create-flight/contact-information"
                  component={CreateFlightContactInfo}
                />
                <Route
                  path="/create-flight/personal-information"
                  component={CreateFlightPersonalInfo}
                />
                <Route
                  path="/create-flight/payment"
                  component={CreateFlightPayment}
                />
                <Route
                  path="/create-flight/success"
                  component={CreateFlightSuccess}
                />
                <Route path="/discover-flights" component={DiscoverFlights} />
                <Route path="/about-us" component={AboutUs} />
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
