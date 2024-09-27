import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import './app.css';
import Exp from './components/Exp.jsx';
import SpeechToText from './components/SpeechToText.jsx';

function App() {
  const [transcript, setTranscript] = useState(''); // State to hold recognized speech transcript
  const [isSpeaking, setIsSpeaking] = useState(false); // Manage speaking state
  const [isIdle, setIsIdle] = useState(false); // Manage idle state

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

      // Trigger the speaking animation
      setIsIdle(false); // Set to non-idle when speech begins
      setIsSpeaking(true); // Start avatar speaking animation

      audio.play();
      audio.onended = () => {
        setIsSpeaking(false); // Stop avatar speaking animation after audio ends
        setIsIdle(true); // Set avatar back to idle when speaking ends
      };
    } catch (error) {
      console.error('Error sending request to the backend:', error);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <Canvas>
        <OrbitControls />
        <ambientLight intensity={5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Environment preset="sunset" />
        
        {/* Pass isSpeaking and isIdle to control the Avatar animations */}
        <Exp isSpeaking={isSpeaking} isIdle={isIdle} setIsIdle={setIsIdle} />
      </Canvas>

      {/* Speech recognition and text result handling */}
      <SpeechToText
        onResult={handleSpeechResult}
      />
    </div>
  );
}

export default App;
