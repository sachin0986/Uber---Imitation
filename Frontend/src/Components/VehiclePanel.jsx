import React from "react";
import { RiUser3Fill } from "react-icons/ri";
import { RiArrowDownWideFill } from "react-icons/ri";

const VehiclePanel = (props) => {
  return (
    <div>
      <div
        className="absolute top-2 right-5 cursor-pointer"
        onClick={() => {
          props.setVehiclePanelOpen(false);
          props.setPanelOpen(true);
        }}
      >
        <RiArrowDownWideFill size={24} />
      </div>
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
          props.setVehiclePanelOpen(false);
          props.setvehicleType("car");
        }}
        className="flex w-full p-3 active:border-2  border-black mb-3 rounded-2xl items-center justify-between"
      >
        <img
          className="h-16"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_768,w_768/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png"
          alt=""
        />
        <div className="w-1/2">
          <h4 className="font-medium flex gap-2 text-base">
            Uber Go{" "}
            <span className="flex gap-1 items-center justify-center">
              <RiUser3Fill className="" />4
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-medium text-xs text-gray-600">
            Affordable, compact rides
          </p>
        </div>
        <h2 className="text-lg font-semibold ">₹{props.fare.car}</h2>
      </div>
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
          props.setVehiclePanelOpen(false);
          props.setvehicleType("bike");
        }}
        className="flex w-full p-3 active:border-2 mb-3 border-black rounded-2xl items-center justify-between"
      >
        <img
          className="h-16"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_768,w_768/v1698944322/assets/92/00189a-71c0-4f6d-a9de-1b6a85239079/original/UberMoto-India-Orange.png"
          alt=""
        />
        <div className="w-1/2">
          <h4 className="font-medium flex gap-2 text-base">
            Uber Moto{" "}
            <span className="flex gap-1 items-center justify-center">
              <RiUser3Fill className="" />1
            </span>
          </h4>
          <h5 className="font-medium text-sm">3 mins away</h5>
          <p className="font-medium text-xs text-gray-600">
            Affordable, MoterCycle rides
          </p>
        </div>
        <h2 className="text-lg font-semibold ">₹{props.fare.bike}</h2>
      </div>
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
          props.setVehiclePanelOpen(false);
          props.setvehicleType("auto");
        }}
        className="flex w-full p-3 active:border-2 mb-3 border-black rounded-2xl items-center justify-between"
      >
        <img
          className="h-16"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_768,w_768/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
          alt=""
        />
        <div className="w-1/2">
          <h4 className="font-medium flex gap-2 text-base">
            Uber Auto{" "}
            <span className="flex gap-1 items-center justify-center">
              <RiUser3Fill className="" />3
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-medium text-xs text-gray-600">
            Affordable, auto rides
          </p>
        </div>
        <h2 className="text-lg font-semibold ">₹{props.fare.auto}</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
