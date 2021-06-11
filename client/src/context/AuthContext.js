import React, { createContext, useState } from 'react';
export const AuthContext = createContext();

export default ({ children }) => {
    const [address, setAddress] = useState("");
    const [balance, setBalance] = useState("");

    return (
        <AuthContext.Provider value={{ address, setAddress, balance, setBalance }}>
            { children}
        </AuthContext.Provider>
    );
}