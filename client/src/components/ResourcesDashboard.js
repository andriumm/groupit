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
			getResources(subtopic.id);
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

	const createInput = ({ target }, id) => {
		setNameInput(true);
	};
	//console.log("resources id", subtopic.id);
	return (
		<div>
			<h3> {subtopic.topic_name}</h3>
			<div>
				<table className="table  table-success text-center ">
					<thead className="text-uppercase ">
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
								<table className="table">
									<tbody>
										<tr>
											<td className="col-2">
												<span className="d-flex justify-content-around mx-2">
													<a
														href={`${resource.url}`}
														className="text-decoration-none text-start"
													>
														<h6 className="d-flex text-center text-black align-text-bottom text-center fs-5">
															{resource.resource_name.toUpperCase()}
														</h6>
													</a>

													{!nameInput && (
														<div className="d-flex">
															<button
																className="mx-3 btn btn-outline-black btn-sm"
																onClick={(e) => createInput(e, resource.id)}
															>
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	width="16"
																	height="16"
																	fill="currentColor"
																	class="bi bi-pencil-fill"
																	viewBox="0 0 16 16"
																>
																	<path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
																</svg>
															</button>
														</div>
													)}
												</span>
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
											<td scope="col" className="col-1 text-center">
												<select
													className="custom-select btn btn-outline-success"
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
											<td scope="col" className="col-1 text-center">
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
											<td scope="col" className="col-1 text-center ">
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
														className="btn btn-outline-dark"
													/>
												</label>
											</td>
											<td scope="col" className="col-1 text-center">
												{resource.reminder}
											</td>
											<td scope="col" className="col-1">
												{resource.created_date.substring(0, 10)}
											</td>
											<td scope="col" className="col-1 text-center">
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
															fillrule="evenodd"
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
