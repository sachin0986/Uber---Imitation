import React from "react";
import { GrLocationPin } from "react-icons/gr";
import { RiUserLocationFill } from "react-icons/ri";
import { BsCashStack } from "react-icons/bs";
import { RiArrowDownWideFill } from "react-icons/ri";

const SearchingForDriver = () => {
    return(
          <div>
              <h5
                onClick={(props) => props.setVehiclePanelOpen(false)}
                className="absolute opacity-0 right-6 top-6 cursor-pointer transition-opacity duration-300"
              >
                <RiArrowDownWideFill size={20} />
              </h5>

                <div className="flex items-center justify-between ">
                    <img className="h-20" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_768,w_768/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png" alt="" />
                    <div className="text-right">
                        <h5 className="text-lg font-medium">Sachin Arora</h5>
                        <h4 className="text-xl font-semibold -mt-1 -mb-1">UP80 AB 1234</h4>
                        <p className="text-sm text-gray-600">Schoda Slavia</p>
                    </div>
                </div>

              <div className="flex justify-between gap-2 flex-col items-center ">
                <div className="w-full mt-5">
                  <div className="flex gap-3 items-center p-2 border-b-2 border-gray-300">
                    <GrLocationPin size={25} />
                    <div>
                      <h3 className="text-lg font-medium">10/6</h3>
                      <p className="text-sm -mt-1 text-gray-600">
                        Tej Nagar Kamla Nagar
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-center p-2 border-b-2 border-gray-300">
                    <RiUserLocationFill size={20} />
                    <div>
                      <h3 className="text-lg font-medium">10/6</h3>
                      <p className="text-sm -mt-1 text-gray-600">
                        Tej Nagar Kamla Nagar
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-center p-2 border-b-1 border-gray-500">
                    <BsCashStack size={20} />
                    <div>
                      <h3 className="text-lg font-medium">₹ 193.20</h3>
                      <p className="text-sm -mt-1 text-gray-600">Cash</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    )
}

export default SearchingForDriver;