import React from 'react';
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";


export default function Footer() {
  const auth = useAuth();

  return (
    <footer>
      
      <div>{auth.isLoggedIn && <Link to="/topics">Add a topic</Link>}</div>
      <div>{auth.isLoggedIn && <Link to="/addresource">Add a resource</Link>}</div>
      <div>{auth.isLoggedIn && <Link to="/myprofile">Profile</Link>}</div>
      <div>{auth.isLoggedIn && <Link to="/dashboard">Homepage</Link>}</div>

    </footer>
  )
}


