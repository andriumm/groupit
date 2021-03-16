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
    <div>
      {!auth.isLoggedIn && <Link to="/register">Register</Link>}

      {!auth.isLoggedIn && <Link to="/login">Login</Link>}

      {auth.isLoggedIn && <Link to="/dashboard">Dashboard</Link>}

      {auth.isLoggedIn && (
        <button onClick={logout} className="btn btn-dark">
          Logout
        </button>
      )}
    </div>
  );
}