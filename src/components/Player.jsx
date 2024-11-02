import React, { useRef, useEffect, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';
import { useGraph } from '@react-three/fiber';
import * as THREE from 'three'; // Import THREE

export function Player({ isSpeaking, isIdle }) { 
  const group = useRef();
  const { scene } = useGLTF('./models/player.glb');
  const { animations } = useGLTF('./models/animations.glb');
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions, names, mixer } = useAnimations(animations, group); // Get mixer
  const [currentAnimation, setCurrentAnimation] = useState(null);
  const [talkingIndex, setTalkingIndex] = useState(1); // State to keep track of which talking animation is active

  useEffect(() => {
    console.log("Available animations:", animations.map(animation => animation.name)); 
  }, [animations]);

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
      clearInterval(talkingInterval); // Stop alternating animations when idle
    } else if (isSpeaking) {
      handleAnimation(talkingIndex); // Start with the current talking animation

      // Alternate between talking1 (index 1) and talking2 (index 2)
      talkingInterval = setInterval(() => {
        setTalkingIndex(prevIndex => {
          const nextIndex = prevIndex === 1 ? 2 : 1; // Toggle between 1 and 2
          handleAnimation(nextIndex); // Play the new animation
          return nextIndex;
        });
      }, 3000); // Adjust the interval time (2000ms = 2 seconds)
    }

    return () => {
      clearInterval(talkingInterval); // Cleanup the interval when the component unmounts or when the speaking state changes
    };
  }, [isIdle, isSpeaking, talkingIndex]);

  return (
    <group ref={group} dispose={null} scale={[3, 3, 3]} position={[1, -2, 0]}>
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

useGLTF.preload('/player.glb');
