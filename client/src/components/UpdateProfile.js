import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UpdateProfile({ profileInfo }) {
	const [update, setUpdate] = useState({
		name: profileInfo.name,
		username: profileInfo.username,
		email: profileInfo.email,
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		updateProfile();
	};

	const handleChange = ({ target }) => {
		const { name, value } = target;
		setUpdate((state) => ({
			...state,
			[name]: value,
		}));
	};

	// DON'T KNOW HOW TO PASS THE INFO IN THE AXIOS REQUEST TOGETHER WITH THE HEADERS
	const updateProfile = async () => {
		try {
			await axios.put(`/users/profile_update`, update, {
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
			<div>
				<h3>Update your profile</h3>
				<form onSubmit={handleSubmit}>
					<label htmlFor="name">
						Name
						<input
							type="text"
							name="name"
							value={update.name}
							onChange={handleChange}
							id="name"
						/>
					</label>
					<label htmlFor="username">
						Username
						<input
							type="text"
							name="username"
							value={update.username}
							onChange={handleChange}
							id="username"
						/>
					</label>
					<label htmlFor="email">
						Email
						<input
							type="text"
							name="email"
							value={update.email}
							onChange={handleChange}
							id="email"
						/>
					</label>
					<button>Update</button>
				</form>
			</div>
		</div>
	);
}
