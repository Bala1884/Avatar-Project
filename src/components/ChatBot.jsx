import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';
import Avatar from './Avatar';

const Chatbot = () => {
  const [transcript, setTranscript] = useState('');
  const [botAudioResponse, setBotAudioResponse] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isIdle,setIsIdle]=useState(true);
  const {
    transcript: userTranscript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const handleStartListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: false });
  };

  const handleStopListening = async () => {
    SpeechRecognition.stopListening();
    setTranscript(userTranscript);
    const response = await sendTextToBackend(userTranscript);
    setBotAudioResponse(response.audio_url);
  };

  const sendTextToBackend = async (text) => {
    try {
      const res = await axios.post('http://127.0.0.1:8000/voice-chat', { message: text });
      return res.data;
    } catch (error) {
      console.error('Error sending message to the backend:', error);
      return { audio_url: null };
    }
  };

  const handlePlayBotAudio = () => {
    if (botAudioResponse) {
      const audio = new Audio(botAudioResponse);
      setIsIdle(false);
      setIsSpeaking(true); // Start avatar speaking animation
      audio.play();
      audio.onended = () => {
        setIsSpeaking(false);
        setIsIdle(true) // Stop avatar speaking animation
      };
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <div>Browser doesn't support speech recognition.</div>;
  }

  return (
    <div>
      <button onMouseDown={handleStartListening} onMouseUp={handleStopListening}>
        {listening ? 'Listening...' : 'Hold to Talk'}
      </button>
      <p>User: {transcript}</p>
      <Avatar isSpeaking={isSpeaking} />
      {botAudioResponse && (
        <button onClick={handlePlayBotAudio}>Play Bot Response</button>
      )}
    </div>
  );
};

export default Chatbot;
