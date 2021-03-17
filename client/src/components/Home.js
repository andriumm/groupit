import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import { useState } from "react";
import "../App.css";

export default function Home() {
  let history = useHistory();
  // let [signedIn, setSignedIn] = useState(localStorage.getItem("token"));
  // const [subtopic, setSubtopic] = useState({});

  // const handleLogin = () => {
  //   setSignedIn(localStorage.getItem("token"));
  //   setSignedIn(true);
  // };

  return (
    <Router>
      <div>
        <h2>Don't forget any online resource you are interested in!</h2>
        <p>
          With this app, keep all your links (readings, videos, podcasts...)
          organized and make sure you can easily access them at any time you
          want
        </p>
        <div>
          <p className="text-center my-4">CREATE A NEW ACCOUNT NOW:</p>
          <Link
            to="/register"
            onClick={() => history.push("/register")}
            className="text-dark ms-3 me-1"
          >
            <button className="btn homepageButton">Sign Up</button>
          </Link>
        </div>
        <div>
          <p className="text-center my-4">If you already have an account:</p>
          <Link
            to="/login"
            onClick={() => history.push("/login")}
            className="text-dark ms-3 me-1"
          >
            <button className="btn homepageButton">Sign In</button>
          </Link>
        </div>
      </div>
    </Router>
  );
}
