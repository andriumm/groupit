import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

export default function Dasboard() {
  const [topics, setTopics] = useState([]);

  const database = [
    { id: 1, topic_name: "topic 1", parent: null },
    { id: 2, topic_name: "topic 2", parent: null },
    { id: 3, topic_name: "topic 3", parent: null },
    { id: 4, topic_name: "topic 4", parent: null },
    { id: 5, topic_name: "subtopic 1", parent: 1 },
    { id: 6, topic_name: "subtopic 2", parent: 1 },
    { id: 7, topic_name: "subtopic 3", parent: 2 },
    { id: 8, topic_name: "subtopic 4", parent: 3 },
    { id: 9, topic_name: "subtopic 5", parent: 3 },
    { id: 10, topic_name: "subtopic 6", parent: 3 },
    { id: 11, topic_name: "subtopic 7", parent: 4 },
  ];

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
      // const database = await axios("/topics");
      setTopics(database);
    } catch (error) {
      console.log(error);
    }
  };

  const parents = topics.filter((e) => e.parent === null);
  const tree = parents.map((parent) => ({
    ...parent,
    children: topics.filter((e) => e.parent === parent.id),
  }));

  return (
    <div>
      <h1>Your Dashboard</h1>

      <div>
        {tree.map((topic) => (
          <div key={topic.id}>
            <Link to={`/topics/${topic.id}`}>{topic.topic_name}</Link>
            {topic.children.map((subtopic) => (
              <div key={subtopic.id}>---{subtopic.topic_name}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
