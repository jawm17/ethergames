import React, {createContext,useState,useEffect} from 'react';

export const AuthContext = createContext();

export default ({ children })=>{
    const [user,setUser] = useState(null);
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const [isLoaded,setIsLoaded] = useState(false);

    useEffect(()=>{
            setUser("a");
            setIsAuthenticated(true);
            setIsLoaded(true);
    },[]);

    return (
        <div>
            {!isLoaded ? <h1> </h1> : 
            <AuthContext.Provider value={{user,setUser,isAuthenticated,setIsAuthenticated}}>
                { children }
            </AuthContext.Provider>}
        </div>
    )
}