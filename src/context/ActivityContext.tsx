import { createContext,type ReactNode, useReducer, useMemo } from "react";
import { activityReducer,initialState, type ActivityActions, type ActivityState } from "../reducers/activityRecurder";
import { categories } from "../data/categories";
import type { Activity } from "../types";

type ActivityProviderProops = {
    children : ReactNode
}

type ActivityContextProops = {
    state : ActivityState
    dispatch : React.Dispatch<ActivityActions>
    caloriesConsumed: number
    caloriesBurned: number
    netCalories: number
    categoryName: (category: Activity['category']) => string[]
    isEmptyActivities: boolean
}

export const ActivityContext = createContext<ActivityContextProops>(null!)

export const ActivityProvider = ({children} : ActivityProviderProops) =>{
    
    const [state,dispatch] = useReducer(activityReducer,initialState)
    
    const caloriesConsumed = useMemo(()=> state.activities.reduce((total,activity) => activity.category === 1 ? total + 
    activity.calories : total, 0),[state.activities])

    const caloriesBurned = useMemo(()=> state.activities.reduce((total,activity) => activity.category === 2 ? total + 
    activity.calories : total, 0),[state.activities])

    const netCalories = useMemo(()=> caloriesConsumed - caloriesBurned,[state.activities])

    const categoryName = useMemo(()=>
         (category : Activity['category']) =>
             categories.map( cat => cat.id === category ? cat.name : '')
    , [state.activities])


    const isEmptyActivities = useMemo(()=> state.activities.length === 0,[state.activities])    

    return(
        <ActivityContext.Provider value={{
            state,
            dispatch,
            caloriesBurned,
            caloriesConsumed,
            netCalories,
            categoryName,
            isEmptyActivities
        }}>
            {children}
        </ActivityContext.Provider>
    )
}