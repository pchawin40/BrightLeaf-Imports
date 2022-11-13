// src/components/NavHeader/ShoppingCartModal/ShoppingCartModal.js
// import css
import './ShoppingCartModal.css';

//import react-redux
import { useSelector } from 'react-redux';

// import store
import * as sessionActions from '../../../store/session';

//? ShoppingCartModal component
const ShoppingCartModal = () => {
  // load data
  const currentUserInfo = useSelector(sessionActions.getCurrentUserInfo);

  // turn body overflow off on opening
  document.body.style.overflowY = !currentUserInfo ? "hidden" : "scroll"

  return (
    <section id="shopping-cart-modal-section">
      {/* Top Section */}
      <section id="scms-top-section">
        <i className="fa-solid fa-chevron-right" />

        <p>
          Cart
        </p>
      </section>

      {/* Lower Section */}
      <section id="scms-lower-section">
        <p>
          Cart is empty
        </p>
      </section>
    </section>
  );
};

// export default component
export default ShoppingCartModal;
