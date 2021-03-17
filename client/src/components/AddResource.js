import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

export default function AddResource() {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState({
    topic_id: "",
  });
  const [resource, setResource] = useState({
    resource_name: "",
    url: "",
    format: "",
    priority: "1",
    complete: "",
    reminder: "",
    created_date: "",
  });
  const [hasBeenAdded, setHasBeenAdded] = useState(null);

  useEffect(() => {
    getTopics();
  }, []);

  const getTopics = async () => {
    try {
      const response = await axios.get("/topics/", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      console.log(response.data);
      //this only lists the parent topics
      setTopics(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setResource((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const selectTopic = (e) => {
    const { value } = e.target;
    console.log(value);
    setSelectedTopic({
      topic_id: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(resource.created_date);
    addResource();
    clear();
  };

  const clear = () => {
    setResource({
      // resource_name: "",
      // url: "",
      // format: "",
      // priority: "1",
      // complete: "",
      // reminder: "",
      // created_date: "",
    });
  };

  const addResource = async () => {
    console.log(localStorage.getItem("token"));
    try {
      await axios.post(`/resources/${selectedTopic.topic_id}`, resource, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      setHasBeenAdded(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <p>============</p>
      <form onSubmit={handleSubmit}>
        Choose your Topic
        <select
          required
          id="topic_id"
          name="topic_id"
          value={selectedTopic.topic_id}
          onChange={selectTopic}
        >
          <option value="" disabled>
            Select a subtopic
          </option>
          {/* {topics.map((topic, i) => {
            return (
              <option key={topic.id} value={topic.id}>
                {topic.topic_name}
              </option>
            );
          })} */}
          {topics.map((topic, i) => {
            return topic.Subtopics.map((subtopic, id) => {
              return (
                <option key={subtopic.id} value={subtopic.id}>
                  {subtopic.topic_name}
                </option>
              );
            });
          })}
        </select>
        <label htmlFor="resource_name">
          Resource Name
          <input
            onChange={handleChange}
            name="resource_name"
            value={resource.resource_name}
            type="text"
            id="resource_name"
          />
        </label>
        <label htmlFor="url">
          URL
          <input
            onChange={handleChange}
            name="url"
            value={resource.url}
            type="text"
            id="url"
          />
        </label>
        {/* <label htmlFor="format">
          Format
          <input
            onChange={handleChange}
            name="format"
            value={resource.format}
            type="text"
            id="format"
          />
        </label> */}
        <label htmlFor="format"
          id="format"
          name="format"
          value={resource.format}
          onChange={handleChange}
          >
          <select>
            <option value={`Course`}>Course</option>
            <option value={`Podcast`}>Podcast</option>
            <option value={`Reading`}>Reading</option>
            <option value={`Video`}>Video</option>
            <option value={`Website`}>Website</option>
          </select>
        </label>

        <label htmlFor="priority">
          Priority (1 to 5)
          <input
            onChange={handleChange}
            name="priority"
            value={resource.priority}
            type="range"
            min="1"
            max="5"
            id="priority"
          />
        </label>
        Complete?
        <label htmlFor="completed">
          Yes
          <input
            onChange={handleChange}
            type="radio"
            id="completed"
            name="complete"
            value="true"
          />
        </label>
        <label htmlFor="notCompleted">
          No
          <input
            onChange={handleChange}
            type="radio"
            id="notCompleted"
            name="complete"
            value="false"
          />
        </label>
        {/* <label htmlFor="reminder">
                    Reminder
					<input
						onChange={handleChange}
						name="reminder"
						value={resource.reminder}
						type="text"
						id="reminder"
					/>
				</label> */}
        Reminder?
        <label htmlFor="sendReminder">
          Yes
          <input
            onChange={handleChange}
            type="radio"
            id="sendReminder"
            name="reminder"
            value="true"
          />
        </label>
        <label htmlFor="noReminder">
          No
          <input
            onChange={handleChange}
            type="radio"
            id="noReminder"
            name="reminder"
            value="false"
          />
        </label>
        <label htmlFor="created_date">
          Created Date
          <input
            onChange={handleChange}
            name="created_date"
            value={resource.created_date}
            type="date"
            id="created_date"
          />
        </label>
        <button>Add Resource</button>
      </form>

      {hasBeenAdded && (
        <p>Resource added successfully</p>
      )}
      <p>============</p>
    </div>
  );
}
