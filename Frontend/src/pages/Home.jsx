import { useState, useRef } from "react";
import { useGSAP } from '@gsap/react';
import gsap from "gsap";
import { RiArrowDownWideFill } from "react-icons/ri";
import { GrEmptyCircle } from "react-icons/gr";
import { LuSquareSquare } from "react-icons/lu";
import LocationSearchPanel from "../Components/LocationSearchPanel";
import { RiUser3Fill } from "react-icons/ri";

const style = {
  inputStyle: `bg-[#eee] px-12 py-2 text-base rounded-lg w-full`,
  input2: `bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5`
};

const Home = () => {
  const [pickup, setPickUp] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);

  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        padding: 24,
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

  useGSAP(() => {
    if(vehiclePanelOpen){
        gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)'
    })
}
else{
    gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)'
    })
}
  }, [vehiclePanelOpen])

  return (
    <div className="h-screen relative overflow-hidden">
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
              onClick={() => setPanelOpen(false)}
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
                  onClick={() => setPanelOpen(true)}
                  value={pickup}
                  type="text"
                  placeholder="Add a pickup location"
                  className={style.inputStyle}
                  onChange={(e) => setPickUp(e.target.value)}
                />


                <input
                  onClick={() => setPanelOpen(true)}
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
            {panelOpen && <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanelOpen={setVehiclePanelOpen}/>}
          </div>
        </div>
      </div>
      <div ref={vehiclePanelRef} className="fixed w-full z-10 bg-white translate-y-full bottom-0 px-3 py-6">
                <div className="flex w-full p-3 active:border-2  border-black mb-3 rounded-2xl items-center justify-between">
                <img className="h-16" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_768,w_768/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png" alt="" />
                <div className="w-1/2">
                    <h4 className="font-medium flex gap-2 text-base">Uber Go <span className="flex gap-1 items-center justify-center"><RiUser3Fill className=""/>4</span></h4>
                    <h5 className="font-medium text-sm">2 mins away</h5>
                    <p className="font-medium text-xs text-gray-600">Affordable, compact rides</p>
                </div>
                    <h2 className="text-lg font-semibold ">₹ 193.20</h2>
                </div>
                <div className="flex w-full p-3 active:border-2 mb-3 border-black rounded-2xl items-center justify-between">
                <img className="h-16" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_768,w_768/v1698944322/assets/92/00189a-71c0-4f6d-a9de-1b6a85239079/original/UberMoto-India-Orange.png" alt="" />
                <div className="w-1/2">
                    <h4 className="font-medium flex gap-2 text-base">Uber Moto <span className="flex gap-1 items-center justify-center"><RiUser3Fill className=""/>1</span></h4>
                    <h5 className="font-medium text-sm">3 mins away</h5>
                    <p className="font-medium text-xs text-gray-600">Affordable, MoterCycle rides</p>
                </div>
                    <h2 className="text-lg font-semibold ">₹ 65.00</h2>
                </div>
                <div className="flex w-full p-3 active:border-2 mb-3 border-black rounded-2xl items-center justify-between">
                <img className="h-16" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_768,w_768/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
                <div className="w-1/2">
                    <h4 className="font-medium flex gap-2 text-base">Uber Auto <span className="flex gap-1 items-center justify-center"><RiUser3Fill className=""/>3</span></h4>
                    <h5 className="font-medium text-sm">2 mins away</h5>
                    <p className="font-medium text-xs text-gray-600">Affordable, auto rides</p>
                </div>
                    <h2 className="text-lg font-semibold ">₹ 118.24</h2>
                </div>
            </div>
    </div>
  );
};

export default Home;