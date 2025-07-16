import React, { useState } from "react";
import { RiArrowDownWideFill } from "react-icons/ri";
import { GrLocationPin } from "react-icons/gr";
import { RiUserLocationFill } from "react-icons/ri";
import { BsCashStack } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { VITE_BASE_URL } from "../Utils/contants";
import axios from "axios";

const ConfirmRidePopUpDetailsPanel = (props) => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`${VITE_BASE_URL}rides/start-ride`, {
        params: {
          rideId: props.ride._id,
          otp: otp
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.status === 200) {
        // Fix: Use correct prop names (camelCase)
        props.setConfirmRidePopUpPanel(false);
        props.setRidePopUpPanel(false);
        navigate('/captain-riding', { state: { ride: props.ride } });
      }
    } catch (error) {
      // Optionally show error to user
    }
  };

  return (
    <div className="relative h-[90vh] flex flex-col justify-between">
      <h3 className="text-2xl font-semibold mb-5">Confirm this ride to Start</h3>
      <button
        onClick={() => {
          props.setConfirmRidePopUpPanel(false);
          props.setRidePopUpPanel(true);
        }}
        className="absolute right-4 top-1 text-black hover:text-black"
      >
        <RiArrowDownWideFill size={28} />
      </button>
      <div className="flex items-center justify-between mt-4 p-3 bg-yellow-300 rounded-2xl ">
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 object-cover rounded-full "
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s"
            alt="captain-image"
          />
          <h3 className="text-lg font-medium">
            {props.ride?.user?.fullname?.firstname + " " + props.ride?.user?.fullname?.lastname}
          </h3>
        </div>
        <h5 className="text-lg font-semibold">2.2 KM</h5>
      </div>
      <div className="flex-grow flex justify-between gap-2 flex-col items-center">
        <div className="w-full mt-5">
          <div className="flex gap-3 items-center p-2 border-b-2 border-gray-300">
            <GrLocationPin size={25} />
            <div>
              <p className="text-sm -mt-1 text-gray-600">{props.ride?.pickup}</p>
            </div>
          </div>
          <div className="flex gap-3 items-center p-2 border-b-2 border-gray-300">
            <RiUserLocationFill size={20} />
            <div>
              <p className="text-sm -mt-1 text-gray-600">{props.ride?.destination}</p>
            </div>
          </div>
          <div className="flex gap-3 items-center p-2 border-b-1 border-gray-500">
            <BsCashStack size={20} />
            <div>
              <h3 className="text-lg font-medium">₹{props.ride?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash</p>
            </div>
          </div>
        </div>
        <div className='mt-6 w-full'>
          <form onSubmit={submitHandler}>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              type="text"
              className='bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-3'
              placeholder='Enter OTP'
            />
            <div className="flex justify-evenly items-center w-full gap-3 mt-5 pb-5">
              <button
                type="submit"
                className="flex items-center justify-center w-1/2 font-semibold bg-black text-white rounded-lg p-2 mr-1 hover:bg-gray-900 transition-colors"
              >
                Go For PickUp
              </button>
              <button
                type="button"
                onClick={() => {
                  props.setConfirmRidePopUpPanel(false);
                }}
                className="w-1/2 font-semibold text-red-500 border-1 hover:text-white border-red-500 rounded-lg p-2 ml-1 hover:bg-red-500 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUpDetailsPanel;