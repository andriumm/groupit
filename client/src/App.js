import "./App.css";
import { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import AddResource from "./components/AddResource";
import TopicPage from "./components/TopicPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ResourcesDashboard from "./components/ResourcesDashboard";
import LogOut from "./components/LogOut";
import LoginButton from "./components/LoginButton";
import Home from "./components/Home";
import InsertTopics from "./components/InsertTopics";
import Menu from "./components/Menu";
import Logo from "./components/Logo";
import SendResetPasswordEmail from "./components/SendResetPasswordEmail";
import ResetPassword from "./components/ResetPassword";
import NavBar from "./components/NavBar";
import ProvideAuth from "./components/ProvideAuth";
import PrivateRoute from "./components/PrivateRoute";

function App() {
	const [subtopic, setSubtopic] = useState({});

	const sentSubtopic = (subtopic) => {
		setSubtopic(subtopic);
	};

	return (
		<ProvideAuth>
			<Router>
				<Logo />
				<NavBar />
				<div className="d-flex align-items-start">
					<Menu />
					<div className="App">
						<Switch>
							<Route path="/register">
								<Register />
							</Route>
							<Route path="/login">
								<Login />
							</Route>
							<PrivateRoute path="/addresource">
								<AddResource />
							</PrivateRoute>
							<PrivateRoute path="/dashboard">
								<Dashboard onUpdateSubtopic={sentSubtopic} />
							</PrivateRoute>
							<PrivateRoute path="/topics/:id">
								<TopicPage onUpdateSubtopic={sentSubtopic} />
							</PrivateRoute>
							<PrivateRoute path="/topics">
								<InsertTopics />
							</PrivateRoute>
							<PrivateRoute path="/myprofile">
								<Profile />
							</PrivateRoute>
							<PrivateRoute path="/resources/user/:id">
								<ResourcesDashboard subtopic={subtopic} />
							</PrivateRoute>
							<Route path="/resetpassword/:id/*">
								<ResetPassword />
							</Route>
							<Route path="/resetpassword">
								<SendResetPasswordEmail />
							</Route>
							<Route path="/">
								<Home />
							</Route>
						</Switch>
					</div>
				</div>
			</Router>
		</ProvideAuth>
	);
}

export default App;
