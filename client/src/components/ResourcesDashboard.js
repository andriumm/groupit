import React from "react";
import { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
const axios = require("axios");

export default function ResourcesDashboard({ subtopic }) {
	let history = useHistory();
	console.log("subtopic1", subtopic);
	const [resources, setResources] = useState([]);
	const [completed, setCompleted] = useState(false);
	const [priority, setPriority] = useState();
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
		//console.log("completed1", completed);
		completed === false ? setCompleted(true) : setCompleted(false);
		try {
			await axios.put(
				`/resources/${id}`,
				{ complete: completed },
				{
					headers: { "x-access-token": localStorage.getItem("token") },
				}
			);
		} catch (error) {
			console.log(error);
		}
	};
	//console.log("completed2", completed);

	const updatePriority = async (id) => {
		//console.log("completed1", completed);
		completed === false ? setCompleted(true) : setCompleted(false);
		try {
			await axios.put(
				`/resources/${id}`,
				{ complete: completed },
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
												{resource.format}
											</td>
											<td scope="col" className="col-1">
												<div class="dropdown">
													<button
														class="btn btn-secondary dropdown-toggle"
														type="button"
														id="priority"
														data-bs-toggle="dropdown"
														aria-expanded="false"
													>
														{resource.priority}
													</button>
													<ul class="dropdown-menu" aria-labelledby="priority">
														<li>
															<button class="dropdown-item" type="button">
																1
															</button>
														</li>
														<li>
															<button class="dropdown-item" type="button">
																2
															</button>
														</li>
														<li>
															<button class="dropdown-item" type="button">
																3
															</button>
														</li>
													</ul>
												</div>
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
