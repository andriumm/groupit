import axios from "axios";
import React from "react";
import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

export default function topicsDashboard() {
  const [subtopics, setSubtopics] = useState([]);
  const [resources, setResources] = useState([]);
  let history = useHistory();

  //fetch from topics the topics with parents
  // fetch from resources the resources per subtopic
  useEffect(() => {
    getSubtopics();
    getResources();
    let token = localStorage.getItem("token");
    if (!token) {
      history.push("/login");
    }
    console.log(token);
  }, []);

  const getSubtopics = async (id) => {
    try {
      const subtopic = await axios.get(`/topics/${id}/subtopics`, {
        headers: { "x-access-token": localStorage.getItem("token") },
      });
      setSubtopics(subtopic);
    } catch (error) {
      console.log(error);
    }
  };

  const getResources = async () => {
    try {
      const resource = await axios.get("/resources");
      setResources(resource);
    } catch (error) {
      console.log(error);
    }
  };
  return <div></div>;
}
