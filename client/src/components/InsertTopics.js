import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import TopicsList from "./TopicsList";
//import TopicsList from './TopicsList'
//import SkipButton from './SkipButton'

const InsertTopics = () => {

  const [ newTopic, setNewTopic ] = useState({
    topic_name: '',
    priority: false,
    parent: null, // got to stay by default null otherwise does not pass on to db
  });

  console.log(newTopic)

  const [ topicList, setTopicList] = useState([]);
  console.log(topicList)

  const history = useHistory();

  useEffect(() => {
    addTopic();
    getTopics();

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
    getTopics();
  };


  const addTopic = async () => {
    try {
      await axios.post("/topics", newTopic, {
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

  //   /*
  // GET exverything to display in the dropdown menu
  // */
  const getTopics = async () => {
    try {
      const listing = await axios.get("/topics", {
				headers: {
					"x-access-token": localStorage.getItem("token"),
				},
			});

      setTopicList(listing);
      const filterParent = Object.values(listing).filter(topic => topic.parent === null)
      console.log(filterParent)
    } catch (error) {
      console.log(error);
    }
  };

  //const filterParent = topicList.filter(topic => topic.parent === null)
  // console.log(filterParent)



  return (

    <div>
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

        <h2>Parent Topics</h2>
        <div>{topicList.topic_name}</div>

    </div>

  )

}

export default InsertTopics