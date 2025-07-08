import React from "react";
import { RiArrowDownWideFill } from "react-icons/ri";
import { GrLocationPin } from "react-icons/gr";
import { RiUserLocationFill } from "react-icons/ri";
import { BsCashStack } from "react-icons/bs";
import { Link } from "react-router-dom";

const FinishRide = (props) => {
    return(
          <div className="relative h-[70vh] flex flex-col justify-between">
                 <h3 className="text-2xl font-semibold mb-5">Finish this ride</h3>
                 <button onClick={() => {
                  props.setFinishRidePanel(false);
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
                      <div className="flex mt-9 justify-evenly items-center w-full gap-3 pb-5">
                      <Link to="/captain-home" className="flex items-center justify-center w-1/2 font-semibold bg-black text-white rounded-lg p-2 mr-1 hover:bg-gray-900 transition-colors">
                        Finish Ride !
                      </Link>
                      </div>
                        <p className="text-red-500 -mt-4 text-center">click on Finish Ride button only if you recived the payment</p>
                    </div>
              </div>
    )
}

export default FinishRide;
