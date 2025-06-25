import { createContext, useContext } from "react";

export const HomeColorContext = createContext({
    color : String,
    changeColor: () => {}
})

export const HomeColorProvider = HomeColorContext.Provider

export default function useColor() {
    return useContext(HomeColorContext)
}