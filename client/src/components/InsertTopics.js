import axios from "axios";
import React, { useState } from "react";
//import SkipButton from './SkipButton'

const InsertTopics = () => {

  const [ newTopic, setNewTopic ] = useState({
    topic: '',
    isPriority: false,
    subtopic: null,
  })

  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    setNewTopic((state) => ({
      ...state,
      [name]: value
    }));
  }


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
    .post("/:user_id", newTopic, {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });

      console.log(newTopic);
      console.log(newTopic.data)

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