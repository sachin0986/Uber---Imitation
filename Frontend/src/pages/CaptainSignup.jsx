import React, { useState } from "react";
import { Link } from 'react-router-dom'
import { CaptainDataContext } from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { VITE_BASE_URL } from '../Utils/contants';

const style = {
    input: `bg-[#eeeeee] mb-4 rounded px-4 py-2 border w-full text-base placeholder:text-sm`,
    inputHalf: `bg-[#eeeeee] mb-4 rounded px-4 py-2 border w-1/2 text-base placeholder:text-sm`,
    flexGap: `flex gap-3`,
    button: `bg-black text-white font-semibold mb-7 rounded px-4 py-3 w-full text-lg`
};

const CaptainSignup = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [vehicleColor, setVehicleColor] = useState('');
    const [vehiclePlate, setVehiclePlate] = useState('');
    const [vehicleCapacity, setVehicleCapacity] = useState('');
    const [vehicleType, setVehicleType] = useState('');
    const { setCaptain } = React.useContext(CaptainDataContext);

    const submitHandler = async (e) => {
        e.preventDefault();
        const captainData = {
            fullname: {
                firstname: firstName,
                lastname: lastName
            },
            email,
            password,
            vehicle: {
                color: vehicleColor,
                plate: vehiclePlate,
                capacity: vehicleCapacity,
                vehicleType: vehicleType
            }
        };

        const response = await axios.post(VITE_BASE_URL + `captains/register`, captainData);
        if(response.status === 201){
            const data = response.data;
            setCaptain(data.captain);
            localStorage.setItem('token', data.token);
            navigate('/captain-home')
        }
        // TODO: Send captainData to backend API here

        // Reset form
        setEmail('');
        setPassword('');
        setFirstName('');
        setLastName('');
        setVehicleColor('');
        setVehiclePlate('');
        setVehicleCapacity('');
        setVehicleType('');
    };

    return (
        <div className="p-7 min-h-screen flex flex-col justify-between">
            <div>
                <img className="w-16 mb-10" src="/src/assets/pngimg.com - uber_PNG24.png" alt="uber-home-image" />

                <form onSubmit={submitHandler}>
                    <h3 className="text-base font-medium mb-2">What's our Captain's name?</h3>
                    <div className={style.flexGap}>
                        <input
                            required
                            className={style.inputHalf}
                            type="text"
                            placeholder="First name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <input
                            required
                            className={style.inputHalf}
                            type="text"
                            placeholder="Last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

                    <h2 className="text-base font-medium mb-2">What's our Captain's email?</h2>
                    <input
                        required
                        className={style.input}
                        type="email"
                        placeholder="email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <h3 className="text-base font-medium mb-2">Enter Password</h3>
                    <input
                        required
                        className={style.input}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <h3 className="text-base font-medium mb-2">Vehicle Information</h3>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <input
                            required
                            className={style.input}
                            type="text"
                            placeholder="Vehicle Color"
                            value={vehicleColor}
                            onChange={(e) => setVehicleColor(e.target.value)}
                        />
                        <input
                            required
                            className={style.input}
                            type="text"
                            placeholder="Vehicle Plate"
                            value={vehiclePlate}
                            onChange={(e) => setVehiclePlate(e.target.value)}
                        />
                        <input
                            required
                            className={style.input}
                            type="number"
                            min="1"
                            placeholder="Vehicle Capacity"
                            value={vehicleCapacity}
                            onChange={(e) => setVehicleCapacity(e.target.value)}
                        />
                        <select
                            required
                            className={style.input}
                            value={vehicleType}
                            onChange={(e) => setVehicleType(e.target.value)}
                        >
                            <option value="">Select Type</option>
                            <option value="car">Car</option>
                            <option value="bike">Bike</option>
                            <option value="auto">Auto</option>
                        </select>
                    </div>
                    <button className={style.button}>Create Captain Account</button>
                </form>

                <p className="text-center">
                    Already a member? <Link to='/captain-login' className="text-blue-600">Login here</Link>
                </p>
            </div>

            <div>
                <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
                    Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
            </div>
        </div>
    );
};

export default CaptainSignup;