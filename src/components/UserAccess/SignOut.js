import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Navigate } from "react-router-dom";
import Loader from "../Loader";
import baseURL from '../../baseURL';

export default function SignOut({ setIsValidToken }) {

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const data = await fetch(`${baseURL}/api/auth/logout`, {
                credentials: "include",
                headers: {
                    token: Cookies.get('token'),
                }
            });
            console.log(data);
            if (data.status === 200) {
                setIsValidToken(false);
                Cookies.remove('token');
                Cookies.remove('editEnabled');
                Cookies.remove('role');
                Cookies.remove('name');
                setIsLoading(false);
            }
        }
        fetchData()
            .catch(console.error);
    }, [setIsValidToken])

    // useEffect(() => {
    //     const SignOutUser = () => {
    //         setIsValidToken(false);
    //         Cookies.remove('token');
    //         Cookies.remove('editEnabled');
    //         Cookies.remove('role');
    //         Cookies.remove('name');
    //         setIsLoading(false);
    //     }
    //     SignOutUser();
    // }, [setIsValidToken])

    if (isLoading) {
        return <Loader />
    }

    return (
        <Navigate to="/" />
    )
}
