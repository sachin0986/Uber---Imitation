import React from "react";
import { RiArrowDownWideFill } from "react-icons/ri";
import { GrLocationPin } from "react-icons/gr";
import { RiUserLocationFill } from "react-icons/ri";
import { BsCashStack } from "react-icons/bs";
import { Link } from "react-router-dom";

const ConfirmRidePopUpDetailsPanel = (props) => {
    return(
         <div className="relative h-[90vh] flex flex-col justify-between">
                 <h3 className="text-2xl font-semibold mb-5">Confirm this ride to Start</h3>
                 <button onClick={() => {
                  props.setConfirmRidePopUpPanel(false);
                  props.setRidePopUpPanel(true);
                 }} className="absolute right-4 top-1 text-black hover:text-black">
                   <RiArrowDownWideFill size={28} />
                 </button>
                 <div className="flex items-center justify-between mt-4 p-3 bg-yellow-300 rounded-2xl ">
                  <div className="flex items-center gap-3">
                    <img className="h-12 w-12 object-cover rounded-full " 
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s" 
                    alt="captain-image" />
                    <h3 className="text-lg font-medium">Harsh Patel</h3>
                  </div>
                  <h5 className="text-lg font-semibold">2.2 KM</h5>
                 </div>
                    <div className="flex-grow flex justify-between gap-2 flex-col items-center">
                    <div className="w-full mt-5">
                      <div className="flex gap-3 items-center p-2 border-b-2 border-gray-300">
                      <GrLocationPin size={25}/>
                        <div>
                          <h3 className="text-lg font-medium">10/6</h3>
                          <p className="text-sm -mt-1 text-gray-600">Tej Nagar Kamla Nagar</p>
                        </div>
                      </div>
                      <div className="flex gap-3 items-center p-2 border-b-2 border-gray-300">
                      <RiUserLocationFill size={20}/>
                        <div>
                          <h3 className="text-lg font-medium">10/6</h3>
                          <p className="text-sm -mt-1 text-gray-600">Tej Nagar Kamla Nagar</p>
                        </div>
                      </div>
                      <div className="flex gap-3 items-center p-2 border-b-1 border-gray-500">
                      <BsCashStack size={20}/>
                        <div>
                          <h3 className="text-lg font-medium">₹ 193.20</h3>
                          <p className="text-sm -mt-1 text-gray-600">Cash</p>
                        </div>
                      </div>
                    </div>
                      <div className="flex justify-evenly items-center w-full gap-3 mt-5 pb-5">
                      <Link to="/captain-riding" className="flex items-center justify-center w-1/2 font-semibold bg-black text-white rounded-lg p-2 mr-1 hover:bg-gray-900 transition-colors">
                        Go For PickUp
                      </Link>
                      <button 
                        onClick={() => {
                          props.setConfirmRidePopUpPanel(false);
                        }}
                        className="w-1/2 font-semibold text-red-500 border-1 hover:text-white border-red-500 rounded-lg p-2 ml-1 hover:bg-red-500 transition-colors"
                      >
                        Cancle
                      </button>
                      </div>
                    </div>
              </div>
    )
}

export default ConfirmRidePopUpDetailsPanel;