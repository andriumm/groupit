import React from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useHistory,
} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import { useState } from "react";
import GroupB from "./Groupb";

export default function Home() {
	let history = useHistory();
	let [signedIn, setSignedIn] = useState(localStorage.getItem("token"));
	// const [subtopic, setSubtopic] = useState({});

	const handleLogin = () => {
		setSignedIn(localStorage.getItem("token"));
		setSignedIn(true);
	};

	return (
		<Router>
			<div className="text-center my-4">
				<h4 className="my-4">
					Don't forget any online resource you are interested in!
				</h4>
				<h5 className="my-4">
					With this app, keep all your links (readings, videos, podcasts...)
					organized and make sure you can easily access them at any time you
					want
				</h5>
				<Link
					to="/register"
					onClick={() => history.push("/register")}
					className="text-dark ms-3 me-1"
				>
					<h2>Sign Up</h2>
				</Link>
				<h6>If you have an account</h6>
				<Link
					to="/login"
					onClick={() => history.push("/login")}
					className="text-dark ms-3 me-1"
				>
					<h4>Log In</h4>
				</Link>
			</div>
		</Router>
	);
}
