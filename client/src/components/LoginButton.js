import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function LoginButton() {
	let history = useHistory();

	// function handleClick() {
	// 	history.push("/login");
	// }

	return (
		<div>
			<Link onClick={() => history.push("/login")}>Log In</Link>
		</div>
	);
}
