import axios from "axios";
import React, { useState } from "react";
//import SkipButton from './SkipButton'

const InsertTopics = () => {

  const [ newTopic, setNewTopic ] = useState([]);
  const [ topic, setTopic ] = useState('');
  const [ priority, setPriority ] = useState(false);
  const [ subtopic, setSubtopic ] = useState(null);
  

  const handleSubmit = (e) => {
    e.preventDefault();

    /* To fix if time allows <- does not clear up input except for priority*/

    // setTopic('')
    // setPriority(false)
    // setSubtopic(null)

    addTopic();

  }

  const addTopic = () => {
    
    axios
    .post("/:user_id", newTopic)
    .then(result => {

      console.log(result);
      console.log(result.data)
  })
}

  // const addTopic = () => {
  //   fetch("/:user_id", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ topic, priority, subtopic }),
  //   })
  //   .then(() => setNewTopic(newTopic))
  //   .catch((error => {
  //     return error;
  //   }));
    
  // }

  return (

    <div>

      <h1>Add Topics</h1>


      <form onSubmit={handleSubmit}>
				<label htmlFor="topic">
					Topic name
					<input
						onChange={(e) => setTopic(e.target.value)}
            type="text"
						name="topic"
						value={topic}
						id="topic"
					/>
				</label>
          
        <label htmlFor="priority">
          Set it as a priority
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

				<input type="submit" value="Add Topic" />
			</form>



    </div>


  )


}

export default InsertTopics