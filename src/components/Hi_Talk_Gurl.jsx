import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useGraph } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';
import * as THREE from 'three';
import { useCharacterAnimations } from '../contexts/CharacterAnimations';

export default function HiTalkGirl(props) {
  const group = useRef();
  const { scene, animations } = useGLTF('./models/hi_talk_gurl.glb');
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions,names } = useAnimations(animations, group);
  const {setAnimations, animationIndex}=useCharacterAnimations();
  const [animationStep, setAnimationStep] = useState('hi');
  //console.log(names)
  useEffect(()=>{
    if (names)
    setAnimations(names);
  },[names]);
  useEffect(()=>{
    
    
    actions[names[animationIndex]].reset().fadeIn(0.5).play();
    return()=>{
      actions[names[animationIndex]].fadeOut(0.5);
    }
  },[animationIndex]);

  /*useEffect(() => {
    if (actions) {
      const actionName = animationStep === 'hi' ? 'Hi' : 'Talking';
      const action = actions[actionName];

      if (action) {
        action.setLoop(THREE.LoopOnce);
        action.clampWhenFinished = true;
        action.play();

        // This function checks whether the animation has finished.
        const checkAnimationComplete = () => {
          if (action.time >= action._clip.duration) {
            action.stop();
            // Simulate onFinished behavior
            if (animationStep === 'hi') {
              setAnimationStep('talking');
            }
          } else {
            requestAnimationFrame(checkAnimationComplete);
          }
        };

        // Start checking for animation completion.
        requestAnimationFrame(checkAnimationComplete);
      }
    }
  }, [actions, animationStep]);*/

  return (
    <group ref={group} {...props} rotation={[ 0, 0,Math.PI / 2]} scale={[3, 3, 3]} position={[1.5,0,0]}  dispose={null}>
      <group name="Scene">
        <group name="Hi" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorig2Hips} />
          <skinnedMesh name="Ch22_Body" geometry={nodes.Ch22_Body.geometry} material={materials.Ch22_body} skeleton={nodes.Ch22_Body.skeleton} />
          <skinnedMesh name="Ch22_Eyelashes" geometry={nodes.Ch22_Eyelashes.geometry} material={materials.Ch22_hair} skeleton={nodes.Ch22_Eyelashes.skeleton} />
          <skinnedMesh name="Ch22_Hair" geometry={nodes.Ch22_Hair.geometry} material={materials.Ch22_hair} skeleton={nodes.Ch22_Hair.skeleton} />
          <skinnedMesh name="Ch22_Pants" geometry={nodes.Ch22_Pants.geometry} material={materials.Ch22_body} skeleton={nodes.Ch22_Pants.skeleton} />
          <skinnedMesh name="Ch22_Shirt" geometry={nodes.Ch22_Shirt.geometry} material={materials.Ch22_body} skeleton={nodes.Ch22_Shirt.skeleton} />
          <skinnedMesh name="Ch22_Sneakers" geometry={nodes.Ch22_Sneakers.geometry} material={materials.Ch22_body} skeleton={nodes.Ch22_Sneakers.skeleton} />
        </group>
        <group name="Talking" position={[0, 0, 0.666]} rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorig2Hips_1} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('./models/hi_talk_gurl.glb');
