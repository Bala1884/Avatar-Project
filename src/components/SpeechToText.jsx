import React, { useEffect, useState } from 'react';

const SpeechToText = ({ onResult,setForceIdle }) => {
  let recognition;
  const [isRecognizing, setIsRecognizing] = useState(false);

  // Initialize recognition outside the useEffect
  if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-IN';
  }

  useEffect(() => {
    if (recognition) {
      recognition.onresult = async (event) => {
        const speechTranscript = event.results[0][0].transcript;
        console.log('Transcript:', speechTranscript);

        if (onResult) {
          onResult(speechTranscript); // Callback to send transcript to App.jsx
        }
      };

      recognition.onend = () => {
        console.log('Speech recognition stopped');
        setIsRecognizing(false); // Reset flag when recognition ends
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecognizing(false); // Reset flag if an error occurs
      };
    }

    const handleKeyDown = (e) => {
      if ((e.key === 'T' || e.key === 't') && !isRecognizing) {
        // setForceIdle(false)
        recognition.start();
        setIsRecognizing(true);
        console.log('Speech recognition started');
      }
    };

    const handleKeyUp = (e) => {
      if ((e.key === 'T' || e.key === 't') && isRecognizing) {
        recognition.stop(); // Stop recognition
        setIsRecognizing(false); // Reset flag
        console.log('Speech recognition stopped');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [onResult, isRecognizing]);

  return null;
};

export default SpeechToText;
