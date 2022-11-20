// src/components/NavRight/NavModal/NavModal.js

// import css
import { withRouter } from 'react-router-dom';
import { useNavHeader } from '../../../context/NavHeaderContext';
import { useNavRight } from '../../../context/NavRightContext';
import NavRight from '../NavRight';
import './NavModal.css';

// import component
import NavModalLeft from "./NavModalLeft";
import NavModalRight from "./NavModalRight";

//? NavModal component
const NavModal = () => {
  /**
   * Controlled inputs
   */
  const { showNavModal, setShowNavModal } = useNavRight();
  const { headerColor, setHeaderColor } = useNavHeader();
  const { footerColor, setFooterColor } = useNavHeader();

  document.body.style.overflowY = "hidden";

  // try changing color here
  const nhFigure = document.querySelector(".nh-figure.user-modal");

  if (nhFigure) {
    setHeaderColor('white');
    setFooterColor('white');
  }

  return (
    <section id="nav-modal-section">
      {/* Nav Modal: Left */}
      <NavModalLeft />

      {/* Nav Modal: Right */}
      <NavModalRight />
    </section>
  );
};

// export default component
export default NavModal;
