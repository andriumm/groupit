import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function LogOut({ handleLogout }) {
	let history = useHistory();

	function handleClick() {
		localStorage.removeItem("token");
		history.push("/");
		console.log("Logged out, token deleted");
	}

	return (
		<div>
			<button onClick={() => handleLogout(history)}>Log out</button>
		</div>
	);
}
