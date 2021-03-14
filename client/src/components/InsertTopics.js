import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
//import SkipButton from './SkipButton'

const InsertTopics = () => {

  const [ newTopic, setNewTopic ] = useState({
    //user_id: 1,
    topic_name: '',
    priority: false,
    parent: null, // got to stay by default null otherwise does not pass on to db
    //parent: 0,
  });

  // const [ topicList, setTopicList] = useState([]);

  const history = useHistory();

  useEffect(() => {
    addTopic();
    // let token
    // let user_id = token
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
      // [user_id]: 1,
      [name]: value
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    addTopic();
    //getTopics();

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

/*
const addSubtopic
GET for exverything which will be in the dropdown menu
*/
// const getTopics = async () => {
//     try {
//       const newTopic = await axios("/topics/:id");
//       setNewTopic(newTopic);
//     } catch (error) {
//       console.log(error);
//     }
//   };


  return (

    <div>
      {/* Redo to add dropdown menu */}
      <h1>Add Topics</h1>


      <form onSubmit={handleSubmit}>
				<label htmlFor="topic">
					Topic name
					<input
            type="text"
						name="topic_name"
						value={newTopic.topic_name}
            onChange={handleChange}
						id="topic"
					/>
				</label>
          
        <label htmlFor="priority">
          Set it as a priority
          <input
            type="checkbox"
            checked={newTopic.priority}
            name="priority"
            onChange={handleChange}
            value={newTopic.priority}
            id="priority"
          />
        </label>

        {/* <label>

        <div>Is this a subtopic of any below topic? If yes, select the appropriate one: </div>
              <select  id="parent" name="parent" value={newTopic.parent} onChange={handleSubmit}>
                <option value="empty"></option>
                <option value={newTopic.parent}></option>
              </select>

        </label> */}


				{/* <label htmlFor="parent">
					Any subtopic in mind?
					<input
            type="text"
						name="parent"
						value={newTopic.parent}
            onChange={handleChange}
						id="parent"
					/>
				</label> */}

				<input type="submit" value="Add Topic" />
			</form>



    </div>


  )


}

export default InsertTopics