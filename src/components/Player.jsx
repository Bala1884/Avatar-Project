import React, { useRef, useEffect, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';
import { useGraph } from '@react-three/fiber';

export function Player({ isSpeaking, isIdle }) { // Use destructuring for props
  const group = useRef();
  const { scene } = useGLTF('./models/player.glb');
  const { animations } = useGLTF('./models/animations.glb');
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions, names } = useAnimations(animations, group);
  const [currentAnimation, setCurrentAnimation] = useState(null);

  useEffect(() => {
    console.log("Available animations:", animations.map(animation => animation.name)); // Debug log
  }, [animations]);

  const handleAnimation = (index) => {
    const newAction = actions[names[index]];
    if(newAction){
        if (currentAnimation) {
          currentAnimation.fadeOut(0.5); // Smoothly fade out previous animation
        }
        newAction.reset().fadeIn(0.5).play();
        setCurrentAnimation(newAction);
      }
      else {
        console.warn(`No animation action found for index: ${index}`);
      }
    }

  useEffect(() => {
    if (isIdle) {
      handleAnimation(0); // Idle animation
    } else if (isSpeaking) {     
      handleAnimation(1); // Speaking animation
    }
  }, [isIdle, isSpeaking]); // Ensure this effect re-runs when isIdle or isSpeaking changes

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