import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";

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
      <h2 className="text-uppercase text-danger">{topic.topic_name}</h2>
      {/* What could be added: link on the name of the subtopic to redirect to the Resources Dashboard */}
      <div>
        {subtopics.map((subtopic) => (
          <div key={subtopic.id}>
            <h5 onClick={() => goToResourcesDashboard(subtopic)}>
              {subtopic.topic_name}
            </h5>
            <button onClick={() => deleteSubtopic(subtopic.id)}>
              Delete Subtopic
            </button>
            {subtopic.Resources.map((resource) => (
              <div key={resource.id}>
                <h6>---{resource.resource_name}</h6>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
