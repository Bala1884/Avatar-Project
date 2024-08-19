// src/App.js
import React from 'react';
import Exp from './components/Exp.jsx';
import { Canvas } from '@react-three/fiber';
import {Environment, OrbitControls, ScrollControls } from '@react-three/drei';
import "./app.css"
function App() {
  return (
    
    <Canvas >
      <OrbitControls />
      <ambientLight intensity={5}  />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Environment preset="sunset"></Environment>
      <Exp/>

    </Canvas>
    
  );
}

export default App;
