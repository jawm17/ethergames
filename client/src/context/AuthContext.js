import React, { createContext, useState, useEffect } from 'react';
import axios from "axios";
export const AuthContext = createContext();

export default ({ children }) => {
    const [address, setAddress] = useState("");
    const [balance, setBalance] = useState("");

    // useEffect(() => {
    //     if(address) {
    //         createAccount();
    //     }
    // }, [address]);

    // async function getBalance() {
    //     try {
    //         const res = await axios.post("/user/balance", { "address": address });
    //         let { balance } = res.data;
    //         // set user's balance on display
    //         setBalance(Math.floor(balance / 0.0001));
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    return (
        <AuthContext.Provider value={{ address, setAddress, balance, setBalance }}>
            { children}
        </AuthContext.Provider>
    );
}