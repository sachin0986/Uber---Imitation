import React, { useState } from "react";
import { Link } from "react-router-dom";

const style = {
    inputStyle: `bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base`,
    buttonStyle: `bg-black text-white font-semibold mb-7 rounded px-4 py-3 w-full text-lg`
};

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState({});



    const submitHandler = (e) => {
        e.preventDefault();
        setUserData({
            email: email,
            password: password
        })
        console.log(userData);
        setEmail('');
        setPassword('');
    };

    return (
        <div className="p-7 h-screen flex flex-col justify-between">
            <div>
                <img className="w-16 mb-10" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="uber-home-image" />

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
                    New Here? <Link to='/user-signup' className="text-blue-600">Create New Account</Link>
                </p>
            </div>

            <div>
                <Link to='/captain-login' className="bg-[#10b461] flex justify-center items-center text-black font-semibold mb-5 rounded px-4 py-2 w-full text-lg">Signin as Captain</Link>
            </div>
        </div>
    );
};

export default UserLogin;