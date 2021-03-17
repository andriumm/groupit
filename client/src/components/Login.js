import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const auth = useAuth();

  const handleChange = (e) => {
    e.persist();
    setUser((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const login = () => {
    auth.signin(user);
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
        <button className="loginButton btn" onClick={login}>
          Login
        </button>
      </div>
      <Link to="/resetpassword">Forgot your password?</Link>
    </div>
  );
}
