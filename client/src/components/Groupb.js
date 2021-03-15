import React from "react";

import { useState } from "react";
import Register from "./Register";
import Login from "./Login";
import Profile from "./Profile";
import Dashboard from "./Dashboard";
import AddResource from "./AddResource";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ResourcesDashboard from "./ResourcesDashboard";
import LogOut from "./LogOut";
import LoginButton from "./LoginButton";

export default function Groupb() {
	let [signedIn, setSignedIn] = useState(localStorage.getItem("token"));
	const [subtopic, setSubtopic] = useState({});

	const handleLogin = () => {
		setSignedIn(localStorage.getItem("token"));
		setSignedIn(true);
	};

	const sentSubtopic = (subtopic) => {
		setSubtopic(subtopic);
	};
	return (
		<Router>
			<div>
				<Link to="/dashboard" className="text-dark ms-3 me-1">
					Your Dashboard
				</Link>
				<Link to="/myprofile" className="text-dark ms-3 me-1">
					Your Profile
				</Link>
				<div>
					<Switch>
						<Route path="/profile">
							<Profile />
						</Route>
						<Route path="/resource">
							<AddResource />
						</Route>
						<Route path="/dashboard">
							<Dashboard onUpdateSubtopic={sentSubtopic} />
						</Route>
						<Route path="/myprofile">
							<Profile />
						</Route>
						<Route path="/resources">
							<ResourcesDashboard subtopic={subtopic} />
						</Route>
						<Route path="/login">
							<Login />
						</Route>
					</Switch>
				</div>
			</div>
		</Router>
	);
}
