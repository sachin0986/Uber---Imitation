import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { IoMdExit } from "react-icons/io";
import { RiArrowDownWideFill } from "react-icons/ri"
import { RiArrowUpWideFill } from "react-icons/ri";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState } from "react";
import FinishRide from "../Components/FinishRide";
import RidingDetailsPanel from "../Components/RidingDetailsPanel";



const CaptainRiding = () => {
   // const [RidingPanelOpen, setRidingPanelOpen] = useState(false);
    const [FinishRidePanel, setFinishRidePanel] = useState(false);
   // const RidingDetailsPanelRef = useRef(null);
    const FinishRideRef = useRef(null);


/*
  useGSAP(() => {
    if (RidingPanelOpen) {
      gsap.to(RidingDetailsPanelRef.current, {
        height: '70%',
        padding: 24,
        duration: 0.1,
        ease: 'power2.out'
      });
    } else {
      gsap.to(RidingDetailsPanelRef.current, {
        height: '0%',
        duration: 0.1,
        ease: 'power2.inOut'
      });
    }
  }, [RidingPanelOpen]);

*/

         useGSAP(() => {
    if(FinishRidePanel){
        gsap.to(FinishRideRef.current, {
        transform: 'translateY(0)'
    })
}
else{
    gsap.to(FinishRideRef.current, {
        transform: 'translateY(100%)'
    })
}
  }, [FinishRidePanel]);



    return(
        <div className="h-screen">
            <div>
                <Link to="/captain-home" className="fixed right-4 top-3 h-10 w-10 bg-white flex items-center justify-center rounded-full">
                    <IoMdExit size={25} className="font-bold" />
                </Link>
            </div>

            <img
                className="w-16 absolute left-4 top-1.5"
                src="/src/assets/pngimg.com - uber_PNG24.png"
                alt="uber-driver-logo"
            />
            <div className="h-5/6">
                <img
                    className="h-full w-full object-cover"
                    src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
                    alt="map-image"
                />
            </div>
            
            {/*<div ref={RidingDetailsPanelRef}
                className="h1/6 bg-white h-0 overflow-hidden transition-all duration-300">
                {RidingDetailsPanelRef && <RidingDetailsPanelRef />} 
          </div>*/}
            <div className="h-1/6 bg-yellow-500">
                <button 
                    onClick={() => {
                        setFinishRidePanel(true);
                    }}
                >Finish</button>
            </div>


                 <div ref={FinishRideRef} className="fixed h-[80%] w-full z-10 translate-y-full bg-white bottom-0 px-3 py-6">
                    <FinishRide setFinishRidePanel={setFinishRidePanel}/>
                 </div>
        </div>
    )
}

export default CaptainRiding;