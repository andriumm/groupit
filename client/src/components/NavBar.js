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
    <div className="navBar pb-2 pt-1">
      {!auth.isLoggedIn && (
        <Link to="/register" className="navBarLink ms-2 me-2">
          Register
        </Link>
      )}

      {!auth.isLoggedIn && (
        <Link to="/login" className="navBarLink mt-1 mb-1">
          Login
        </Link>
      )}

      {auth.isLoggedIn && (
        <Link to="/dashboard" className="navBarLink ms-2 me-2">
          Dashboard
        </Link>
      )}

      {auth.isLoggedIn && (
        <button onClick={logout} className="btn logoutButton ">
          Logout
        </button>
      )}
    </div>
  );
}
