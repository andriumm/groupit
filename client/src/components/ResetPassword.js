import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function ResetPassword() {
    let history = useHistory();
    let pathname = history.location.pathname;

    const [isValidToken, setIsValidToken] = useState(null);
    const [hasBeenReset, setHasBeenReset] = useState(null);
    const [resetFailed, setResetFailed] = useState(null);
    const [password, setPassword] = useState({
        password: ""
    })

    useEffect(() => {
        console.log(pathname)
        verifyToken()
    });

    const verifyToken = async () => {
        const response = await axios.get(`${pathname}`)
        console.log(response);
        if(response.status===200){
            setIsValidToken(true);
        } else {
            setIsValidToken(false)
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(value)
        setPassword({
            [name]: value
        })
    }

    const resetPassword = async () => {
        const response = await axios(`${pathname}/update`, {
            method: "POST",
            data: password
        })
        console.log(response)
        if(response.status === 200) {
            setHasBeenReset(true);
        } else {
            setResetFailed(true);
        }
    }

    return (
        <div>
            Reset PW screen
            {isValidToken ? (
                <div>
                <p>you can reset your password</p>
                <label htmlFor="password">
					Enter your new password
					<input
						onChange={handleChange}
						name="password"
						value={password.password}
						type="text"
						id="password"
					/>
				</label>
                <button onClick={resetPassword}> Reset Password</button>
                </div>
            ) : (
                <p>Incorrect URL, can't reset password</p>
            )}

            { hasBeenReset && (
                <p>Password successfully updated</p>
            )}

            { resetFailed && (
                <p>Something went wrong. Password not changed.</p>
            )}

        </div>
    )
}
