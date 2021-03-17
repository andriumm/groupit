import React from 'react'
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";


export default function Logo() {
  const auth = useAuth();
  

  return (
    <div>
      <h1 align="center">
      {!auth.isLoggedIn && <Link to="/">GroupIt!</Link>}
      {auth.isLoggedIn && <Link to="/dashboard">GroupIt!</Link>}
      </h1>
    </div>
  )
}
