import React, { useEffect } from 'react';
import { useGraph } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';
import * as THREE from 'three';

export default function HiGirl(props) {
  const group = React.useRef();
  const { scene, animations } = useGLTF('./models/hi_girl.glb');
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions) {
      const action = actions[Object.keys(actions)[0]]; // Get the first animation
      action.setLoop(THREE.LoopOnce); // Set the animation to play only once
      action.clampWhenFinished = true; // Keep the final frame after the animation finishes
      action.play(); // Play the animation

      action.onFinished = () => {
        action.stop(); // Stop the action when the animation finishes
      };
    }
  }, [actions]);

  return (
    <group ref={group} {...props} rotation={[Math.PI / 2, Math.PI / 2, 0]} scale={[3, 3, 3]} position={[1.5, 0, 0]} dispose={null}>
      <group name="Scene">
        <group name="Armature" scale={0.01}>
          <primitive object={nodes.mixamorig2Hips} />
          <skinnedMesh name="Ch22_Body" geometry={nodes.Ch22_Body.geometry} material={materials.Ch22_body} skeleton={nodes.Ch22_Body.skeleton} />
          <skinnedMesh name="Ch22_Eyelashes" geometry={nodes.Ch22_Eyelashes.geometry} material={materials.Ch22_hair} skeleton={nodes.Ch22_Eyelashes.skeleton} />
          <skinnedMesh name="Ch22_Hair" geometry={nodes.Ch22_Hair.geometry} material={materials.Ch22_hair} skeleton={nodes.Ch22_Hair.skeleton} />
          <skinnedMesh name="Ch22_Pants" geometry={nodes.Ch22_Pants.geometry} material={materials.Ch22_body} skeleton={nodes.Ch22_Pants.skeleton} />
          <skinnedMesh name="Ch22_Shirt" geometry={nodes.Ch22_Shirt.geometry} material={materials.Ch22_body} skeleton={nodes.Ch22_Shirt.skeleton} />
          <skinnedMesh name="Ch22_Sneakers" geometry={nodes.Ch22_Sneakers.geometry} material={materials.Ch22_body} skeleton={nodes.Ch22_Sneakers.skeleton} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload('./models/hi_girl.glb');
