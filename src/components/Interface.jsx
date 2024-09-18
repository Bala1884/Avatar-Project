import React from 'react';
import { Button, Affix } from '@mantine/core';
import { useCharacterAnimations } from '../contexts/CharacterAnimations';

const Interface = () => {
  const { animations, setAnimationIndex } = useCharacterAnimations();

  console.log('Anima:', animations); // Debugging line

  return (
    <Affix position={{ bottom: 50, right: 20 }}>
      <div style={{ display: 'flex', gap: '10px' }}>
        {animations && animations.length > 0 ? (
          animations.map((animation,index) => (
            <Button key={animation} onClick={()=> setAnimationIndex(index)}>
              {animation}
            </Button>
          ))
        ) : (
          <p>No animations available</p>
        )}
      </div>
    </Affix>
  );
};

export default Interface;
