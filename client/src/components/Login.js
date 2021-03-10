import React, { useState } from "react";
import axios from "axios";
//import { useHistory } from "react-router-dom";
import "../App.css";

export default function Login({ handleLogin }) {
	const [user, setUser] = useState({
		email: "",
		password: "",
	});
	//let history = useHistory();

	const handleChange = (e) => {
		e.persist();
		setUser((state) => ({ ...state, [e.target.name]: e.target.value }));
	};

	const login = () => {
		axios
			.post("/users/login", user)
			.then((result) => {
				//store it locally
				localStorage.setItem("token", result.data.token);
				handleLogin();
				//   history.push("/dashboard");
				console.log(result.data.message, result.data.token);
			})
			.catch((error) => console.log(error));
	};

	return (
		<div>
			<div>
				<label htmlFor="email">
					Email:
					<input
						onChange={handleChange}
						name="email"
						value={user.email}
						type="text"
					/>
				</label>
				<br />
				<label htmlFor="password">
					Password:
					<input
						onChange={handleChange}
						name="password"
						value={user.password}
						type="password"
					/>
				</label>
				<button onClick={login}>Login</button>
			</div>
		</div>
	);
}
