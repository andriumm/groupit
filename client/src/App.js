import "./App.css";
import { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
//import Dashboard from "./components/Dashboard";
import AddResource from "./components/AddResource";

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
        <h1 align="center">this is the home</h1>
        <nav align="center">
          <Link to="/register" className="text-dark ms-3 me-1">
            Sign Up
          </Link>
          <Link to="/login" className="text-dark ms-3 me-1">
            Sign In
          </Link>
          {/* <Link to="/dashboard">Your Dashboard</Link> */}
        </nav>
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
          <Route path="/resource">
            <AddResource />
          </Route>
          {/* <Route path="/dashboard">
            <Dashboard />
          </Route> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
