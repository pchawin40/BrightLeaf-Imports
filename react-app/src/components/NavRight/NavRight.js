// src/components/NavRight/NavRight.js

// import component
import NavModal from './NavModal';

// import context
import { Modal } from '../../context/Modal';
import { useNavRight } from '../../context/NavRightContext';

// import css
import './NavRight.css';

//? NavRight component
const NavRight = () => {
  /**
   * Controlled inputs
   */
  const { showNavModal, setShowNavModal } = useNavRight();

  return (
    <section
      id="nav-rn-section"
    >
      <figure
        id="nav-rn-figure"
        onClick={_ => setShowNavModal(true)}
      >
        <ul>
          <span className="line-span nav-rn" />
          <span className="line-span nav-rn" />
          <span className="line-span nav-rn" />
        </ul>
      </figure>

      {/* User Modal */}
      {showNavModal && (
        <Modal
          onClose={(_) => {
            setShowNavModal(false);
            document.body.style.overflowY = "scroll";
          }}
        >
          <NavModal />
        </Modal>
      )}
    </section>
  );
};

// export default component
export default NavRight;
