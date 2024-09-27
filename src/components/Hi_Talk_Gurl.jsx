import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';
import { useGraph } from '@react-three/fiber';

const Avatar = ({ isSpeaking, isIdle, setIsIdle }) => {
  const group = useRef();
  const { scene, animations } = useGLTF('./models/hi_talk_gurl.glb');
  const clone = SkeletonUtils.clone(scene);
  const { nodes, materials } = useGraph(clone);
  const { actions,names } = useAnimations(animations, group);
  const playedHi = useRef(false); // To ensure 'Hi' plays only once
  const talkingAction = useRef(null);
  const idleAction = useRef(null);

  useEffect(() => {
    console.log("Available animations:", animations.map(animation => animation.name)); // Debug log
  }, [animations]);
  
  useEffect(() => {
    // Play the 'Hi' animation initially once
    if (!playedHi.current) {
      const hiAction = actions[names[0]];
      hiAction.reset().fadeIn(0.5).play();
      console.log('Playing Hi animation'); 

      const duration = hiAction._clip.duration;

      // Stop 'Hi' animation after it finishes
      const stopAnimationTimeout = setTimeout(() => {
        hiAction.fadeOut(0.5).stop();
        setIsIdle(true);
        playedHi.current = true; // Mark 'Hi' as played
        console.log('Hi animation ended, setting isIdle to true'); 
      }, duration * 1000);

      return () => {
        clearTimeout(stopAnimationTimeout);
        hiAction.fadeOut(0.5).stop();
      };
    }
  }, [actions]);

  useEffect(() => {
    talkingAction.current = actions[names[0]];
    idleAction.current = actions[names[0]];
  }, [actions]);

  useEffect(() => {
    console.log('isSpeaking:', isSpeaking, 'isIdle:', isIdle); 
    if (isSpeaking && talkingAction.current) {
      talkingAction.current.reset().fadeIn(0.5).play();
      console.log('Playing Talking animation',talkingAction.current); 
      if (idleAction.current) {
        idleAction.current.fadeOut(0.5).stop();
        console.log('Stopping Idle animation'); 
      }
    } else if (isIdle && idleAction.current) {
      talkingAction.current.reset().fadeIn(0.5).play();
      console.log('Playing Idle animation',idleAction.current);
      if (talkingAction.current) {
        talkingAction.current.fadeOut(0.5).stop();
        console.log('Stopping Talking animation');
      }
    }
  }, [isSpeaking, isIdle]);

  return (
    <group ref={group} rotation={[0, 0, Math.PI / 2]} scale={[3, 3, 3]} position={[1.5, 0, 0]} dispose={null}>
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
};

useGLTF.preload('./models/hi_talk_gurl.glb');

export default Avatar;
