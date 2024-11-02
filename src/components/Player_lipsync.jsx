import React, { useRef, useEffect, useState } from 'react';
import { useFrame } from "@react-three/fiber";
import { useGraph } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';
import * as THREE from 'three';

const corresponding = {
  A: "viseme_PP",
  B: "viseme_kk",
  C: "viseme_I",
  D: "viseme_AA",
  E: "viseme_O",
  F: "viseme_U",
  G: "viseme_FF",
  H: "viseme_TH",
  X: "viseme_PP",
};

export default function Player_lipsync({ isSpeaking, isIdle, audio, lipsync }) {
  const group = useRef();
  const { scene } = useGLTF('/models/player_lipsync.glb');
  const {animations}=useGLTF('/models/animations.glb');
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions, names, mixer } = useAnimations(animations, group);
  const [currentCueIndex, setCurrentCueIndex] = useState(0);
  const [currentAnimation, setCurrentAnimation] = useState(null);
  const [talkingIndex, setTalkingIndex] = useState(1);
  const headFollow=true;
  const mouthCues=
    [
      
          { "start": 0.00, "end": 0.05, "value": "X" },
          { "start": 0.05, "end": 0.27, "value": "D" },
          { "start": 0.27, "end": 0.41, "value": "B" },
          { "start": 0.41, "end": 0.49, "value": "A" },
          { "start": 0.49, "end": 0.59, "value": "F" },
          { "start": 0.59, "end": 0.66, "value": "B" },
          { "start": 0.66, "end": 0.73, "value": "F" },
          { "start": 0.73, "end": 0.80, "value": "D" },
          { "start": 0.80, "end": 0.94, "value": "B" },
          { "start": 0.94, "end": 1.01, "value": "C" },
          { "start": 1.01, "end": 1.15, "value": "B" },
          { "start": 1.15, "end": 1.29, "value": "C" },
          { "start": 1.29, "end": 1.40, "value": "B" },
          { "start": 1.40, "end": 1.47, "value": "F" },
          { "start": 1.47, "end": 1.54, "value": "C" },
          { "start": 1.54, "end": 1.61, "value": "B" },
          { "start": 1.61, "end": 1.68, "value": "A" },
          { "start": 1.68, "end": 1.79, "value": "F" },
          { "start": 1.79, "end": 1.87, "value": "A" },
          { "start": 1.87, "end": 1.93, "value": "C" },
          { "start": 1.93, "end": 2.27, "value": "F" },
          { "start": 2.27, "end": 2.37, "value": "A" },
          { "start": 2.37, "end": 2.44, "value": "B" },
          { "start": 2.44, "end": 2.58, "value": "C" },
          { "start": 2.58, "end": 2.84, "value": "B" },
          { "start": 2.84, "end": 2.90, "value": "H" },
          { "start": 2.90, "end": 3.10, "value": "B" },
          { "start": 3.10, "end": 3.24, "value": "E" },
          { "start": 3.24, "end": 3.38, "value": "C" },
          { "start": 3.38, "end": 3.52, "value": "F" },
          { "start": 3.52, "end": 3.59, "value": "C" },
          { "start": 3.59, "end": 3.80, "value": "B" },
          { "start": 3.80, "end": 3.88, "value": "A" },
          { "start": 3.88, "end": 4.10, "value": "B" },
          { "start": 4.10, "end": 4.38, "value": "F" },
          { "start": 4.38, "end": 4.45, "value": "D" },
          { "start": 4.45, "end": 4.66, "value": "B" },
          { "start": 4.66, "end": 4.73, "value": "C" },
          { "start": 4.73, "end": 5.08, "value": "B" },
          { "start": 5.08, "end": 5.15, "value": "G" },
          { "start": 5.15, "end": 5.22, "value": "C" },
          { "start": 5.22, "end": 5.30, "value": "A" },
          { "start": 5.30, "end": 5.41, "value": "E" },
          { "start": 5.41, "end": 5.50, "value": "A" },
          { "start": 5.50, "end": 5.56, "value": "B" },
          { "start": 5.56, "end": 5.69, "value": "D" },
          { "start": 5.69, "end": 5.76, "value": "B" },
          { "start": 5.76, "end": 5.83, "value": "C" },
          { "start": 5.83, "end": 6.11, "value": "B" },
          { "start": 6.11, "end": 6.21, "value": "X" }
        
    ]
      
  
  useEffect(() => {
    console.log("Available animations:", animations.map(animation => animation.name));
  }, [animations]);

  // const handleAnimation = (index, loopType = THREE.LoopRepeat) => {
  //   const newAction = actions[names[index]];
  //   if (newAction) {
  //     if (currentAnimation) {
  //       currentAnimation.fadeOut(0.5);
  //     }
  //     newAction.reset().fadeIn(0.5).play();
  //     newAction.setLoop(loopType);
  //     setCurrentAnimation(newAction);
  //   }
  // };

  // const handleAnimationEnd = () => {
  //   setTalkingIndex((prevIndex) => {
  //     const nextIndex = prevIndex === 1 ? 2 : 1;
  //     handleAnimation(nextIndex, THREE.LoopOnce);
  //     return nextIndex;
  //   });
  // };
  const handleAnimation = (index, loopType = THREE.LoopRepeat) => {
    const newAction = actions[names[index]];
    if (newAction) {
      if (currentAnimation) {
        currentAnimation.fadeOut(0.5);
      }
      newAction.reset().fadeIn(0.5).play();
      newAction.setLoop(loopType); // Set loop type (LoopRepeat or LoopOnce)
      setCurrentAnimation(newAction);
    } else {
      console.warn(`No animation action found for index: ${index}`);
    }
  };
  
  const handleAnimationEnd = () => {
    setTalkingIndex(prevIndex => {
      const nextIndex = prevIndex === 1 ? 2 : 1; // Toggle between talking1 (index 1) and talking2 (index 2)
      handleAnimation(nextIndex, THREE.LoopOnce); // Start the new talking animation with LoopOnce
      return nextIndex;
    });
  };
  
  useEffect(() => {
    let talkingInterval;
  
    if (isIdle) {
      handleAnimation(0); // Idle animation
      if (talkingInterval) {
        clearInterval(talkingInterval); 
        // Stop alternating animations when idle
      }
      Object.values(corresponding).forEach((value) => {
        nodes.Wolf3D_Head.morphTargetInfluences[nodes.Wolf3D_Head.morphTargetDictionary[value]] = 0;
        nodes.Wolf3D_Teeth.morphTargetInfluences[nodes.Wolf3D_Teeth.morphTargetDictionary[value]] = 0;
      });
    } else if (isSpeaking) {
      handleAnimation(talkingIndex); // Start with the current talking animation
  
      // Start alternating between talking animations
      talkingInterval = setInterval(() => {
        setTalkingIndex(prevIndex => {
          const nextIndex = prevIndex === 1 ? 2 : 1; // Toggle between 1 and 2
          handleAnimation(nextIndex); // Play the new animation
          return nextIndex;
        });
      }, 3000); // Adjust the interval time (3000ms = 3 seconds)
    }
  
    return () => {
      if (talkingInterval) {
        clearInterval(talkingInterval); // Clear the interval on unmount or when dependencies change
      }
    };
  }, [isIdle, isSpeaking, talkingIndex, actions, names, currentAnimation]);
  
  
  useFrame((state) => {
    if (headFollow) {
      group.current.getObjectByName("Head").lookAt(state.camera.position);
    }
  });

  // useEffect(() => {
  //   if (isIdle) {
  //     handleAnimation(0, THREE.LoopRepeat);
  //     if (currentAnimation) {
  //       currentAnimation.stop();
  //     }
  //   } else if (isSpeaking) {
  //     handleAnimation(talkingIndex, THREE.LoopOnce);
  //     mixer.addEventListener('finished', handleAnimationEnd);
  //   }
  //   return () => {
  //     if (mixer) mixer.removeEventListener('finished', handleAnimationEnd);
  //   };
  // }, [isIdle, isSpeaking, talkingIndex, mixer, currentAnimation]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isSpeaking) {
        clearInterval(interval);
        return;
      }

      // Reset all morph target influences
      Object.values(corresponding).forEach((value) => {
        nodes.Wolf3D_Head.morphTargetInfluences[nodes.Wolf3D_Head.morphTargetDictionary[value]] = 0;
        nodes.Wolf3D_Teeth.morphTargetInfluences[nodes.Wolf3D_Teeth.morphTargetDictionary[value]] = 0;
      });

      // Get the current mouth cue
      const mouthCue = mouthCues[currentCueIndex];
      if (mouthCue) {
        const visemeKey = corresponding[mouthCue.value];
        nodes.Wolf3D_Head.morphTargetInfluences[nodes.Wolf3D_Head.morphTargetDictionary[visemeKey]] = 1;
        nodes.Wolf3D_Teeth.morphTargetInfluences[nodes.Wolf3D_Teeth.morphTargetDictionary[visemeKey]] = 1;
      }

      // Move to the next cue
      setCurrentCueIndex((index) => (index + 1) % mouthCues.length);
    }, 100); // Adjust interval as needed

    return () => clearInterval(interval);
  }, [isSpeaking, currentCueIndex, lipsync]);
  

  return (
    <group ref={group} dispose={null} position={[1, -2, 0]} scale={[3, 3, 3]}>
      <primitive object={nodes.Hips} />
      <skinnedMesh geometry={nodes.Wolf3D_Hair.geometry} material={materials.Wolf3D_Hair} skeleton={nodes.Wolf3D_Hair.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Body.geometry} material={materials.Wolf3D_Body} skeleton={nodes.Wolf3D_Body.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Outfit_Bottom.geometry} material={materials.Wolf3D_Outfit_Bottom} skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Outfit_Footwear.geometry} material={materials.Wolf3D_Outfit_Footwear} skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton} />
      <skinnedMesh geometry={nodes.Wolf3D_Outfit_Top.geometry} material={materials.Wolf3D_Outfit_Top} skeleton={nodes.Wolf3D_Outfit_Top.skeleton} />
      <skinnedMesh name="EyeLeft" geometry={nodes.EyeLeft.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeLeft.skeleton} morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary} morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences} />
      <skinnedMesh name="EyeRight" geometry={nodes.EyeRight.geometry} material={materials.Wolf3D_Eye} skeleton={nodes.EyeRight.skeleton} morphTargetDictionary={nodes.EyeRight.morphTargetDictionary} morphTargetInfluences={nodes.EyeRight.morphTargetInfluences} />
      <skinnedMesh name="Wolf3D_Head" geometry={nodes.Wolf3D_Head.geometry} material={materials.Wolf3D_Skin} skeleton={nodes.Wolf3D_Head.skeleton} morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences} />
      <skinnedMesh name="Wolf3D_Teeth" geometry={nodes.Wolf3D_Teeth.geometry} material={materials.Wolf3D_Teeth} skeleton={nodes.Wolf3D_Teeth.skeleton} morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary} morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences} />
    </group>
  );
}

useGLTF.preload('/player_lipsync.glb');
