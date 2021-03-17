import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

export default function UpdateProfile({ profileInfo, onUpdateProfile }) {
  const [update, setUpdate] = useState({
    name: "",
    username: "",
    email: "",
  });

  useEffect(() => {
    setUpdate(profileInfo);
  }, [profileInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile();
    onUpdateProfile();
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUpdate((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const updateProfile = async () => {
    try {
      await axios.put(`/users/myprofile`, update, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      console.log("Your profile has been updated!", update);
    } catch (error) {
      console.log(error);
    }
  };
  //console.log("details", details);
  return (
    <div>
      <div className="separationBoxAm">
        <h3 className="h3Am">Update your profile</h3>
        <form onSubmit={handleSubmit}>
          <label className="form-label" htmlFor="name">
            Name
            <input
              type="text"
              name="name"
              value={update.name}
              onChange={handleChange}
              id="name"
              className="form-control"
            />
          </label>
          <br />
          <label className="form-label" htmlFor="username">
            Username
            <input
              type="text"
              name="username"
              value={update.username}
              onChange={handleChange}
              id="username"
              className="form-control"
            />
          </label>
          <br />
          <label className="form-label" htmlFor="email">
            Email
            <input
              type="text"
              name="email"
              value={update.email}
              onChange={handleChange}
              id="email"
              className="form-control"
            />
          </label>
          <br />
          <button className="loginButton btn" id="btnAm">Update</button>
        </form>
      </div>
    </div>
  );
}
