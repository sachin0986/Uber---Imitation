import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import { VITE_BASE_URL } from "../Utils/contants";

const style = {
    inputStyle: `bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base`,
    buttonStyle: `bg-black text-white font-semibold mb-7 rounded px-4 py-3 w-full text-lg`
};

const CaptainLogin = () => {

    const {captain, setCaptain } = React.useContext(CaptainDataContext); 
    const navigate = useNavigate(); 

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captainData, setCaptainData] = useState({});


    const submitHandler = async (e) => {
        e.preventDefault();
        const captain = {
            email: email,
            password: password
        }

        const response = await axios.post(VITE_BASE_URL + `captains/login`, captain);
        if(response.status === 200){
            const data = response.data;
            setCaptain(response.captain);
            localStorage.setItem('token', data.token);
            navigate('/captain-home');
        }

        console.log(captainData);
        setEmail('');
        setPassword('');
    };

    return (
        <div className="p-7 h-screen flex flex-col justify-between">
            <div>
                <img className="w-16 mb-10" src="/src/assets/pngimg.com - uber_PNG24.png" alt="uber-home-image" />

                <form onSubmit={submitHandler}>
                    <h2 className="text-lg font-medium mb-2">What's your email?</h2>
                    <input 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={style.inputStyle}
                        type="email" 
                        placeholder="email@example.com" 
                    />
                    <h3 className="text-lg font-medium mb-2">Enter Password</h3>
                    <input 
                        required 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={style.inputStyle}
                        type="password" 
                        placeholder="password" 
                    />
                    <button className={style.buttonStyle}>Login</button>
                </form>

                <p className="text-center">
                    Join a fleet? <Link to='/captain-signup' className="text-blue-600">Register as a Captain</Link>
                </p>
            </div>

            <div>
                <Link to='/user-login' className="bg-[#f3c164] hover:bg-[#d5622d] flex justify-center items-center text-black font-semibold mb-5 rounded px-4 py-2 w-full text-lg">Signin as User</Link>
            </div>
        </div>
    );
};

export default CaptainLogin;