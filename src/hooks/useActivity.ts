import { useContext } from "react";

import { ActivityContext } from "../context/ActivityContext";

export const useActivity = () => {
    const context = useContext(ActivityContext)
    if(!context){
        throw new Error('el hook useActivity tiene que ser utilizado en un Activity provider')
    }
    return context
}