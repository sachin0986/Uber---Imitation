import React from "react";
import { TiLocation } from "react-icons/ti";


const locations = [
    "106/6 Tej Nagar Kamla Nagar, Agra - Near T.C Chandra School",
    "106/7 Tej Nagar Kamla Nagar, Agra - Near T.C Chandra School",
    "106/8 Tej Nagar Kamla Nagar, Agra - Near T.C Chandra School",
    "106/9 Tej Nagar Kamla Nagar, Agra - Near T.C Chandra School",

]

const LocationSearchPanel = (props) => {
    console.log(props);
    return(
        <div>
            {
                locations.map((local, indx) => {
                    return(
                    <div onClick={() => {
                        props.setVehiclePanelOpen(true);
                        props.setPanelOpen(false);
                    }} key={indx} className="flex gap-4 items-center my-4 justify-start">
                            <TiLocation className="bg-[#eee] h-9 w-12 p-2 rounded-full" />
                            <h4 className="font-medium">{local}</h4> 
                    </div>
                    )
                })
            }
        </div>
    )
}

export default LocationSearchPanel;