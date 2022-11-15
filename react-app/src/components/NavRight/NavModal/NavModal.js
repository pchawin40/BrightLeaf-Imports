// src/components/NavRight/NavModal/NavModal.js

// import css
import { useNavRight } from '../../../context/NavRightContext';
import NavRight from '../NavRight';
import './NavModal.css';

// import component
import NavModalLeft from "./NavModalLeft";
import NavModalRight from "./NavModalRight";

//? NavModal component
const NavModal = () => {
  const { showNavModal, setShowNavModal } = useNavRight();

  document.body.style.overflowY = "hidden";

  return (
    <section id="nav-modal-section">
      {/* Nav Modal: Left */}
      <NavModalLeft />

      {/* Nav Modal: Right */}
      <NavModalRight />

      <figure
        id="nav-rn-figure-exit"
        onClick={_ => setShowNavModal(false)}
      >
        <ul>
          <span className="line-span nav-rn" />
          <span className="line-span nav-rn" />
          <span className="line-span nav-rn" />
        </ul>
      </figure>
    </section>
  );
};

// export default component
export default NavModal;
