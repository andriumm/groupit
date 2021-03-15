import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function LogOut() {
	let history = useHistory();

	function handleClick() {
		localStorage.removeItem("token");
		history.push("/");
		console.log("Logged out, token deleted");
	}

	return (
		<div>
			<Link onClick={handleClick}>Log out</Link>
		</div>
	);
}
