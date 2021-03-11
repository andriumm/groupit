import React, { useState, useEffect } from 'react';
import axios from "axios";

export default function AddResource() {

    const [topics, setTopics] = useState([]);
    const [resource, setResource] = useState({
        topic_id: "",
        resource_name: "",
        url: "",
        format: "",
        priority: "1",
        complete: "",
        reminder: "",
        created_date: "",
    });

    useEffect(() => {
        getTopics();
    }, []);

    const getTopics = async () => {
        try {
            const response = await axios.get("/topics/", {
                headers: {
                    "x-access-token" : localStorage.getItem("token")
                }
            });
            setTopics(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    const handleChange = ({ target }) => {
        const { name, value } = target;
        setResource((state) => ({
            ...state,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(resource.created_date)
        addResource();
    };

    const addResource = async () => {
        console.log(localStorage.getItem("token"))
        try {
            await axios.post("/resources/", resource, {
                headers: {
                    "x-access-token" : localStorage.getItem("token"),
                },              
            });
        } catch (error) {
            console.log(error);
        }
    };

    // const updateProfile = async () => {
	// 	try {
	// 		await axios.put(`/users/profile_update`, update, {
	// 			headers: {
	// 				“x-access-token”: localStorage.getItem(“token”),
	// 			},
	// 		});
	// 		console.log(“Your profile has been updated!“, update);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

    return (
        <div>
            <p>============</p>
            <form onSubmit={handleSubmit}>
                Choose your Topic
                <select 
                    id="topic_id" 
                    name="topic_id" 
                    value={resource.topic_id} 
                    onChange={handleChange}
                    > 
                        {topics.map((topic, i) => {
                            return <option key={topic.id} value={topic.id}>{topic.topic_name}</option>
                        })}
                </select>

				<label htmlFor="resource_name">
					Resource Name
					<input
						onChange={handleChange}
						name="resource_name"
						value={resource.resource_name}
						type="text"
						id="resource_name"
					/>
				</label>
                <label htmlFor="url">
					URL
					<input
						onChange={handleChange}
						name="url"
						value={resource.url}
						type="text"
						id="url"
					/>
				</label>
                <label htmlFor="format">
					Format
					<input
						onChange={handleChange}
						name="format"
						value={resource.format}
						type="text"
						id="format"
					/>
				</label>

                <label htmlFor="priority">
					Priority (1 to 5)
					<input
						onChange={handleChange}
						name="priority"
						value={resource.priority}
						type="range"
                        min="1"
                        max="5"
						id="priority"
					/>
				</label>
                Complete?
                <label htmlFor="completed">Yes
                    <input 
                        onChange={handleChange} 
                        type="radio" 
                        id="completed" 
                        name="complete" 
                        value="true"
                    />
                </label>
                <label htmlFor="notCompleted">No
                    <input 
                        onChange={handleChange} 
                        type="radio" 
                        id="notCompleted" 
                        name="complete" 
                        value="false"
                    />
                </label>
                {/* <label htmlFor="reminder">
                    Reminder
					<input
						onChange={handleChange}
						name="reminder"
						value={resource.reminder}
						type="text"
						id="reminder"
					/>
				</label> */}

                Reminder?
                <label htmlFor="sendReminder">Yes
                    <input 
                        onChange={handleChange} 
                        type="radio" 
                        id="sendReminder" 
                        name="reminder" 
                        value="true"
                    />
                </label>
                <label htmlFor="noReminder">No
                    <input 
                        onChange={handleChange} 
                        type="radio" 
                        id="noReminder" 
                        name="reminder" 
                        value="false"
                    />
                </label>


                <label htmlFor="created_date">
                    Created Date
					<input
						onChange={handleChange}
						name="created_date"
						value={resource.created_date}
						type="date"
						id="created_date"
					/>
				</label>

				<button>Add Resource</button>
			</form>
            <p>============</p>
        </div>
    )
}
