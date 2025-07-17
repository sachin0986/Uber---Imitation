import React from "react";
import { Link } from "react-router-dom"
import { IoMdExit } from "react-icons/io";
import CaptionDetailsPanel from "../Components/CaptionDetailsPanel";
import ConfirmRidePopUpDetailsPanel from "../Components/ConfirmRidePopUpPanel";
import RidePopUp from "../Components/RidePopUp";
import { useRef } from "react";
import { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect } from "react";
import { SocketContext } from '../context/SocketContext';
import { CaptainDataContext } from "../context/CaptainContext"; 
import { useContext } from "react";
import axios from "axios";
import { VITE_BASE_URL } from "../Utils/contants";
import LiveTracking from "../Components/LiveTracking";



const CaptainHome = () => {
    const [RidePopUpPanel, setRidePopUpPanel] = useState(false);
    const [ConfirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);
    const [ride, setRide] = useState(null);
    const RidePopUpPanelRef = useRef(null);
    const ConfirmRidePopUpPanelRef = useRef(null);

    const { socket } = useContext(SocketContext);
    const { captain } = useContext(CaptainDataContext);


    useEffect(() => {
        console.log(captain);
        socket.emit('join', {userId: captain._id, userType: 'captain'})


        const updateLocation = () => {
            if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    console.log({
                         userId: captain._id,
                         location : {
                             ltd: position.coords.latitude,
                             lng: position.coords.longitude
                         }
                    })
                    socket.emit('update-location-captain', {
                         userId: captain._id,
                         location : {
                             ltd: position.coords.latitude,
                             lng: position.coords.longitude
                         }
                    })
                })
            }
        }
       const locationInterval = setInterval(updateLocation, 10000);
       updateLocation();

       //return () => clearInterval(locationInterval);

    }, [ captain ])
    


    socket.on('new-ride', (data) =>{
        console.log(data);
        setRide(data);
        setRidePopUpPanel(true);
    })


     async function confirmRide() {

        const response = await axios.post(`${VITE_BASE_URL}rides/confirm`, {

            rideId: ride._id,
            captainId: captain._id,


        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })

        setRidePopUpPanel(false)
        setConfirmRidePopUpPanel(true)

    }

          useGSAP(() => {
    if(RidePopUpPanel){
        gsap.to(RidePopUpPanelRef.current, {
        transform: 'translateY(0)'
    })
}
else{
    gsap.to(RidePopUpPanelRef.current, {
        transform: 'translateY(100%)'
    })
}
  }, [RidePopUpPanel]);


          useGSAP(() => {
    if(ConfirmRidePopUpPanel){
        gsap.to(ConfirmRidePopUpPanelRef.current, {
        transform: 'translateY(0)'
    })
}
else{
    gsap.to(ConfirmRidePopUpPanelRef.current, {
        transform: 'translateY(100%)'
    })
}
  }, [ConfirmRidePopUpPanel])

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
                <LiveTracking />
            </div>
            <div className="h-2/5 p-6">
               <CaptionDetailsPanel />
            </div>
         <div ref={RidePopUpPanelRef} className="fixed w-full z-10 translate-y-full bg-white bottom-0 px-3 py-6">
            <RidePopUp 
            ride={ride}
             setRidePopUpPanel={setRidePopUpPanel} 
             setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
             confirmRide={confirmRide}
             />
        </div>
        <div ref={ConfirmRidePopUpPanelRef} className="fixed h-screen w-full z-10 translate-y-full bg-white bottom-0 px-3 py-6">
            <ConfirmRidePopUpDetailsPanel 
            ride={ride}
            setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}/>
        </div>

        </div>
    )
}

export default CaptainHome;