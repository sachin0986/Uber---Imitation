import React from "react"

const RidingDetailsPanel = () => {
    return(
        <div>
             <h3 className="text-2xl font-semibold">Confirm you Ride</h3>
             <div className="flex justify-between gap-2 flex-col items-center ">
               <img
                   className="h-35"
                 src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_768,w_768/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png"
                 alt="confirm-ride"
               />
               <div className="w-full mt-5">

               </div>
               <button 
               onClick={() => {
                 props.setVehicleFound(true);
                 props.setConfirmRidePanel(false)
               }}
               className="w-full font-semibold mt-5 bg-green-400 rounded-lg p-2">Reached</button>
             </div>
           </div>
    )
}

export default RidingDetailsPanel;