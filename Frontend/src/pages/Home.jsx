// Home.jsx
import { useState, useRef, use } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { RiArrowDownWideFill } from "react-icons/ri";
import { GrEmptyCircle } from "react-icons/gr";
import { LuSquareSquare } from "react-icons/lu";
import LocationSearchPanel from "../Components/LocationSearchPanel";
import VehiclePanel from "../Components/VehiclePanel";
import ConfirmRide from "../Components/ConfirmRide";
import LookingForDriver from "../Components/LookingFroDriver";
import SearchingForDriver from "../Components/SearchingForDriver";
import { VITE_BASE_URL } from "../Utils/contants";
import axios from "axios";
import { SocketContext } from "../context/SocketContext";
import { useContext } from "react";
import { useEffect } from "react";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from 'react-router-dom';

const style = {
  inputStyle: `bg-[#eee] px-12 py-2 text-base rounded-lg w-full`,
  input2: `bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5`,
};

const Home = () => {
  const [pickup, setPickUp] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [ConfirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false); //looking for driver
  const [saerchingForDriver, setSaerchingForDriver] = useState(false); //show driver details panel
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({});
  const [vehicleType, setvehicleType] = useState(null);
  const [ride, setRide] = useState(null);


  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const ConfirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const searchingForDriverRef = useRef(null);
  const navigate = useNavigate();

  // Removed handelPanel as it's now handled by LocationSearchPanel
  // const handelPanel = () => {
  //   setPanelOpen(false);
  //   setVehiclePanelOpen(true);
  // };
  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  useEffect(() => {
    console.log(user);
    socket.emit("join", { userType: "user", userId: user._id });
  }, [user]);

  socket.on("ride-confirmed", (ride) => {
    setSaerchingForDriver(true);
    setVehicleFound(false);
    setRide(ride);
  });

  socket.on('ride-started', ride => {
    console.log("ride");
    setSaerchingForDriver(false);
    navigate('/riding', { state: { ride } }) 
  })

  const handlePickupChange = async (e) => {
    setPickUp(e.target.value);
    setActiveField("pickup"); // Set active field when typing

    if (e.target.value.length > 2) {
      try {
        const response = await axios.get(
          `${VITE_BASE_URL}maps/get-suggestions`,
          {
            params: { input: e.target.value },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setPickupSuggestions(response.data);
        console.log("Pickup suggestions:", response.data);
      } catch (error) {
        console.error("Error fetching pickup suggestions:", error);
        setPickupSuggestions([]);
      }
    } else {
      setPickupSuggestions([]);
    }
  };

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    setActiveField("destination"); // Set active field when typing

    if (e.target.value.length > 2) {
      try {
        const response = await axios.get(
          `${VITE_BASE_URL}maps/get-suggestions`,
          {
            params: { input: e.target.value },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setDestinationSuggestions(response.data);
        console.log("Destination suggestions:", response.data);
      } catch (error) {
        console.error("Error fetching destination suggestions:", error);
        setDestinationSuggestions([]);
      }
    } else {
      setDestinationSuggestions([]);
    }
  };

  async function handleFare() {
    setPanelOpen(false);
    setVehiclePanelOpen(true);

    const response = await axios.get(`${VITE_BASE_URL}rides/get-fare`, {
      params: { pickup, destination },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setFare(response.data);
    console.log(response.data);
  }

  async function createRide() {
    if (!pickup || !destination || !vehicleType) {
      alert("Please select pickup, destination, and vehicle type.");
      return;
    }
    try {
      const response = await axios.post(
        `${VITE_BASE_URL}rides/create`,
        {
          pickup,
          destination,
          vehicleType,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(
        "Error creating ride:",
        error.response?.data || error.message
      );
      alert(error.response?.data?.message || "Failed to create ride");
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
    // No need to call handelPanel here anymore, it's handled by suggestion click
  };

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
        padding: 24,
        duration: 0.1,
        ease: "power2.out",
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1,
        duration: 0.1,
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
        padding: 0,
        duration: 0.1,
        ease: "power2.inOut",
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0,
        duration: 0.1,
      });
    }
  }, [panelOpen]);

  useGSAP(() => {
    if (vehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehiclePanelOpen]);

  useGSAP(() => {
    if (ConfirmRidePanel) {
      gsap.to(ConfirmRidePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(ConfirmRidePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [ConfirmRidePanel]);

  useGSAP(() => {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehicleFound]);

  useGSAP(() => {
    if (saerchingForDriver) {
      gsap.to(searchingForDriverRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(searchingForDriverRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [saerchingForDriver]);

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
                  onClick={() => {
                    setPanelOpen(true);
                    setActiveField("pickup");
                  }}
                  value={pickup}
                  type="text"
                  placeholder="Add a pickup location"
                  className={style.inputStyle}
                  onChange={handlePickupChange}
                />

                <input
                  onClick={() => {
                    setPanelOpen(true);
                    setActiveField("destination");
                  }}
                  value={destination}
                  type="text"
                  placeholder="Enter your destination"
                  className={style.input2}
                  onChange={handleDestinationChange}
                />
              </div>
              {panelOpen && (
                <button
                  onClick={() => handleFare()}
                  className="flex font-medium bg-black text-white justify-center w-full p-2 mt-3 rounded-xl"
                >
                  Find Trip
                </button>
              )}
            </form>
          </div>

          <div
            ref={panelRef}
            className="bg-white h-0 overflow-hidden transition-all duration-300"
          >
            <LocationSearchPanel
              suggestions={
                activeField === "pickup"
                  ? pickupSuggestions
                  : destinationSuggestions
              }
              setPanelOpen={setPanelOpen}
              setVehiclePanelOpen={setVehiclePanelOpen}
              setPickUp={setPickUp}
              setDestination={setDestination}
              activeField={activeField}
              setActiveField={setActiveField}
              handleFare={handleFare}
            />
          </div>
        </div>
      </div>

      <div
        ref={vehiclePanelRef}
        className="fixed w-full z-10 bg-white translate-y-full bottom-0 px-3 py-6"
      >
        <VehiclePanel
          setPanelOpen={setPanelOpen}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanelOpen={setVehiclePanelOpen}
          fare={fare}
          createRide={createRide}
          setvehicleType={setvehicleType}
        />
      </div>

      <div
        ref={ConfirmRidePanelRef}
        className="fixed w-full z-10 bg-white translate-y-full bottom-0 px-3 py-6"
      >
        <div className="relative">
          <h5
            onClick={() => {
              setConfirmRidePanel(false);
              setVehiclePanelOpen(true);
            }}
            className="absolute right-4 top-2 cursor-pointer"
          >
            <RiArrowDownWideFill size={20} />
          </h5>
          <ConfirmRide
            createRide={createRide}
            setVehiclePanelOpen={setVehiclePanelOpen}
            setConfirmRidePanel={setConfirmRidePanel}
            setVehicleFound={setVehicleFound}
            vehicleType={vehicleType}
            pickup={pickup}
            destination={destination}
            fare={fare}
          />
        </div>
      </div>

      <div
        ref={vehicleFoundRef}
        className="fixed w-full z-10 bg-white translate-y-full bottom-0 px-3 py-6"
      >
        <div className="relative">
          <h5
            onClick={() => {
              setVehicleFound(false);
              setPanelOpen(true);
            }}
            className="absolute right-4 top-2 cursor-pointer"
          >
            <span className="border-2 bg-black text-white text-sm p-2 rounded-lg">
              Cancel Ride
            </span>
          </h5>
          <LookingForDriver
            pickup={pickup}
            destination={destination}
            fare={fare}
            vehicleType={vehicleType}
            setvehicleType={setvehicleType}
          />
        </div>
      </div>

      <div
        ref={searchingForDriverRef}
        className="fixed w-full z-10 translate-y-full bg-white bottom-0 px-3 py-6"
      >
        <div className="relative">
          <SearchingForDriver
            ride={ride}
            setSaerchingForDriver={setSaerchingForDriver}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
