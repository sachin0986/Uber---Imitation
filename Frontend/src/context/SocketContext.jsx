
import React, { createContext, useEffect } from 'react';
import { io } from 'socket.io-client';
import { VITE_BASE_URL } from '../Utils/contants';

export const SocketContext = createContext();

const socket = io(`${VITE_BASE_URL}`); // Replace with your server URL

const SocketProvider = ({ children }) => {
    useEffect(() => {
        // Basic connection logic
        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

    }, []);



    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;