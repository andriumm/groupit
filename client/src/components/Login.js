import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../App.css";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const auth = useAuth();
  let history = useHistory();

  const handleChange = (e) => {
    e.persist();
    setUser((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const login = () => {
    // auth.signin(user);

    //test test
    auth.signin(user, () => history.push("/dashboard"));
  };

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
        <br />
        <button className="loginButton btn mb-2 mt-1" onClick={login}>
          Login
        </button>
      </div>
      <Link to="/resetpassword">Forgot your password?</Link>
    </div>
  );
}
