import React, { createContext, useReducer } from "react";
import appReducer from "./appReducer";
import {initialState} from "./appReducer";

export const AppContext = createContext() 


export function AppProvider(props){
    
    const [state, dispatch]  = useReducer(appReducer, initialState)


    return (
        <AppContext.Provider value={{state, dispatch}}>{props.children}</AppContext.Provider>
    )
}


