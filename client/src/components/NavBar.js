import React from "react";
import { Link, useHistory } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function NavBar() {
  const auth = useAuth();
  const history = useHistory();
  const logout = () => {
    auth.signout(() => history.push("/login"));
  };

  return (
    <div className="navBar">
      {!auth.isLoggedIn && (
        <Link to="/register" className="navBarLink">
          Register
        </Link>
      )}

      {!auth.isLoggedIn && (
        <Link to="/login" className="navBarLink">
          Login
        </Link>
      )}

      {auth.isLoggedIn && (
        <Link to="/dashboard" className="navBarLink">
          Dashboard
        </Link>
      )}

      {auth.isLoggedIn && (
        <button onClick={logout} className="btn logoutButton">
          Logout
        </button>
      )}
    </div>
  );
}
