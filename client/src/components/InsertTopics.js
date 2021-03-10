import React, { useState } from "react";
import SkipButton from './SkipButton'

const InsertTopics = ({ onAdd }) => {

  const [ newTopic, setTopic ] = useState('')
  const [ priority, setPriority ] = useState(false)
  const [ subtopic, setSubtopic ] = useState(null)


  // const handleChange = (e) => {
  //   e.target.checked === "yes_priority" ? setPriority(true) : setPriority(false)
  //   e.target.checked === "no_priority" ? setPriority(false) : setPriority(true)
  // }
  

  const handleSubmit = (e) => {
    e.preventDefault();
    addTopic();
  

    onAdd({ newTopic, priority, subtopic })

    setTopic('')
    setPriority(false)
    setSubtopic(null)
  }

  const addTopic = () => {
    fetch("/:user_id", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newTopic, priority, subtopic }),
    })
    .then(() => setTopic(newTopic))
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
						onChange={(e) => setTopic(e.target.value)}
            type="text"
						name="topic"
						value={newTopic}
						id="topic"
					/>
				</label>
          
        <label htmlFor="priority">
          Tick here if this is a priority
          <input
            onChange={(e) => setPriority(e.currentTarget.checked)}
            type="checkbox"
            checked={priority}
            name="priority"
            value={priority}
            id="priority"
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