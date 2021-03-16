import React from "react";
import { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

const axios = require("axios");

export default function ResourcesDashboard({ subtopic }) {
	let history = useHistory();
	console.log("subtopic1", subtopic);
	const [resources, setResources] = useState([]);
	const [completed, setCompleted] = useState(false);
	const [test, setTest] = useState({ priority: null });
	//const [id, setID] = useState(null);

	useEffect(() => {
		getResources(subtopic.id);
		let token = localStorage.getItem("token");
		if (!token) {
			history.push("/login");
		}
		//console.log(token);
		console.log("id", subtopic.id);
	}, []);

	const getResources = async (id) => {
		try {
			const resources = await axios.get(`/resources/user/${id}`, {
				headers: { "x-access-token": localStorage.getItem("token") },
			});
			console.log("resources", resources.data.Resources);
			setResources(resources.data.Resources);
		} catch (error) {
			console.log(error);
		}
	};

	const deleteResource = async (id) => {
		try {
			const resource = await axios.delete(`/resources/${id}`, {
				headers: { "x-access-token": localStorage.getItem("token") },
			});
			getResources(resource.data);
		} catch (error) {
			console.log(error);
		}
	};

	const updateCompleted = async (id) => {
		console.log("completed1", completed);

		try {
			completed === false ? setCompleted(true) : setCompleted(false);
			const completeddb = await axios.put(
				`/resources/${id}`,
				{ complete: completed },
				{
					headers: { "x-access-token": localStorage.getItem("token") },
				}
			);
			console.log("completeddb", completeddb);
		} catch (error) {
			console.log(error);
		}
	};
	console.log("completed2", completed);

	const handlePriorityChange = async ({ target }, id) => {
		try {
			await axios.put(
				`/resources/${id}`,
				{ priority: target.value },
				{
					headers: { "x-access-token": localStorage.getItem("token") },
				}
			);
		} catch (error) {
			console.log(error);
		}
	};
	const handleFormatChange = async ({ target }, id) => {
		try {
			await axios.put(
				`/resources/${id}`,
				{ format: target.value },
				{
					headers: { "x-access-token": localStorage.getItem("token") },
				}
			);
		} catch (error) {
			console.log(error);
		}
	};

	//console.log("resources id", subtopic.id);
	return (
		<div>
			<h3> {subtopic.topic_name}</h3>
			<div>
				<table className="table table-light table-striped table-bordered">
					<thead>
						<tr>
							<th scope="col" className="col-2">
								Name
							</th>
							<th scope="col" className="col-1">
								Format
							</th>
							<th scope="col" className="col-1">
								Priority
							</th>
							<th scope="col" className="col-1">
								Completed
							</th>
							<th scope="col" className="col-1">
								Reminder
							</th>
							<th scope="col" className="col-1">
								Created
							</th>
							<th scope="col" className="col-1">
								Delete
							</th>
						</tr>
					</thead>
				</table>
				{resources.length ? (
					<div>
						{/* <ul>
              {resources.map((resource) => (
                <li key={resource.id}>
                  {/* <span onClick={() => displaySubtopics(topic.id)}> */}
						{/* <h6 className="d-inline">{resource.resource_name}</h6>
                  <button onClick={() => deleteResource(resource.id)}>
                    Delete Topic
                  </button> */}
						{/* </span> 
                </li>
              ))}
            </ul> */}

						{resources.map((resource) => (
							// <li key={resource.id}>
							//     {/* <span onClick={() => displaySubtopics(topic.id)}> */}
							//     <a href={`${resource.url}`}>
							//         <h6 className="d-inline">{resource.resource_name}</h6>
							//     </a>
							//     <p>{resource.format}</p>
							//     <p>{resource.priority}</p>
							//     <p>{resource.complete}</p>
							//     <p>{resource.reminder}</p>
							//     <p>{resource.created_date.substring(0, 10)}</p>

							//     {/* <button onClick={() => updateResource(resource.id)}>
							//         Update Topic
							//     </button> */}
							//     <button onClick={() => deleteResource(resource.id)}>
							//         Delete Resource
							//     </button>
							//     {/* </span> */}
							// </li>
							<div key={resource.id}>
								<table className="table table-light table-striped table-bordered">
									<tbody>
										<tr>
											<td className="col-2">
												<a href={`${resource.url}`}>
													<h6 className="d-inline">{resource.resource_name}</h6>
												</a>
											</td>
											<td scope="col" className="col-1">
												<select
													className="custom-select"
													id="prioritySelect"
													name="prioritySelect"
													onChange={(e) => handleFormatChange(e, resource.id)}
												>
													<option selected disabled>
														{resource.format}
													</option>
													<option value={`Course`}>Course</option>
													<option value={`Podcast`}>Podcast</option>
													<option value={`Reading`}>Reading</option>
													<option value={`Video`}>Video</option>
													<option value={`Website`}>Website</option>
												</select>
											</td>
											<td scope="col" className="col-1">
												<select
													className="custom-select"
													id="prioritySelect"
													name="prioritySelect"
													onChange={(e) => handlePriorityChange(e, resource.id)}
												>
													<option selected disabled>
														{resource.priority}
													</option>
													<option value={1}>1</option>
													<option value={2}>2</option>
													<option value={3}>3</option>
													<option value={4}>4</option>
													<option value={5}>5</option>
												</select>
											</td>
											<td scope="col" className="col-1">
												<input
													type="checkbox"
													name="completed"
													onClick={() => updateCompleted(resource.id)}
												></input>
												{resource.complete}
											</td>
											<td scope="col" className="col-1">
												{resource.reminder}
											</td>
											<td scope="col" className="col-1">
												{resource.created_date.substring(0, 10)}
											</td>
											<td scope="col" className="col-1">
												<button onClick={() => deleteResource(resource.id)}>
													Delete
												</button>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						))}
					</div>
				) : (
					"You haven't saved any resource yet"
				)}
			</div>
		</div>
	);
}
