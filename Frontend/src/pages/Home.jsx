import React from "react";
import { Link } from 'react-router-dom';

const Home = () => {
    return(
        <div>
            <div className="bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1593950315186-76a92975b60c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dWJlcnxlbnwwfHwwfHx8MA%3D%3D)] pt-8  flex justify-between flex-col h-screen w-full">
                <img className="w-16 ml-8 " src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                  
                <div className="bg-white pb-7 py-4 px-4">
                    <h2 className="text-3xl font-bold">Get Started with Uber</h2>
                    <Link to='/user-login' className="flex items-center justify-center w-full bg-black text-white py-3 mt-5 rounded-xl">Continue</Link>
                </div>
            </div>
        </div>
    )
}

export default Home;