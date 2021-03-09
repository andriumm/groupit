import React, { useState } from "react";
import axios from "axios";

export default function Register() {
	const [user, setUser] = useState({
		name: "",
		username: "",
		email: "",
		password: "",
	});

	//THIS IS NOT FINISHED!

	const handleChange = ({ target }) => {
		const { name, value } = target;
		setUser((state) => ({
			...state,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		addUser();
	};

	const addUser = async () => {
		const { name, username, email, password } = user;
		try {
			const user = await axios.post("/users/register", {
				name,
				username,
				email,
				password,
			});
			console.log("Your information has been registered!", user);
		} catch (error) {
			console.log(error);
			//res.status(500).send(error);
		}
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
