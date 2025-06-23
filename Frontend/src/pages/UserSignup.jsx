import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';
import { VITE_BASE_URL } from "../Utils/contants";

const style = {
    oldInput: `bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-base placeholder:text-sm`,
    loginInputStyle: `bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm`,
    buttonStyle: `bg-black text-white font-semibold mb-7 rounded px-4 py-3 w-full text-lg`
};

const UserSignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [userData, setuserData] = useState({});

    const navigate = useNavigate();
    const {user, setUser} = React.useContext(UserDataContext)

    const submitHnadeler = async (e) => {
        e.preventDefault();
        const newUser = {
            fullname: {
                firstname: firstName,
                lastname: lastName
            },
            email: email,
            password: password
        }

        const response = await axios.post(VITE_BASE_URL + `/users/register`, newUser);
        if(response.status === 201){
            const data = response.data;
            setUser(data.user);
            localStorage.setItem('token', data.token);
            navigate('/home');
        }

        console.log(userData);
        //setEmail('');
        //setPassword('');
        //setfirstName('');
        //setlastName('');
    }
    return(
         <div className="p-7 h-screen flex flex-col justify-between">
            <div>
                <img className="w-16 mb-10" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="uber-home-image" />

                <form onSubmit={(e) => {
                    submitHnadeler(e)
                }}>

                  <h3 className="text-base font-medium mb-2">what's your name</h3>
                  <div className="flex gap-3">
                    <input 
                        required 
                        className={style.loginInputStyle}
                        type="text" 
                        placeholder="First name"
                        value={firstName}
                        onChange={(e) => setfirstName(e.target.value)}
                    />


                    <input 
                        required 
                        className={style.loginInputStyle}
                        type="text" 
                        placeholder="Last name" 
                        value={lastName}
                        onChange={(e) => setlastName(e.target.value)}
                    />
                  </div>

                    <h2 className="text-base font-medium mb-2">What's your email?</h2>
                    <input 
                        required 
                        className={style.oldInput}
                        type="email" 
                        placeholder="email@example.com" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <h3 className="text-base font-medium mb-2">Enter Password</h3>
                    <input 
                        required 
                        className={style.oldInput}
                        type="password" 
                        placeholder="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className={style.buttonStyle}>Create Account</button>
                </form>

                <p className="text-center">
                    Already a member ? <Link to='/user-login' className="text-blue-600">Login here</Link>
                </p>
            </div>

            <div>
          <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
            Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
        </div>
        </div>
    )
}

export default UserSignup;