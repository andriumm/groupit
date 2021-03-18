// import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import "../App.css";

//test test
import useAuth from "../hooks/useAuth";
import axios from "../utils/axios";

export default function Dashboard({ onUpdateSubtopic }) {
	const [topics, setTopics] = useState([]);

	// test test
	const auth = useAuth();
	const history = useHistory();

	useEffect(() => {
		getTopics();

		let token = localStorage.getItem("token");
		if (!token) {
			history.push("/login");
		}
		console.log(token);
	}, []);

	const getTopics = async () => {
		try {
			const database = await axios.get("/topics", {
				headers: { "x-access-token": localStorage.getItem("token") },
			});
			setTopics(database.data);
		} catch (error) {
			console.log(error);
		}
	};
	//console.log("topics", topics);

	// const getSubtopics = async (id) => {
	//   try {
	//     const subtopics = await axios.get(`/topics`, {
	//       headers: { "x-access-token": localStorage.getItem("token") },
	//     });
	//     setSubtopics(subtopics.data);
	//   } catch (error) {
	//     console.log(error);
	//   }
	// };

	// const goToTopicsDashboard = async (topic) => {
	//   // onUpdateTopic(topic);

	//   history.push(`/topics/${topic.id}`);
	// };

	const goToResourcesDashboard = async (subtopic) => {
		console.log("subtopic got to res", subtopic);
		onUpdateSubtopic(subtopic);
		//onUpdateSubtopic()
		history.push("/resources");
		//await setSubtopicID(id);

		console.log("subtopicID 2", subtopic);
	};
	//console.log("subtopics", subtopics);

	// const parents = topics.filter((e) => e.parent === null);
	// const tree = parents.map((parent) => ({
	//   ...parent,
	//   children: topics.filter((e) => e.parent === parent.id),
	// }));

	const deleteTopic = async (id) => {
		try {
			const database = await axios.delete(`/topics/${id}`, {
				headers: { "x-access-token": localStorage.getItem("token") },
			});
			getTopics(database.data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<h2>Your Dashboard</h2>

			<div className="dashboardBox">
				{topics.map((topic) => (
					<div key={topic.id} className="mainBox">
						<div className="mainBoxHeader">
							<h5
								className="mainTitle text-uppercase"
								onClick={() => history.push(`/topics/${topic.id}`)}
							>
								{topic.topic_name}
							</h5>
							<button
								className="deleteButton btn"
								onClick={() => deleteTopic(topic.id)}
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
						{topic.Subtopics.map((subtopic) => (
							<div
								className="subBox"
								key={subtopic.id}
								onClick={() => goToResourcesDashboard(subtopic)}
							>
								<h6>{subtopic.topic_name}</h6>
							</div>
						))}
					</div>
				))}
			</div>

			{/* <div>
        {topics.length ? (
          <div>
            <ul>
              {topics.map((topic) => (
                <li key={topic.id}>
                
                  <span onClick={() => displaySubtopics(topic.id)}>
                    <h6 className="d-inline">{topic.topic_name}</h6>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <div>
          {subtopics.length ? (
            <div>
              <ul>
                {subtopics.map((subtopic) => (
                  <li key={subtopic.id}>
                   
                    <span onClick={() => goToResourcesDashboard(subtopic)}>
                      <h6 className="d-inline text-success">
                        {subtopic.topic_name}
                      </h6>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div> */}
		</div>
	);
}
