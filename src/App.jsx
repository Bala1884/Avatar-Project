import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import './app.css';
import Exp from './components/Exp.jsx';
import SpeechToText from './components/SpeechToText.jsx';

function App() {
  const [transcript, setTranscript] = useState(''); // State to hold recognized speech transcript
  const [isSpeaking, setIsSpeaking] = useState(false); // Manage speaking state
  const [isIdle, setIsIdle] = useState(true); // Manage idle state
  const isAnimationPlaying = useRef(false); // To prevent multiple animations

  // Function to handle the result from SpeechToText component
  const handleSpeechResult = async (speechTranscript) => {
    setTranscript(speechTranscript); // Update the state with the recognized text
    console.log('Recognized text:', speechTranscript);

    // Send the transcript to the backend via POST request
    try {
      const response = await fetch('http://localhost:8000/voice-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: speechTranscript }),
      });

      if (!response.ok) {
        throw new Error('Failed to send request to the backend');
      }

      const data = await response.json();
      const audioUrl = data.audio_url;

      // Play the returned audio from the backend
      const audio = new Audio(audioUrl);

      // Set the avatar state to speaking when audio starts playing
      setIsSpeaking(true); // Avatar should start speaking
      setIsIdle(false); // Not idle anymore
      
      // Start playing audio
      audio.play();

      // When audio ends, return avatar to idle state
      audio.onended = () => {
        setIsSpeaking(false); // Not speaking anymore
        setIsIdle(true); // Back to idle, should stay idle
      };
    } catch (error) {
      console.error('Error sending request to the backend:', error);
    }
  };

  // Handle avatar animations based on isSpeaking and isIdle states
  useEffect(() => {
    if (isAnimationPlaying.current) return; // Prevent re-triggering animations

    if (isSpeaking) {
      console.log("Start speaking animation");
      isAnimationPlaying.current = true;

      // Simulate speaking animation
      setTimeout(() => {
        isAnimationPlaying.current = false;
      }, 1500); // Simulate 1.5s speaking animation
    } else if (isIdle) {
      console.log("Start idle animation, keep playing");
      isAnimationPlaying.current = true;

      // Simulate idle animation (infinite loop)
      setTimeout(() => {
        isAnimationPlaying.current = false; // Can play continuously
      }, 1500);
    }
  }, [isSpeaking, isIdle]);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <Canvas>
        <OrbitControls />
        <ambientLight intensity={5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Environment preset="sunset" />

        {/* Pass isSpeaking and isIdle to control the Avatar animations */}
        <Exp isSpeaking={isSpeaking} isIdle={isIdle} />
      </Canvas>

      {/* Speech recognition and text result handling */}
      <SpeechToText onResult={handleSpeechResult} />
    </div>
  );
}

export default App;
