import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "../App.css";

export default function Login({ handleLogin }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  let history = useHistory();

  const handleChange = (e) => {
    e.persist();
    setUser((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const login = () => {
    axios
      .post("/users/login", user)
      .then((result) => {
        //store it locally
        localStorage.setItem("token", result.data.token);
        handleLogin();
        history.push("/groupb");
        console.log(result.data.message, result.data.token);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label className="form-label" htmlFor="email">
          Email
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
          Password
          <input
            onChange={handleChange}
            name="password"
            value={user.password}
            type="password"
            className="form-control"
          />
        </label>
        <br />
        <button className="loginButton btn" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
}
