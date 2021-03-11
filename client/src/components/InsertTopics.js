import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
//import SkipButton from './SkipButton'

const InsertTopics = () => {

  const [ newTopic, setNewTopic ] = useState({
    topic: '',
    isPriority: false,
    subtopic: '',
  });

  const history = useHistory();

  useEffect(() => {
    addTopic();

    let token = localStorage.getItem("token");
    if (!token) {
      history.push("/login");
    }
    console.log(token);
  }, []);


  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setNewTopic((state) => ({
      ...state,
      [name]: value
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    addTopic();

  };


  const addTopic = async () => {
    //const { topic_name, priority, parent } = newTopic;
    try {
      //const newTopic = await axios.post("/topics/:user_id", { 
      // const userId = {} <- figure this out (how do I recognise my user?)
      await axios.post("/topics", newTopic, {
        // topic_name, 
        // priority, 
        // parent

        headers: {
          "Content-Type": "application/json",
					"x-access-token": localStorage.getItem("token"),
				},

    });
    
      console.log("New Topic added", newTopic);
      //console.log(newTopic)

    } catch (error) {
			console.log(error);
		}
};

  return (

    <div>

      <h1>Add Topics</h1>


      <form onSubmit={handleSubmit}>
				<label htmlFor="topic">
					Topic name
					<input
            type="text"
						name="topic"
						value={newTopic.topic}
            onChange={handleChange}
						id="topic"
					/>
				</label>
          
        <label htmlFor="priority">
          Set it as a priority
          <input
            type="checkbox"
            checked={newTopic.isPriority}
            name="isPriority"
            onChange={handleChange}
            value={newTopic.isPriority}
            id="priority"
          />
        </label>

				<label htmlFor="subtopic">
					Any subtopic in mind?
					<input
            type="text"
						name="subtopic"
						value={newTopic.subtopic}
            onChange={handleChange}
						id="subtopic"
					/>
				</label>

				<input type="submit" value="Add Topic" />
			</form>



    </div>


  )


}

export default InsertTopics