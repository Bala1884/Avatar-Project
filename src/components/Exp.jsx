import { OrbitControls } from '@react-three/drei'
import React from 'react'
import Csgo from './Csgo.jsx';
import Fbx from "./Fbx.jsx";
//import Girl from "./Girl_character.jsx"
import HiGirl from './HiGirl.jsx';
import Hi_Talk_Girl from './Hi_Talk_Gurl.jsx';
import { Player } from './Player.jsx';
import Player_lipsync from './Player_lipsync.jsx'
import {AvatarLs} from './AvatarLs.jsx'
function Exp({isSpeaking,isIdle,lipsyncData,audioProgress}) {
  return (
    <>
      <Player_lipsync isSpeaking={isSpeaking} isIdle={isIdle} lipsyncData={lipsyncData} audioProgress={audioProgress}/>
        {/*<HiGirl/>*/}
        </>
      
  )
}

export default Exp;