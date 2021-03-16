import React, { useState } from 'react';
import axios from "axios";

export default function SendResetPasswordEmail() {

    const [email, setEmail] = useState({
        email: ""
    })

    const [success, setSuccess] = useState(null)

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(value)
        setEmail({
            [name]: value
        })
    }

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     console.log(email)
    //     const result = await axios.post(`/resetpassword`, {
    //         method: "POST",
    //         data: email
    //     })
    //     console.log(result)
    // }

    const sendEmail = async () => {
        const response = await axios("/resetpassword", {
            method: "POST",
            data: email
        })
        console.log(response)
        if(response.status === 200) {
            setSuccess(true);
        }
    }

    return (
        <div>
            Enter your email below and you will receive an email to reset your password if we have your details on record.
            <label htmlFor="email">
				Enter your email
				<input
					onChange={handleChange}
					name="email"
					value={email.email}
					type="text"
					id="email"
				/>
			</label>
            <button onClick={sendEmail}>Send Email</button>

            {success && (
                <p>Email sent successfully</p>
            )
            }
        </div>
    )
}
