import { createContext, useContext, useState } from "react";

const CharacterAnimationsContext=createContext({});
export const CharacterAnimationsProvider=(props)=>{
    const [animations,setAnimations]=useState([])
    const [animationIndex,setAnimationIndex]=useState(0);
    return (
        <CharacterAnimationsContext.Provider value={{
            animationIndex,
            setAnimationIndex,
            animations,
            setAnimations
        }}>
            {props.children}
        </CharacterAnimationsContext.Provider>
    )
}
export const useCharacterAnimations=()=>{
    return useContext(CharacterAnimationsContext);
}