// src/components/NavRight/NavRight.js

// import component
import NavModal from './NavModal';

// import context
import { Modal } from '../../context/Modal';
import { useNavRight } from '../../context/NavRightContext';
import { useNavHeader } from '../../context/NavHeaderContext';

// import css
import './NavRight.css';

// import libraries
import { Squash as Hamburger } from 'hamburger-react';
import { Animate, AnimateKeyframes, AnimateGroup } from "react-simple-animate";

// import react
import { useEffect, useState } from 'react';

//? NavRight component
const NavRight = () => {
  /**
   * Controlled inputs
   */
  const { showNavModal, setShowNavModal } = useNavRight();
  const { loadCartModal, setLoadCartModal } = useNavHeader();
  const { color, setColor } = useNavHeader();
  const { prevColor, setPrevColor } = useNavHeader();

  return (
    <section
      style={{
        right: showNavModal ? "1.25vw" : ".85vw"
      }}
      id="nav-rn-section"
    >
      <Animate
        play={loadCartModal}
        duration={.4}
        start={{
          transform: `translateX(0px)`
        }}
        end={{ transform: `translateX(100px)` }}
      >
        <figure
          id="nav-rn-figure"
          onClick={_ => {
            setShowNavModal(!showNavModal);
            if (!showNavModal) setColor("white");
            // TODO: To fix color when icon is set to black
            document.body.style.overflowY = "scroll";
          }}
        >
          <Hamburger
            toggled={showNavModal}
            color="white"
            easing="ease-in"
          />
        </figure>
      </Animate>
    </section>
  );
};

// export default component
export default NavRight;
