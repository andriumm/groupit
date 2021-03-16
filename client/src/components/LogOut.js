import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "../App.css";

export default function LogOut({ handleLogout }) {
  let history = useHistory();

  function handleClick() {
    localStorage.removeItem("token");
    history.push("/");
    console.log("Logged out, token deleted");
  }

  return (
    <div>
      <Link
        onClick={() => handleLogout(history)}
        className="text-dark ms-3 me-1"
      >
        Log out
      </Link>
    </div>
  );
}
