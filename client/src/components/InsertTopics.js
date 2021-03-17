import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "../App.css";

const InsertTopics = () => {
  const history = useHistory();

  useEffect(() => {
    getTopics();

    let token = localStorage.getItem("token");
    if (!token) {
      history.push("/login");
    }
    console.log(token);
  }, []);

  //! PARENT TOPIC AREA

  const [newTopic, setNewTopic] = useState({
    topic_name: "",
    priority: false,
    parent: null, // got to stay null by default otherwise does not pass on to db
  });

  console.log(newTopic);

  const [topicConfirmation, setTopicConfirmation] = useState(null);

  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setNewTopic((state) => ({
      ...state,
      [name]: value,
    }));
  };

  // POST TOPICS

  const addTopic = async () => {
    try {
      await axios.post("/topics", newTopic, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      console.log("New Topic added", newTopic);
      getTopics();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTopic();
    getTopics();
    displayTopicConfirmation();
  };

  const displayTopicConfirmation = () => {
    setTopicConfirmation(newTopic);
  };

  //! CREATE PARENT DROPDOWN

  const [topicList, setTopicList] = useState([]);
  console.log(topicList);

  const filterParent = topicList.filter(function (topic) {
    return topic.parent === null;
  });

  console.log(filterParent);

  // GET TOPICS OBJECT

  const getTopics = async () => {
    try {
      const listing = await axios.get("/topics", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });

      console.log(listing.data);
      setTopicList(listing.data);
    } catch (error) {
      console.log(error);
    }
  };

  //! SUBTOPIC AREA

  const [subtopic, setSubtopic] = useState({
    topic_name: "",
    priority: false,
    parent: 0,
  });

  const [subtopicConfirmation, setSubtopicConfirmation] = useState(null);

  const handleSubtopicSubmit = (e) => {
    e.preventDefault();
    addSubtopics();
    displaySubtopicConfirmation();
  };

  const handleSubtopicChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setSubtopic((state) => ({
      ...state,
      [name]: value,
    }));
  };

  // POST SUBTOPIC

  const addSubtopics = async () => {
    try {
      await axios.post(`/topics/${subtopic.parent}/subtopics`, subtopic, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
      });
      console.log("New subtopic added", subtopic);
      console.log(subtopic);
    } catch (error) {
      console.log(error);
    }
  };

  const displaySubtopicConfirmation = () => {
    setSubtopicConfirmation(subtopic);
  };

  return (
    <div>
      <div>
        <h2>Add a new topic</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="topic" className="form-label">
            Topic name
            <input
              type="text"
              name="topic_name"
              value={newTopic.topic_name}
              onChange={handleChange}
              id="topic"
              className="form-control"
            />
          </label>
          <br />
          <label htmlFor="priority" className="form-label">
            Set it as a priority
            <input
              type="checkbox"
              checked={newTopic.priority}
              name="priority"
              onChange={handleChange}
              value={newTopic.priority}
              id="priority"
              className="form-check"
            />
          </label>
          <br />
          <input
            type="submit"
            value="Add Topic"
            className="topicFormButton btn"
          />
          <br />
        </form>
      </div>

      {/* SEPARATION: FORM 1 ABOVE / FORM 2 BELOW  */}

      {topicConfirmation && <div> New topic added!</div>}

      <div>
        <h2> Or/and add a subtopic to any of your topics </h2>

        <form onSubmit={handleSubtopicSubmit}>
          <label htmlFor="subtopic" className="form-label">
            Subtopic name
            <input
              type="text"
              name="topic_name"
              value={subtopic.topic_name}
              onChange={handleSubtopicChange}
              id="subtopic"
              className="form-control"
            />
          </label>
          <br />
          <label htmlFor="parent-dropdown" className="form-label">
            Which topic does it belong to?
            <select
              id={topicList.id}
              name="parent"
              onChange={handleSubtopicChange}
              className="form-select"
            >
              <option value="empty"></option>
              {filterParent.map((topicName) => (
                <option key={topicName.id} value={topicName.id}>
                  {" "}
                  {topicName.topic_name}{" "}
                </option>
              ))}
            </select>
          </label>
          <br />
          <label htmlFor="priority" className="form-label">
            Set it as a priority
            <input
              type="checkbox"
              checked={subtopic.priority}
              name="priority"
              onChange={handleSubtopicChange}
              value={subtopic.priority}
              id="priority"
              className="form-check"
            />
          </label>
          <br />
          <input
            type="submit"
            value="Add subtopic"
            className="topicFormButton btn"
          />
        </form>
      </div>

      {subtopicConfirmation && <div> New subtopic added! </div>}
    </div>
  );
};

export default InsertTopics;
