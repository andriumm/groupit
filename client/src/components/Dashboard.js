import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function Dasboard() {
  const [topics, setTopics] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  let history = useHistory();

  useEffect(() => {
    getTopics();
    getSubcategories();

    let token = localStorage.getItem("token");
    if (!token) {
      history.push("/login");
    }
    console.log(token);
  }, []);

  const getTopics = async () => {
    try {
      const topic = await axios.get("/topics", {
        params: {
          parent: null,
        },
      });
      console.log(topic);
    } catch (error) {
      console.log(error);
    }
  };

  const getSubcategories = async () => {
    try {
      const subcategory = await axios.get("/topics", {
        params: {
          parent: "",
        },
      });
      console.log(subcategory);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Your Dashboard</h1>
      <div>
        {topics.map((topic) => (
          <div key={topic.id}>{topic.topic_name}</div>
        ))}
      </div>

      <div>
        {subcategories.map((subcategory) => (
          <div key={subcategory.id}>{subcategory.topic_name}</div>
        ))}
      </div>
    </div>
  );
}
