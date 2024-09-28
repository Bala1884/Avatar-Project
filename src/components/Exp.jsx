import { OrbitControls } from '@react-three/drei'
import React from 'react'
import Csgo from './Csgo.jsx';
import Fbx from "./Fbx.jsx";
//import Girl from "./Girl_character.jsx"
import HiGirl from './HiGirl.jsx';
import Hi_Talk_Girl from './Hi_Talk_Gurl.jsx';
import { Player } from './Player.jsx';
function Exp({isSpeaking,isIdle,}) {
  return (
    <>
      <Player isSpeaking={isSpeaking} isIdle={isIdle}/>
        {/*<HiGirl/>*/}
        </>
      
  )
}

export default Exp;