import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

export default function Dashboard({ onUpdateSubtopic }) {
  const [topics, setTopics] = useState([]);

  let history = useHistory();

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
      <h1>Your Dashboard</h1>

      <div>
        {topics.map((topic) => (
          <div key={topic.id}>
            <h5
              className="text-uppercase text-danger"
              onClick={() => history.push(`/topics/${topic.id}`)}
            >
              {topic.topic_name}
            </h5>
            <button onClick={() => deleteTopic(topic.id)}>Delete Topic</button>
            {topic.Subtopics.map((subtopic) => (
              <div
                key={subtopic.id}
                onClick={() => goToResourcesDashboard(subtopic)}
              >
                <h6>---{subtopic.topic_name}</h6>
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
