import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Footer() {
  const auth = useAuth();

  return (
    <div className="navMenu">
      <ul className="menuList">
        <li> {auth.isLoggedIn && <Link to="/topics">Add a topic</Link>}</li>
        <li>{auth.isLoggedIn && <Link to="/topics">Add a resource</Link>}</li>
        <li>{auth.isLoggedIn && <Link to="/myprofile">Profile</Link>}</li>
        <li> {auth.isLoggedIn && <Link to="/dashboard">Homepage</Link>}</li>
      </ul>
    </div>
  );
}
