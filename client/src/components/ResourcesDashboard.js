import "../App.css";
import React from "react";
import { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
const axios = require("axios");

export default function ResourcesDashboard({ subtopic }) {
  let history = useHistory();
  console.log("subtopic1", subtopic);
  const [resources, setResources] = useState([]);
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

  //console.log("resources id", subtopic.id);
  return (
    <div>
      <h3> {subtopic.topic_name}</h3>
      <div>
        {resources.length ? (
          <div>
            <ul>
              {resources.map((resource) => (
                <li key={resource.id}>
                  {/* <span onClick={() => displaySubtopics(topic.id)}> */}
                  <h6 className="d-inline">{resource.resource_name}</h6>
                  <button onClick={() => deleteResource(resource.id)}>
                    Delete Topic
                  </button>
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
