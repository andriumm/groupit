import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, Link } from "react-router-dom";

export default function TopicsList() {

  //const [ topicList, setTopicList] = useState(null);

    /*
  GET exverything to display in the dropdown menu
  */
  const getTopics = async () => {
    try {
      await axios("/topics");
      setNewTopic(newTopic);
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div>
      

      <div>
        <ol>
        {newTopic.map((topic) => (
          <li key={newTopic.id}> topic={newTopic.topic_name} </li>
        ))}
        </ol>
        </div>
        {/* <label>

        <div>Is this a subtopic of any below topic? If yes, select the appropriate one: </div>
              <select  id="parent" name="parent" value={newTopic.parent} onChange={handleSubmit}>
                <option value="empty"></option>
                <option value={newTopic.parent}></option>
              </select>

        </label> */}


    </div>



    </div>
  )
}

export default TopicsList
