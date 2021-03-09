import "./App.css";

import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
	return (
		<Router>
			<div className="App">
				<Switch>
					<Route path="/register">
						<Register />
					</Route>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/profile">
						<Profile />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
