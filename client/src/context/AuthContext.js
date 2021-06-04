import React, { createContext, useState, useEffect } from 'react';
import axios from "axios";
export const AuthContext = createContext();

export default ({ children }) => {
    const [address, setAddress] = useState("");

    // useEffect(() => {
    //     if(address) {
    //         createAccount();
    //     }
    // }, [address]);

    // async function createAccount() {
    //     try {
    //         const res = await axios.post("/user/register", { "address" : address });
    //         console.log(res.data);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    return (
        <AuthContext.Provider value={{ address, setAddress}}>
            { children}
        </AuthContext.Provider>
    );
}