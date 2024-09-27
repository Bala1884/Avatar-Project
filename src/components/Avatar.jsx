import React, { useRef, useEffect } from 'react';

const Avatar = ({ isSpeaking }) => {
  const avatarRef = useRef();

  useEffect(() => {
    if (isSpeaking) {
      // Start speaking animation
      avatarRef.current.playSpeakingAnimation();
    } else {
      // Stop speaking animation
      avatarRef.current.stopSpeakingAnimation();
    }
  }, [isSpeaking]);

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
};

export default Avatar;
