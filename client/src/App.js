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
import Home from "./components/Home";
import InsertTopics from "./components/InsertTopics";
import Footer from "./components/Footer";
import Logo from "./components/Logo";
import SendResetPasswordEmail from "./components/SendResetPasswordEmail";
import ResetPassword from "./components/ResetPassword";
import Groupb from "./components/Groupb";
import NavBar from "./components/NavBar";
import ProvideAuth from "./components/ProvideAuth";
import PrivateRoute from "./components/PrivateRoute";


function App() {
  // let [signedIn, setSignedIn] = useState(!!localStorage.getItem("token"));
  const [subtopic, setSubtopic] = useState({});

  // const handleLogin = () => {
  //   setSignedIn(localStorage.getItem("token"));
  //   setSignedIn(true);
  // };

  // const handleLogout = () => {
  //   localStorage.clear("token");
  //   setSignedIn(false);
  // };

  const sentSubtopic = (subtopic) => {
    setSubtopic(subtopic);
  };

  return (
    <ProvideAuth>
      <Router>
        <Logo />
        <NavBar />
        <div className="App">
          <div className="text-end">
            {/* {signedIn && (
              <div>
                <LogOut handleLogout={handleLogout} />
              </div>
            )}
            {signedIn && (
              <div>
                <Link to="/myprofile" className="text-dark ms-3 me-1">
                  Profile
                </Link>
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
            )} */}

            {/* <Link to="/login">Log In</Link>
            {/* <LogOut /> 
            <Link to="/myprofile">Profile</Link> */}
          </div>
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
            <Login />
              {/* <Login handleLogin={handleLogin} /> */}
            </Route>
            {/* <Route path="/groupb">
              <Groupb />
            </Route> */}
            {/* <PrivateRoute path="/profile">
              <Profile />
            </PrivateRoute> */}
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
            <PrivateRoute path="/resources">
              <ResourcesDashboard subtopic={subtopic} />
            </PrivateRoute>
            <PrivateRoute path="/resetpassword/:id/*">
              <ResetPassword />
            </PrivateRoute>
            <PrivateRoute path="/resetpassword">
              <SendResetPasswordEmail />
            </PrivateRoute>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </ProvideAuth>
  );
}

export default App;
