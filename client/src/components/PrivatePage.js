import React from "react";
import { useState } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useHistory,
} from "react-router-dom";

import LogOut from "./LogOut";
import LoginButton from "./LoginButton";

import Register from "./Register";
import Login from "./Login";

import Profile from "./Profile";
import Dashboard from "./Dashboard";
import AddResource from "./AddResource";
import TopicPage from "./TopicPage";
import ResourcesDashboard from "./ResourcesDashboard";
import Home from "./Home";
import InsertTopics from "./InsertTopics";
import Footer from "./Footer";
import Logo from "./Logo";

export default function PrivatePage() {
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
					<Route path="/register">
						<Register />
					</Route>
					<Route path="/login">
						<Login handleLogin={handleLogin} />
					</Route>
					<Route path="/addresource">
						<AddResource />
					</Route>
					<Route path="/dashboard">
						<Dashboard onUpdateSubtopic={sentSubtopic} />
					</Route>
					<Route path="/topics/:id" >
						<TopicPage onUpdateSubtopic={sentSubtopic}/>
					</Route>
					<Route path="/topics">
						<InsertTopics />
					</Route>
					<Route path="/myprofile">
						<Profile />
					</Route>
					<Route path="/resources">
						<ResourcesDashboard subtopic={subtopic} />
					</Route>
					<Route path="/">
						<Home />
					</Route>
				</Switch>
				</div>
        <Footer />
			</div>
		</Router>
	);
}
