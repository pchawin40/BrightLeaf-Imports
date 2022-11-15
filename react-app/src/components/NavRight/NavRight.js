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

//? NavRight component
const NavRight = () => {
  /**
   * Controlled inputs
   */
  const { showNavModal, setShowNavModal } = useNavRight();
  const { loadCartModal, setLoadCartModal } = useNavHeader();

  return (
    <section
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
          onClick={_ => setShowNavModal(!showNavModal)}
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
