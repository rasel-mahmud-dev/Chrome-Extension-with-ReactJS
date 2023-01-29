import { useContext } from "react";
import { AppContext } from "./AppProvider";

function useStore(){
    const context = useContext(AppContext)  
    return [context.state, context.dispatch]
}

export default useStore