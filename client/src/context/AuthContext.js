import React, { createContext, useState, useEffect } from 'react';
import axios from "axios";
export const AuthContext = createContext();

export default ({ children }) => {
    const [address, setAddress] = useState("");
    const [balance, setBalance] = useState("");
    // var accountInterval;

    // useEffect(() => {
        
    // }, [address]);

    // async function createAccount(address) {
    //     try {
    //         await axios.post("/user/register", { "address": address });
    //         setAddress(address);
    //         if (isNaN(accountInterval)) {
    //             monitorConnection();
    //         }
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    // function monitorConnection() {
    //     accountInterval = setInterval(function () {
    //         if (!window.ethereum.selectedAddress) {
    //             setAddress("");
    //             clearInterval(accountInterval);
    //         }
    //     }, 100);
    // }

    return (
        <AuthContext.Provider value={{ address, setAddress, balance, setBalance }}>
            { children}
        </AuthContext.Provider>
    );
}