// src/components/About/LowerAbout/BottomLower/BottomLower.js

// import css
import { createRef, useEffect } from 'react';
import { useNavHeader } from '../../../../context/NavHeaderContext';
import './BottomLower.css';

// import component
import LBL from './LBL';
import MBL from './MBL';
import TBL from './TBL';

//? BottomLower component
const BottomLower = () => {
  return (
    <section
      className="bottom-lower-section"
    >
      <h1>Our Hand-Crafted Story</h1>
      {/* Top Bottom Lower */}
      <TBL />

      {/* Mid Bottom Lower */}
      <MBL />

      {/* Lower Bottom Lower */}
      <LBL />
    </section>
  );
};

// export default component
export default BottomLower;
