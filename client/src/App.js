import "./App.css";
import { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import AddResource from "./components/AddResource";
import TopicPage from "./components/TopicPage";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useHistory,
} from "react-router-dom";
import ResourcesDashboard from "./components/ResourcesDashboard";
import LogOut from "./components/LogOut";
import LoginButton from "./components/LoginButton";
import GroupB from "./components/Groupb";
import Home from "./components/Home";
import InsertTopics from "./components/InsertTopics";

function App() {
	let history = useHistory();
	let [signedIn, setSignedIn] = useState(localStorage.getItem("token"));
	const [subtopic, setSubtopic] = useState({});

	const handleLogin = () => {
		setSignedIn(localStorage.getItem("token"));
		setSignedIn(true);
	};

	const handleLogout = () => {
		localStorage.clear("token");
		setSignedIn(false);
		//history.push("/");
	};

	const sentSubtopic = (subtopic) => {
		setSubtopic(subtopic);
	};

	return (
		<Router>
			<div className="App">
				<div className="text-end">
					{signedIn && (
						<div>
							<LogOut handleLogout={handleLogout} />
						</div>
					)}
					{signedIn && (
						<div>
							<Link to="/myprofile" className="text-dark ms-3 me-1"></Link>
						</div>
					)}

					{!signedIn && (
						<Link to="/register" className="text-dark ms-3 me-1">
							Sign Up
						</Link>
					)}
					{!signedIn && (
						<Link to="/login" className="text-dark ms-3 me-1">
							Sign In
						</Link>
					)}

					{/* <Link to="/login">Log In</Link>
					{/* <LogOut /> 
					<Link to="/myprofile">Profile</Link> */}
				</div>
				<h1 align="center">groupIT!</h1>
				<nav align="center">
					{/* <Link to="/login" className="text-dark ms-3 me-1">
						Sign In
					</Link> */}
					{/* <Link to="/dashboard" className="text-dark ms-3 me-1">
						Your Dashboard
					</Link>
					<Link to="/myprofile" className="text-dark ms-3 me-1">
						Your Profile
					</Link> */}
				</nav>
				<Switch>
					<Route path="/register">
						<Register />
					</Route>
					<Route path="/login">
						<Login handleLogin={handleLogin} />
					</Route>
					<Route path="/groupb">
						<GroupB />
					</Route>
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
					<Route path="/topics/:id">
						<TopicPage />
					</Route>
					<Route path="/topics">
						<InsertTopics />
					</Route>

					<Route path="/login">
						<LogOut />
					</Route>
					<Route path="/">
						<Home />
					</Route>
				</Switch>

				{/* return (
    <Router>
      <div className="App">
        {signedIn && (
          <div>
            <LogOut handleLogout={handleLogout} />
          </div>
        )}
        
        <h1 align="center">GROUP B</h1>
        <nav align="center">
          {!signedIn && (
            <Link to="/register" className="text-dark ms-3 me-1">
              Sign Up
            </Link>
          )}
          {!signedIn && (
            <Link to="/login" className="text-dark ms-3 me-1">
              Sign In
            </Link>
          )}
          <Link to="/dashboard" className="text-dark ms-3 me-1">
            Your Dashboard
          </Link>
          <Link to="/myprofile" className="text-dark ms-3 me-1">
            Your Profile
          </Link>
        </nav> */}
			</div>
		</Router>
	);
}

export default App;
