import { useState, useRef } from "react";
import { useGSAP } from '@gsap/react';
import gsap from "gsap";
import { RiArrowDownWideFill } from "react-icons/ri";
import { GrEmptyCircle } from "react-icons/gr";
import { LuSquareSquare } from "react-icons/lu";
import LocationSearchPanel from "../Components/LocationSearchPanel";

const style = {
  inputStyle: `bg-[#eee] px-12 py-2 text-base rounded-lg w-full`,
  input2: `bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5`
};

const Home = () => {
  const [pickup, setPickUp] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, stePanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        duration: 0.1,
        ease: 'power2.out'
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1,
        duration: 0.1
      });
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        duration: 0.1,
        ease: 'power2.inOut'
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0,
        duration: 0.1
      });
    }
  }, [panelOpen]);

  return (
    <div className="h-screen relative">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="uber-logo"
      />

      <div className="h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="map-image"
        />

        <div className="w-full flex flex-col justify-end h-screen absolute top-0">
          <div className="h-[30%] p-6 bg-white relative">
            <h5
              ref={panelCloseRef}
              onClick={() => stePanelOpen(false)}
              className="absolute opacity-0 right-6 top-6 cursor-pointer transition-opacity duration-300"
            >
              <RiArrowDownWideFill size={20} />
            </h5>

            <h4 className="text-2xl font-semibold">Find Trip</h4>

            <form onSubmit={submitHandler}>
              <div className="relative mt-4">
        
                <div className="absolute h-11 left-4 top-7 bottom-4 w-[3px] bg-gray-700 rounded-full z-0" />


                <GrEmptyCircle
                  className="absolute left-[10px] top-3 text-gray-700 z-10"
                  size={15}
                />
                <LuSquareSquare
                  className="absolute left-[10px] bottom-3 text-gray-700 z-10"
                  size={15}
                />


                <input
                  onClick={() => stePanelOpen(true)}
                  value={pickup}
                  type="text"
                  placeholder="Add a pickup location"
                  className={style.inputStyle}
                  onChange={(e) => setPickUp(e.target.value)}
                />


                <input
                  onClick={() => stePanelOpen(true)}
                  value={destination}
                  type="text"
                  placeholder="Enter your destination"
                  className={style.input2}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
            </form>
          </div>

          <div
            ref={panelRef}
            className="bg-white h-0 overflow-hidden transition-all duration-300"
          >
            {panelOpen && <LocationSearchPanel />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;