import React, { useState } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import "../App.css";
import useAuth from "../hooks/useAuth";

export default function Login({ handleLogin }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();

  const auth = useAuth();

  const handleChange = (e) => {
    e.persist();
    setUser((state) => ({ ...state, [e.target.name]: e.target.value }));
    
  };

  const login = () => {
    auth.signin(user);
    handleLogin();
    history.push("/groupb");
  };

  // const sendToDashboard = () => {
  //   history.push("/dashboard");
  // }


// Deleting based on Germinal's lecture

  // const login = () => {
  //   axios
  //     .post("/users/login", user)
  //     .then((result) => {
  //       //store it locally
  //       localStorage.setItem("token", result.data.token);
  //       handleLogin();
  //       history.push("/groupb");
  //       console.log(result.data.message, result.data.token);
  //     })
  //     .catch((error) => console.log(error));
  // };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label className="form-label" htmlFor="email">
          Email:
          <input
            onChange={handleChange}
            name="email"
            value={user.email}
            type="text"
            className="form-control"
          />
        </label>
        <br />
        <label className="form-label" htmlFor="password">
          Password:
          <input
            onChange={handleChange}
            name="password"
            value={user.password}
            type="password"
            className="form-control"
          />
        </label>
        <button className="loginButton btn" onClick={login}>
          Login
        </button>
      </div>
      <Link to="/resetpassword">Forgot your password?</Link>
    </div>
  );
}
