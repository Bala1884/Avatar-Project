import { OrbitControls } from '@react-three/drei'
import React from 'react'
import Csgo from './Csgo.jsx';
import Fbx from "./Fbx.jsx";
//import Girl from "./Girl_character.jsx"
import HiGirl from './HiGirl.jsx';
import Hi_Talk_Girl from './Hi_Talk_Gurl.jsx';
function Exp({isSpeaking,isIdle,setIsIdle}) {
  return (
    <>
      <Hi_Talk_Girl isSpeaking={isSpeaking} isIdle={isIdle} setIsIdle={setIsIdle}/>
        {/*<HiGirl/>*/}
        </>
      
  )
}

export default Exp;