import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";

export default function TopicsDashboard() {
  const [topic, setTopic] = useState({});
  const [subtopics, setSubtopics] = useState([]);
  const [resources, setResources] = useState([]);
  let history = useHistory();
  const { id } = useParams();
  //fetch from topics the topics with parents
  // fetch from resources the resources per subtopic
  useEffect(() => {
    getTopicName(id);
    getSubtopics(id);
    getResources(id);
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

  const getResources = async (id) => {
    try {
      const resource = await axios.get(`/resources/user/${id}`, {
        headers: { "x-access-token": localStorage.getItem("token") },
      });
      setResources(resource.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>{topic.topic_name}</h2>
      {/* What could be added: link on the name of the subtopic to redirect to the Resources Dashboard */}
      <div>
        {subtopics.map((subtopic) => (
          <div key={subtopic.id}>
            <h3>{subtopic.topic_name}</h3>
            {resources.map((resource) => (
              <div key={resource.id}>
                <h4>---{resource.resource_name}</h4>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
