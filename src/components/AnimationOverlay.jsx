// src/components/AnimationOverlay.jsx
import React from 'react';
import { useCharacterAnimations } from '../contexts/CharacterAnimations';

const AnimationOverlay = () => {
  const { animations } = useCharacterAnimations(); // Retrieve animations from your context

  return (
    <div style={{
      position: 'absolute',
      bottom: 0,
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Optional: for better visibility
      color: 'white',
      padding: '10px',
    }}>
      {animations.map(animation => (
        <div key={animation} style={{ margin: '0 10px' }}>
          {animation}
        </div>
      ))}
    </div>
  );
};

export default AnimationOverlay;
