import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

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

  const [ newTopic, setNewTopic ] = useState({
    topic_name: '',
    priority: false,
    parent: null, // got to stay null by default otherwise does not pass on to db
  });

  console.log(newTopic)

  const [topicConfirmation, setTopicConfirmation] = useState(null)

  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setNewTopic((state) => ({
      ...state,
      [name]: value
    }));

    
  };

  // POST TOPICS

  const addTopic = async () => {
    try {
      await axios.post("/topics", newTopic, {
        headers: {
          // "Content-Type": "application/json",
					"x-access-token": localStorage.getItem("token"),
				},
    });   
      console.log("New Topic added", newTopic);
      //console.log(newTopic)
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
  }


  //! CREATE PARENT DROPDOWN

  const [ topicList, setTopicList] = useState([]); 
  console.log(topicList)

  const filterParent = topicList.filter(function(topic) {
    // return topic.parent === null ? topic.topic_name : null // to prevent bug due to form sent to db without data
    return topic.parent === null 
  })
  
  console.log(filterParent)

  // GET TOPICS OBJECT

  const getTopics = async () => {
    try {
      const listing = await axios.get("/topics", {
				headers: {
					"x-access-token": localStorage.getItem("token"),
				},
			});

      console.log(listing.data)
      setTopicList(listing.data);
      
    } catch (error) {
      console.log(error);
    }
    
  };

  //! SUBTOPIC AREA

  const [ subtopic, setSubtopic ] = useState({
    topic_name: '',
    priority: false,
    parent: 0,
  })

const [subtopicConfirmation, setSubtopicConfirmation] = useState(null);


  const handleSubtopicSubmit = (e) => {
    e.preventDefault();
    addSubtopics();
    displaySubtopicConfirmation()
  }

  const handleSubtopicChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;


    setSubtopic((state) => ({
      ...state,
      [name]: value
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
      console.log(subtopic)
    } catch (error) {
			console.log(error);
		}
  };

  const displaySubtopicConfirmation = () => {
    setSubtopicConfirmation(subtopic)
  }


  return (

    <div>
      
      <div>
      <h3>Add a new topic</h3>


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

				<input type="submit" value="Add Topic" />
			</form>
      </div>

    {/* SEPARATION: FORM 1 ABOVE / FORM 2 BELOW  */}

    
    {topicConfirmation && (
    <div> New topic added!</div>
    )}
    
    <div>

      <h3> Or/and add a subtopic to any of your topics </h3>


      <form onSubmit={handleSubtopicSubmit}>
          
          <label htmlFor="subtopic">
            Subtopic name
            <input
              type="text"
              name="topic_name"
              value={subtopic.topic_name}
              onChange={handleSubtopicChange}
              id="subtopic"
            />
          </label>

          <label htmlFor="parent-dropdown">
            Which topic does it belong to?
            <select id={topicList.id} name="parent" onChange={handleSubtopicChange}>
              <option value="empty"></option>
                {filterParent.map((topicName) => (         
              <option key={topicName.id} value={topicName.id}> {topicName.topic_name} </option>
                ))}
            </select>
        
          </label>
              
            <label htmlFor="priority">
              Set it as a priority
              <input
                type="checkbox"
                checked={subtopic.priority}
                name="priority"
                onChange={handleSubtopicChange}
                value={subtopic.priority}
                id="priority"
              />
            </label>
        
        <input type="submit" value="Add subtopic" />

       </form>

    </div>
    
    { subtopicConfirmation && (
      <div> New subtopic added! </div>
    )} 

    </div>

  )

}

export default InsertTopics
