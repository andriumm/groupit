import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateProfile from "./UpdateProfile";
import { useHistory, Link } from "react-router-dom";

export default function Profile() {
	let history = useHistory();

	const [profileInfo, setProfileInfo] = useState({
		name: "",
		username: "",
		email: "",
	});

	useEffect(() => {
		getProfile();
		let token = localStorage.getItem("token");
		if (!token) {
			history.push("/login");
		}
		console.log(token);
	}, []);

	const getProfile = async () => {
		try {
			const profile = await axios.get(`/users/myprofile`, {
				headers: {
					"x-access-token": localStorage.getItem("token"),
				},
			});

			setProfileInfo(profile.data);
		} catch (error) {
			console.log(error);
		}
	};

	// const sentProfileToUpdate = () => {
	// 	let details = profileInfo;
	// 	console.log("details from parent", details);
	// 	return details;
	// };

	console.log("profileInfo", profileInfo);
	return (
		<div>
			<div>
				<h2>Profile</h2>
				<div>{profileInfo.name}</div>
				<div>{profileInfo.username}</div>
				<div>{profileInfo.email}</div>
			</div>
			<div>
				<UpdateProfile profileInfo={profileInfo} onUpdateProfile={getProfile} />
			</div>
		</div>
	);
}
