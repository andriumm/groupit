import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function useProvideAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const history = useHistory();

  const signin = (user, cb = () => {}) => {
    axios("/users/login", {
      method: "POST",
      data: user,
    })
      .then((result) => {
        //store it locally
        localStorage.setItem("token", result.data.token);
        setIsLoggedIn(true);
        // an open door so we can do anything after logging in
        cb(result);
        history.push("/dashboard");
      })
      .catch((error) => console.log(error));
  };

  const signout = (cb = () => {}) => {
    localStorage.clear("token");
    setIsLoggedIn(null);
    cb();
  };

  return {
    isLoggedIn,
    signin,
    signout,
  };
}

export default useProvideAuth;
