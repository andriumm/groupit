import React from "react";
import { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
const axios = require("axios");

export default function ResourcesDashboard({ subtopic }) {
  let history = useHistory();

  const [resources, setResources] = useState([]);

  useEffect(() => {
    getResources(subtopic);

    let token = localStorage.getItem("token");
    if (!token) {
      history.push("/login");
    }
    //console.log(token);
  }, []);

  const getResources = async (subtopic) => {
    try {
      const resources = await axios.get(`/resources/user/${subtopic.id}`, {
        headers: { "x-access-token": localStorage.getItem("token") },
      });
      setResources(resources.data);
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
