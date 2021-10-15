import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
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
import CreateFlight from './client/pages/flight/CreateFlight';
import DiscoverFlights from './client/pages/flight/DiscoverFlights';
import './App.css';

function App() {
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
                <Route path="/create-flight" component={CreateFlight}/>
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
