import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateProfile from "./UpdateProfile";

export default function Profile() {
	const [profileInfo, setProfileInfo] = useState({});

	useEffect(() => {
		getProfile();
	}, []);

	const getProfile = async () => {
		try {
			const profile = await axios.get(`/users/myprofile`, {
				headers: {
					"x-access-token": localStorage.getItem("token"),
				},
			});

			setProfileInfo(profile.data);
			console.log("profile", profile.data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<div>
				<h2>Profile</h2>
				<div>{profileInfo.name}</div>
				<div>{profileInfo.username}</div>
				<div>{profileInfo.email}</div>
			</div>
			<div>
				<UpdateProfile currentUser={profileInfo} />
			</div>
		</div>
	);
}
