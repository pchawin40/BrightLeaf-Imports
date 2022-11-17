// src/components/AlwaysScrollToTop/AlwaysScrollToTop.js

// import react
import { useEffect, useRef } from 'react';

//? AlwaysScrollToTop component
const AlwaysScrollToTop = () => {

  // per messageRef
  useEffect(() => window.scrollTo(0, 0), []);

  return <></>;
};

// export component
export default AlwaysScrollToTop;
