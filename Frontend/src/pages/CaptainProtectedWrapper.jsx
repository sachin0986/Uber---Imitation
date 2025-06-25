import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CaptainProtectedWrapper = ({ children }) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/captain-login');
        }
    }, [token, navigate]);

    return <>{children}</>;
};

export default CaptainProtectedWrapper;