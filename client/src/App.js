import "./App.css";
import { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import InsertTopics from "./components/InsertTopics.js"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
	let [signedIn, setSignedIn] = useState(localStorage.getItem("token"));

	const handleLogin = () => {
		setSignedIn(localStorage.getItem("token"));
		setSignedIn(true);
	};

	return (
		<Router>
			<div className="App">
				<Switch>
					<Route path="/register">
						<Register />
					</Route>
					<Route path="/login">
						<Login handleLogin={handleLogin} />
					</Route>
					<Route path="/profile">
						<Profile />
					</Route>
          <Route path="/topics">
            <InsertTopics />
          </Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
