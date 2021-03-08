import React, { useState } from "react";
import axios from "axios";

export default function register() {
  const [user, setUser] = useState({
    name: null,
    username: null,
    email: null,
    password: null,
  });

  //THIS IS NOT FINISHED!
  //   const addUser = async () => {
  //       try {
  // const user = await axios.post("/users/register", {
  //      let user = {name, username, email, password},
  //   });
  //   console.log(user)
  //     } catch (error) {console.log(error)};
  // };

  // });

  //   }

  //     data: {
  //       username: state.username,
  //       password: state.password,
  //     },
  //   })
  //     .then((result) => {
  //       //store it locally
  //       localStorage.setItem("token", result.data.token);
  //       console.log(result.data.message, result.data.token);
  //     })
  //     .catch((error) => console.log(error));
  // };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUserInfo((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name
          <input
            onChange={handleChange}
            name="name"
            value={user.name}
            type="text"
            id="name"
          />
        </label>

        <label htmlFor="username">
          Username
          <input
            onChange={handleChange}
            name="username"
            value={user.username}
            type="text"
            id="username"
          />
        </label>

        <label htmlFor="email">
          Email
          <input
            onChange={handleChange}
            name="email"
            value={user.email}
            type="text"
            id="email"
          />
        </label>

        <label htmlFor="password">
          Password
          <input
            onChange={handleChange}
            name="password"
            value={user.password}
            type="password"
            id="password"
          />
        </label>

        <button>Register</button>
      </form>
    </div>
  );
}
