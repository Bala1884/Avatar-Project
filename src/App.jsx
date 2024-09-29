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
  const [forceIdle, setForceIdle] = useState(false); // Force idle state when spacebar is pressed
  const audioRef = useRef(null); // Reference to the audio element

  // Function to handle the result from SpeechToText component
  const handleSpeechResult = async (speechTranscript) => {
    // Reset forceIdle state when a new question is asked
    setForceIdle(false);

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
      audioRef.current = audio; // Store the audio element in the ref

      // Set the avatar state to speaking when audio starts playing
      setIsSpeaking(true); // Avatar should start speaking
      setIsIdle(false); // Not idle anymore
      
      // Start playing audio and listen for when it ends
      audio.play();

      audio.onended = () => {
        setIsSpeaking(false); // Not speaking anymore
        setIsIdle(true); // Back to idle
      };
    } catch (error) {
      console.error('Error sending request to the backend:', error);
    }
  };

  // Stop the speaking (stop audio and reset avatar state)
  const stopSpeaking = () => {
    if (audioRef.current) {
      audioRef.current.pause(); // Stop the audio
      audioRef.current.currentTime = 0; // Reset audio playback position
      setIsSpeaking(false); // Set speaking state to false
      setIsIdle(true); // Set idle state to true
      setForceIdle(true); // Force the avatar to stay idle
    }
  };

  // Handle avatar animations based on isSpeaking and isIdle states
  useEffect(() => {
    if (isSpeaking) {
      console.log("Speaking animation should play");
    } else if (isIdle) {
      console.log("Idle animation should play");
    }
  }, [isSpeaking, isIdle]); // Trigger effect when isSpeaking or isIdle changes

  // Handle keypress events, specifically the spacebar
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'Space') {
        if (isSpeaking) {
          stopSpeaking(); // Stop speaking when spacebar is pressed
        } else if (forceIdle) {
          console.log("Avatar forced to stay idle, awaiting new question");
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress); // Clean up the event listener
    };
  }, [isSpeaking, forceIdle]);

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