import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

function FBXModel({ path }) {
    const fbx = useLoader(FBXLoader, path);
    const ref = useRef();
  
    // Optionally animate the model
    useFrame(() => {
      if (ref.current) {
        ref.current.rotation.y += 0.01;
      }
    });
  
    return <primitive ref={ref} object={fbx} scale={0.1} />;
  }
const Fbx = () => {
    return (
        <Canvas>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <FBXModel path="../models/FBX_Model.fbx" />
        </Canvas>
      );
}

export default Fbx