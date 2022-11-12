import React, { useState } from 'react';
// import AppImage from '../assets/Sign.jpg';
import '../App.css';
import baseURL from '../baseURL';

const CreateUser = () => {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("");
    const [Message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const handleDataName = (event) => {
        setName(event.target.value);
    }

    const handleDataPassword = (event) => {
        setPassword(event.target.value);
    }

    const handleDataRole = (event) => {
        setUserType(event.target.value);
    }

    const handleSignIn = (event) => {
        event.preventDefault();
        fetch(`${baseURL}/api/auth/signup`, {
            method: "POST",
            body: JSON.stringify({
                name: name,
                password: password,
                role: userType
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.json())
            .then(json => {
                if (json.responseMessage) {
                    setMessage(json.responseMessage);
                    setStatus(json.httpStatus);
                }
            });
    }

    return (
        <>
            <div className="signinContainer">
                <div className="wrapper">
                    <div className="title">
                        Add User
                    </div>
                    <form onSubmit={handleSignIn}>
                    <div className="form">
                        <div className="inputfield">
                            <label>Name</label>
                            <input type="text" required="required"  className="input" name="name" value={name} onChange={handleDataName} />
                        </div>
                        <div className="inputfield">
                            <label>Password</label>
                            <input type="password" required="required" className="input" name="password" value={password} onChange={handleDataPassword}/>
                        </div>
                        <div className="inputfield">
                            <label>Choose a User Type</label>
                            <div className="custom_select">
                                <select name="role" id="role" required="required"  value={userType} onChange={handleDataRole}>
                                    <option value="">Select</option>
                                    <option value="admin">Admin</option>
                                    <option value="manager">Manager</option>
                                    <option value="employee">Employee</option>
                                </select>
                            </div>
                        </div>
                        <div className="inputfield">
                            <input type="submit" required="required" value="Register" className="btn" />
                        </div>
                    </div>
                    </form>
                </div>
                <div className={`${status === 'OK' ? "Message" : "errorMessage"}`}>{Message}</div>
            </div>
        </>
    )
}

export default CreateUser;