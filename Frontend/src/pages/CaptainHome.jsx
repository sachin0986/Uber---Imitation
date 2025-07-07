import React from "react";
import { Link } from "react-router-dom"
import { IoMdExit } from "react-icons/io";
import CaptionDetailsPanel from "../Components/CaptionDetailsPanel";
import RidePopUp from "../Components/RidePopUp";




const CaptainHome = () => {
    return (
        <div className="h-screen">
            <div>
                <Link to="/captain-login" className="fixed right-4 top-3 h-10 w-10 bg-white flex items-center justify-center rounded-full">
                    <IoMdExit size={25} className="font-bold" />
                </Link>
            </div>

            <img
                className="w-16 absolute left-4 top-1.5"
                src="/src/assets/pngimg.com - uber_PNG24.png"
                alt="uber-driver-logo"
            />
            <div className="h-3/5">
                <img
                    className="h-full w-full object-cover"
                    src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
                    alt="map-image"
                />
            </div>
            <div className="h-2/5 p-6">
               <CaptionDetailsPanel />
            </div>
         <div className="fixed w-full z-10 bg-white bottom-0 px-3 py-6">
          <div className="relative">
            <RidePopUp />
          </div>
        </div>

        </div>
    )
}

export default CaptainHome;