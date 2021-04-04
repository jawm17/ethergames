import React, {createContext,useState} from 'react';

export const StakeContext = createContext();

export default ({ children })=>{
    const [staked,setStaked] = useState(false);

    return (
            <StakeContext.Provider value={{staked, setStaked}}>
                { children }
            </StakeContext.Provider>
    )
}