import React, { useRef, useEffect, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';
import { useGraph } from '@react-three/fiber';

const Avatar = ({ isSpeaking, isIdle, setIsIdle }) => {
  const group = useRef();
  const {animations} = useGLTF('./models/animations.glb');
  const { scene } = useGLTF('./models/hi_talk_gurl.glb');
  const clone = SkeletonUtils.clone(scene);
  const { nodes, materials } = useGraph(clone);
  const { actions,names } = useAnimations(animations, group);
  const [currentAnimation,setCurrentAnimation]=useState(null);


  useEffect(() => {
    console.log("Available animations:", animations.map(animation => animation.name)); // Debug log
  }, [animations]);

  const handleAnimation=(index)=>{
    const newAction=actions[names[index]];
    newAction.reset().fadeIn(0.5).play();
    setCurrentAnimation(newAction);
    return ()=>(newAction.fadeOut(0.5))
  }

  useEffect(()=>{
    handleAnimation(0);
  },[])
  // useEffect(()=>{

  // },[])

  
  

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
