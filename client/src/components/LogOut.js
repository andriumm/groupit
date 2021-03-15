import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function LogUut() {
	let history = useHistory();

	function handleClick() {
		localStorage.removeItem("token");
		history.push("/");
		console.log("Logged out, token deleted");
	}

	return (
		<div>
			<button onClick={handleClick}>Log out</button>
		</div>
	);
}
