
import React from "react";
import { GrLocationPin } from "react-icons/gr";
import { RiUserLocationFill } from "react-icons/ri";
import { BsCashStack } from "react-icons/bs";
import { TbHomeUp } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import { useEffect, useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import LiveTracking from "../Components/LiveTracking";


const Riding = () => {
  const location = useLocation()
    const { ride } = location.state || {} // Retrieve ride data
    const { socket } = useContext(SocketContext)
    const navigate = useNavigate()

useEffect(() => {
    if (!socket) return;
    const handleRideEnded = () => {
        navigate('/home');
    };
    socket.on("ride-ended", handleRideEnded);
    return () => {
        socket.off("ride-ended", handleRideEnded);
    };
}, [socket, navigate]);

    return(
      <div className="h-screen">

        <Link to="/home" className="fixed right-4 top-4 h-10 w-10 bg-white flex items-center justify-center rounded-full">
            <TbHomeUp className="" size={25}/>
        </Link>

        <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="uber-logo"
      />
            <div className="h-1/2">
                <LiveTracking />
            </div>
            <div className="h-1/2 p-4">
                      <div className="flex items-center justify-between">
                                    <img className="h-20" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_768,w_768/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png" alt="" />
                                    <div className="text-right">
                                        <h5 className="text-lg font-medium">{ride?.captain.fullname.firstname}</h5>
                                        <h4 className="text-xl font-semibold -mt-1 -mb-1">{ride?.captain.vehicle.plate}</h4>
                                        <p className="text-sm text-gray-600">Schoda Slavia</p>
                                    </div>
                                </div>
                
                              <div className="flex justify-between gap-2 flex-col items-center ">
                                <div className="w-full mt-5">
                                  <div className="flex gap-3 items-center p-2 border-b-2 border-gray-300">
                                    <RiUserLocationFill size={20} />
                                    <div>
                                      <p className="text-sm -mt-1 text-gray-600">
                                        {ride?.destination}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex gap-3 items-center p-2 border-b-1 border-gray-500">
                                    <BsCashStack size={20} />
                                    <div>
                                      <h3 className="text-lg font-medium">₹{ride?.fare}</h3>
                                      <p className="text-sm -mt-1 text-gray-600">Cash</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                <button className="w-full font-semibold mt-5 bg-green-400 rounded-lg p-2" >Make a Payment</button>
            </div>
      </div>
    )
}

export default Riding;