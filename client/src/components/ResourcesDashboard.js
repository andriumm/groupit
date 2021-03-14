import React from "react";
import { useState, useEffect } from "react";
const axios = require("axios");

export default function ResourcesDashboard({ subtopicID }) {
	const [resources, setResources] = useState([]);

	useEffect((id) => {
		getResources(subtopicID);
	}, []);

	const getResources = async (id) => {
		try {
			const resources = await axios.get(`/user/${id}`, {
				headers: { "x-access-token": localStorage.getItem("token") },
			});
			setResources(resources.data);
		} catch (error) {
			console.log(error);
		}
	};
	console.log("resources id", subtopicID);
	return (
		<div>
			<h3> SUBTOPIC: {subtopicID}</h3>
			<div>
				{resources.length ? (
					<div>
						<ul>
							{resources.map((resource) => (
								<li key={resource.id}>
									{/* <span onClick={() => displaySubtopics(topic.id)}> */}
									<h6 className="d-inline">{resource.resource_name}</h6>
									{/* </span> */}
								</li>
							))}
						</ul>
					</div>
				) : null}
			</div>
		</div>
	);
}
