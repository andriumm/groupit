import React, { useState } from "react";
import SkipButton from './SkipButton'

const InsertTopics = ({ onAdd }) => {

  const [ newTopic, setTopics ] = useState('')
  const [ priority, setPriority ] = useState(false)
  const [ subtopic, setSubtopic ] = useState(null)


  const handleChange = (e) => {
    e.target.checked === "yes_priority" ? setPriority(true) : false
  }

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
      body: JSON.stringify({ newTopic, priority, subtopic }),
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
						onChange={(e) => setTopics(e.target.value)}
            type="text"
						name="topic"
						value={newTopic}
						id="topic"
					/>
				</label>

				<label htmlFor="priority">
					Yes
					<input
						onChange={handleChange}
						type="radio"
            name="priority"
						value={priority}
						id="yes_priority"
					/>
				</label>

				<label htmlFor="priority">
					No
					<input
						onChange={handleChange}
            type="radio"
						name="priority"
						value={priority}
						id="no_priority"
					/>
				</label>

				<label htmlFor="subtopic">
					Any subtopic in mind?
					<input
						onChange={(e) => setSubtopic(e.target.value)}
            type="text"
						name="subtopic"
						value={subtopic}
						id="subtopic"
					/>
				</label>

				<button>Add</button>
			</form>



    </div>


  )


}

export default InsertTopics