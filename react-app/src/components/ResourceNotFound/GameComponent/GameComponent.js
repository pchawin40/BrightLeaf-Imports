// src/components/ResourceNotFound/GameComponent.js/GameComponent.js

// import css
import './GameComponent.css';

import Snake from 'snake-game-react';
import { useEffect, useState } from 'react';

//? GameComponent component
const GameComponent = () => {
  /**
   * Controlled inputs
   */
  const [gameStarted, setGameStarted] = useState(false);

  /**
   * UseEffect
   */
  // per general
  useEffect(() => {
    // per key press
    document.addEventListener('keydown', handleKeyPress);

    return handleKeyPress(() => document.removeEventListener('keydown', handleKeyPress));
  }, [gameStarted])

  // pressing spacebar will turn on snake game
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      setGameStarted(true);
    }
  }

  return (
    <section
      onKeyPress={handleKeyPress}
    >
      {
        gameStarted
        &&
        <Snake
          color1="#80ab63"
          color2="#000000"
          backgroundColor="#FFFFFF"
        />
      }
    </section>
  );
};

// export default component
export default GameComponent;
