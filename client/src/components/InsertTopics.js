import React, { useState } from "react";
import SkipButton from './SkipButton'

export default function InsertTopics() {

  const [ newTopic, setTopics ] = useState({
    topic: "",
    priority: false,
    subTopic: null,
  });

  // const handleChange = (e) => {
  //   if (newTopic.priority.id === "yes_priority") {
  //     return newTopic.priority = true
  //   }

  //   setTopics((state) => ({...state, [e.target.value]: e.target.value}));
  // };

  const handleChange = ({ target }) => {
		
    if (newTopic.priority.id === "yes_priority") {
      return newTopic.priority = true
    }
    
    const { name, value } = target;
		setTopics((state) => ({
			...state,
			[name]: value,
		}));

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTopic();
  }

  const addTopic = () => {
    fetch("/:user_id", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic, priority, subTopic }),
    })
    .then(() => setTopics(newTopic))
    .catch((error => {
      return error;
    }));
    
  }

  return (

    <div>

      <h1>Add Topics</h1>


      <form onSubmit={handleSubmit}>
				<label htmlFor="topic">
					Add a Topic
					<input
						onChange={handleChange}
            type="text"
						name="topic"
						value={newTopic.topic}
						id="topic"
					/>
				</label>

				<label htmlFor="priority">
					Yes
					<input
						onChange={handleChange}
						type="radio"
            name="priority"
						value={newTopic.priority}
						id="yes_priority"
					/>
				</label>

				<label htmlFor="priority">
					No
					<input
						onChange={handleChange}
            type="radio"
						name="priority"
						value={newTopic.priority}
						id="no_priority"
					/>
				</label>

				<label htmlFor="subtopic">
					Any subtopic in mind?
					<input
						onChange={handleChange}
            type="text"
						name="subtopic"
						value={newTopic.subtopic}
						id="subtopic"
					/>
				</label>

				<button>Add</button>
			</form>



    </div>


  )


}

