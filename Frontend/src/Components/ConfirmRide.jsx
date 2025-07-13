import React from "react";
import { RiArrowDownWideFill } from "react-icons/ri";
import { GrLocationPin } from "react-icons/gr";
import { RiUserLocationFill } from "react-icons/ri";
import { BsCashStack } from "react-icons/bs";


const ConfirmRide = (props) => {
  return (
    <div>
      <h3 className="text-2xl font-semibold">Confirm you Ride</h3>
      <div className="flex justify-between gap-2 flex-col items-center ">
        <img
            className="h-35"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_768,w_768/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png"
          alt="confirm-ride"
        />
        <div className="w-full mt-5">
          <div className="flex gap-3 items-center p-2 border-b-2 border-gray-300">
            <GrLocationPin size={25}/>
                <div>
                    <p className="text-sm -mt-1 text-gray-600">{props.pickup}</p>
                </div>
          </div>
          <div className="flex gap-3 items-center p-2 border-b-2 border-gray-300">
            <RiUserLocationFill size={22}/>
                <div>
                    <p className="text-sm -mt-1 text-gray-600">{props.destination}</p>
                </div>
          </div>
          <div className="flex gap-3 items-center p-2 border-b-1 border-gray-500">
            <BsCashStack size={20}/>
                <div>
                    <h3 className="text-lg font-medium">₹{props.fare[ props.vehicleType ]}</h3>
                    <p className="text-sm -mt-1 text-gray-600">Cash</p>
                </div>
          </div>
        </div>
        <button 
        onClick={() => {
          props.setVehicleFound(true);
          props.setConfirmRidePanel(false)
          props.createRide();
        }}
        className="w-full font-semibold mt-5 bg-green-400 rounded-lg p-2">Confirm</button>
      </div>
    </div>
  );
};

export default ConfirmRide;
