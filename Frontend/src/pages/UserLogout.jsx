import React from "react";
import axios from "axios";
import { VITE_BASE_URL } from "../Utils/contants";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {

    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    axios.get(VITE_BASE_URL + `users/logout`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if(response.status === 200){
            localStorage.removeItem('token');
            navigate('/user-login');
        }
    })

    return(
        <>
        user Logout
        </>
    )
}

export default UserLogout;