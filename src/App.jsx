// src/App.js
import React from 'react';
import Exp from './components/Exp.jsx';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import "./app.css";
import Interface from './components/Interface.jsx';
import AnimationOverlay from './components/AnimationOverlay.jsx';
import { MantineProvider } from '@mantine/core';
function App() {
  return (
    
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <Canvas>
        <OrbitControls />
        <ambientLight intensity={5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Environment preset="sunset" />
        <Exp />
      </Canvas>

     
        <Interface />
     
    </div>
    
  );
}

export default App;
