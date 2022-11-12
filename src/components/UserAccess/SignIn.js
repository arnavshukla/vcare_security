import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../Header';
import '../UserAccess/Sign.css';
import '../../App.css'
import baseURL from '../../baseURL';
import Loader from '../Loader';
import Cookies from 'js-cookie';
import ErrorManageComponent from '../ErrorManageComponent';

const SignIn = () => {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [isValidToken, setIsValidToken] = useState(true);
    const [error, setError] = useState('');
    const [createUser, setCreateUser] = useState(false);
    const [role, setRole] = useState("");
    const [isLoading, setIsLoading] = useState();
    const [editEnabled, setEditEnabled] = useState();
    const [mainError, setMainError] = useState();
    const history = useNavigate();

    useEffect(() => {
        if (Cookies.get('token'))
            setIsValidToken(true);
        if (Cookies.get('editEnabled') === 'true')
            setEditEnabled(true)
        if (Cookies.get('editEnabled') === 'false')
            setEditEnabled(false)
        if (Cookies.get('role'))
            setRole(Cookies.get('role'))
    }, [])

    const handleDataName = (event) => {
        setName(event.target.value);
        Cookies.set('name', event.target.value)
    }

    const handleDataPassword = (event) => {
        setPassword(event.target.value);
    }

    const handleSignIn = (event) => {
        event.preventDefault();
        setIsLoading(true);
        fetch(`${baseURL}/api/auth/signin`, {
            method: "POST",
            body: JSON.stringify({
                name: name,
                password: password,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.json())
            .then(json => {
                if (json.token) {
                    setCreateUser(json.createUser)
                    Cookies.set('role', json.role)
                    setRole(json.role);
                    setIsLoading(false);
                    Cookies.set('token', json.token)
                    setIsValidToken(true);
                    Cookies.set('editEnabled', json.editEnabled)
                    setEditEnabled(json.editEnabled)
                    json.role && json.role === 'employee' ? history("/employeeworksheet") : history("/clientmaster");
                }
                else {
                    setError(json.responseMessage);
                    setIsLoading(false);
                }
            },
                err => {
                    setIsLoading(false);
                    setMainError(err)
                });
    }

    if (isLoading) {
        return <Loader />
    }

    if (mainError) {
        return <ErrorManageComponent/>
    }

    return (
        <>
            {isValidToken ? <Header editEnabled={editEnabled} name={name} createUser={createUser} role={role} setIsValidToken={setIsValidToken} /> :
                <div className="signinContainer">
                    <div className="wrapper">
                        <div className="title">
                            Sign In
                        </div>
                        <form onSubmit={handleSignIn}>
                            <div className="form">
                                <div className="inputfield">
                                    <label>Name</label>
                                    <input type="text" required className="input" name="name" value={name} onChange={handleDataName} />
                                </div>
                                <div className="inputfield">
                                    <label>Password</label>
                                    <input type="password" required className="input" name="password" value={password} onChange={handleDataPassword} />
                                </div>
                                <div className="inputfield">
                                    <input type="submit" value="Sign In" className="btn" />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="errorMessage">{error}</div>
                </div>
            }
        </>
    )
}

export default SignIn