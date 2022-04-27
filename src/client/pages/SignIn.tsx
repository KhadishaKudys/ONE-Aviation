import React, { useState } from "react";
import { Button, Grid, Card, Alert, AlertTitle } from "@mui/material";
import "./assets/styles/sign-in.css";
import { Link, useNavigate } from "react-router-dom";
import signInBack from "./assets/static/sign-in-back.jpg";

type SignInProps = {};

export const SignIn: React.FC<SignInProps> = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const alertDisable = () => {
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const navigate = useNavigate();

  const signIn = async () => {
    const user = {
      password: password,
      email: email,
    };
    await fetch("https://one-aviation.herokuapp.com/api/v1/auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then(async (res) => {
        const data = await res.json();
        console.log(data.id);
        if (res.ok) {
          sessionStorage.setItem("access_token", data.access_token);
          sessionStorage.setItem("refresh_token", data.refresh_token);
          navigate(`/`);
        } else {
          setShowAlert(true);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="sign-in">
      <div id="back">
        <Link to="/">
          <button>🏠 Main</button>
        </Link>
      </div>
      <Card
        className="card"
        data-aos="fade"
        data-aos-offset="100"
        data-aos-easing="ease-in-sine"
      >
        <Grid container spacing={1}>
          <Grid item md={5} id="enter-card-left">
            <img
              className="enter-img"
              src={signInBack}
              alt="sign-in-back"
            ></img>
          </Grid>
          <Grid item md={7} id="enter-card-right">
            <h1>Welcome,</h1>
            <h2>Sign in to continue!</h2>
            <label htmlFor="email">Email</label>
            <input
              className="enter-input"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <label htmlFor="password">Password</label>
            <input
              className="enter-input"
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <Button className="enter-btn" onClick={signIn}>
              Sign in
            </Button>
          </Grid>
        </Grid>
      </Card>
      {showAlert === true ? (
        <Alert severity="error">
          <AlertTitle>You got an error!</AlertTitle>
          Either email or password is incorrect!
        </Alert>
      ) : null}
    </div>
  );
};
