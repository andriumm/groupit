import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import "../App.css";

export default function TopicPage({ onUpdateSubtopic }) {
	const [topic, setTopic] = useState({});
	const [subtopics, setSubtopics] = useState([]);

	let history = useHistory();
	const { id } = useParams();

	useEffect(() => {
		getTopicName(id);
		getSubtopics(id);

		let token = localStorage.getItem("token");
		if (!token) {
			history.push("/login");
		}
		console.log(token);
	}, []);

	const getTopicName = async (id) => {
		try {
			const database = await axios.get(`/topics/${id}`, {
				headers: { "x-access-token": localStorage.getItem("token") },
			});
			setTopic(database.data);
		} catch (error) {
			console.log(error);
		}
	};

	const getSubtopics = async (id) => {
		try {
			const subtopic = await axios.get(`/topics/${id}/subtopics`, {
				headers: { "x-access-token": localStorage.getItem("token") },
			});
			setSubtopics(subtopic.data);
		} catch (error) {
			console.log(error);
		}
	};

	// const getResources = async (id) => {
	//   try {
	//     const resource = await axios.get(`/resources/user/${id}`, {
	//       headers: { "x-access-token": localStorage.getItem("token") },
	//     });
	//     setResources(resource.data);
	//   } catch (error) {
	//     console.log(error);
	//   }
	// };

	const deleteSubtopic = async (id) => {
		try {
			const subtopic = await axios.delete(`/topics/${id}`, {
				headers: { "x-access-token": localStorage.getItem("token") },
			});
			getSubtopics(subtopic.data);
		} catch (error) {
			console.log(error);
		}
	};

	const goToResourcesDashboard = async (subtopic) => {
		console.log("subtopic got to res", subtopic);
		onUpdateSubtopic(subtopic);

		history.push("/resources");
		//await setSubtopicID(id);

		console.log("subtopicID 2", subtopic);
	};

	return (
		<div>
			<h2 className="text-uppercase">{topic.topic_name}</h2>
			{/* What could be added: link on the name of the subtopic to redirect to the Resources Dashboard */}
			<div className="dashboardBox">
				{subtopics.map((subtopic) => (
					<div className="mainBox" key={subtopic.id}>
						<div className="mainBoxHeader">
							<h5
								className="mainTitle text-uppercase"
								onClick={() => goToResourcesDashboard(subtopic)}
							>
								{subtopic.topic_name}
							</h5>
							<button
								className="deleteButton btn"
								onClick={() => deleteSubtopic(subtopic.id)}
							>
								{/* <i class=“bi bi-trash”></i> */}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									class="bi bi-trash"
									viewBox="0 0 16 16"
								>
									<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
									<path
										fill-rule="evenodd"
										d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
									/>
								</svg>
							</button>
						</div>
						{subtopic.Resources.map((resource) => (
							<div key={resource.id} className="subBox">
								<h6>{resource.resource_name}</h6>
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
}
