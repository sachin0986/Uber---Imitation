import React, { useContext } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import { FaRegStickyNote } from "react-icons/fa";
import { MdOutlineSpeed } from "react-icons/md";
import { FaBusinessTime } from "react-icons/fa";

const CaptainDetailsPanel = () => {
    const { captain } = useContext(CaptainDataContext);

    if (!captain || !captain.fullname) {
      return (
        <div className="flex items-center justify-center h-full text-gray-400">
          Loading captain details...
        </div>
      );
    }

    return (
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start gap-3">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s"
              className="h-10 w-10 rounded-full object-cover"
              alt=""
            />
            <div className="flex gap-1">
            <h4 className="text-lg font-medium">{captain.fullname.firstname}</h4>
            <h4 className="text-lg font-medium">{captain.fullname.lastname}</h4>
            </div>
          </div>
          <div>
            <h5 className="text-xl font-semibold">295.02</h5>
            <p className="text-sm text-gray-600">Earned</p>
          </div>
        </div>
        <div className="flex p-3 mt-6 rounded-2xl bg-yellow-300 justify-center gap-7 items-center">
          <div className="text-center flex flex-col items-center">
            <FaBusinessTime
              size={30}
              className="mb-2 font-extrabold text-black"
            />
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600 whitespace-nowrap">
              Hours Online
            </p>
          </div>
          <div className="text-center flex flex-col items-center">
            <MdOutlineSpeed
              size={30}
              className="mb-2 font-extrabold text-black"
            />
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600 whitespace-nowrap">
              Hours Online
            </p>
          </div>
          <div className="text-center flex flex-col items-center">
            <FaRegStickyNote
              size={30}
              className="mb-2 font-extrabold text-black"
            />
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600 whitespace-nowrap">
              Hours Online
            </p>
          </div>
        </div>
      </div>
    );
};

export default CaptainDetailsPanel;