import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Footer() {
  const auth = useAuth();

  return (
    <div className="navMenu">
      <ul className="menuList">
        <li className="menuli"> {auth.isLoggedIn && <Link to="/topics">Add a topic</Link>}</li>
        <li className="menuli">
          {auth.isLoggedIn && <Link to="/addresource">Add a resource</Link>}
        </li>
        <li className="menuli">{auth.isLoggedIn && <Link to="/myprofile">Profile</Link>}</li>
      </ul>
    </div>
  );
}
