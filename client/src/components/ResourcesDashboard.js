import "../App.css";
import React from "react";
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

const axios = require("axios");

export default function ResourcesDashboard({ subtopic }) {
	let history = useHistory();
	const { id } = useParams();

	console.log("subtopic1", subtopic);
	const [resources, setResources] = useState([]);
	const [completed, setCompleted] = useState(false);
	const [nameInput, setNameInput] = useState(false);
	const [name, setName] = useState("");

	useEffect(() => {
		getResources(id);
		let token = localStorage.getItem("token");
		if (!token) {
			history.push("/login");
		}
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

	const handleCompletedChange = async ({ target }, id) => {
		const { name } = target;
		setCompleted((state) => ({
			...state,
			[name]: target.checked ? true : false,
		}));
		try {
			await axios.put(
				`/resources/${id}`,
				{ complete: target.checked },
				{
					headers: { "x-access-token": localStorage.getItem("token") },
				}
			);
		} catch (error) {
			console.log(error);
		}

		getResources(subtopic.id);
	};

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

	// const handleChange = ({ target }) => {
	// 	const { name, value } = target;
	// 	setResource((state) => ({
	// 		...state,
	// 		[name]: value,
	// 	}));
	// };
	const handleNameChange = async ({ target }, id) => {
		const { value } = target;
		setName(value);
		console.log("name:", name);
		try {
			await axios.put(
				`/resources/${id}`,
				{ resource_name: target.value },
				{
					headers: { "x-access-token": localStorage.getItem("token") },
				}
			);
		} catch (error) {
			console.log(error);
		}
	};

	const createInput = () => {
		setNameInput(true);
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
						{resources.map((resource) => (
							<div key={resource.id}>
								<table className="table table-light table-striped table-bordered">
									<tbody>
										<tr>
											<td className="col-2">
												<a href={`${resource.url}`}>
													<h6 className="d-inline">
														{resource.resource_name.toUpperCase()}
													</h6>
												</a>

												{!nameInput && (
													<div>
														<button
															onClick={(e) => createInput(e, resource.id)}
														>
															Edit
														</button>
													</div>
												)}
												{nameInput && (
													<div>
														<input
															onChange={(e) => handleNameChange(e, resource.id)}
															name="resource_name"
															value={name}
															type="text"
															id="resource_name"
														/>
														<button
														//onClick={(e) => handleNameChange(e, resource.id)}
														>
															ok
														</button>
													</div>
												)}
											</td>
											<td scope="col" className="col-1">
												<select
													className="custom-select btn"
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
													className="custom-select btn"
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
												<label htmlFor="complete">
													<input
														type="checkbox"
														//checked={resource.complete ? "checked" : ""}
														checked={resource.complete}
														name="completed"
														onChange={(e) =>
															handleCompletedChange(e, resource.id)
														}
														//value={resource.complete}
														id="priority"
													/>
												</label>
											</td>
											<td scope="col" className="col-1">
												{resource.reminder}
											</td>
											<td scope="col" className="col-1">
												{resource.created_date.substring(0, 10)}
											</td>
											<td scope="col" className="col-1">
												<button
													onClick={() => deleteResource(resource.id)}
													className="btn btn-outline-danger btn-small"
												>
													{/* <i class="bi bi-trash"></i> */}
													<svg
														xmlns="http://www.w3.org/2000/svg"
														width="16"
														height="16"
														fill="currentColor"
														className="bi bi-trash"
														viewBox="0 0 16 16"
													>
														<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
														<path
															fill-rule="evenodd"
															d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
														/>
													</svg>
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
