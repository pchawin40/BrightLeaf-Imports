// src/components/NavHeader/ShoppingCartModal/ShoppingCartModal.js
// import css
import './ShoppingCartModal.css';

//import react-redux
import { useSelector } from 'react-redux';

// import store
import * as sessionActions from '../../../store/session';
import * as shoppingCartActions from '../../../store/shoppingCarts';

//? ShoppingCartModal component
const ShoppingCartModal = ({ setShowCartModal }) => {
  /**
   * Selector functions
   */
  // select user
  const currentUserInfo = useSelector(sessionActions.getCurrentUserInfo);
  // select shopping cart
  const currentUserCarts = useSelector(shoppingCartActions.getCurrentUserCarts);

  // turn body overflow off on opening
  document.body.style.overflowY = "hidden"

  return (
    <section id="shopping-cart-modal-section">
      {/* Top Section */}
      <section id="scms-top-section">
        <i
          onClick={_ => {
            setShowCartModal(false);
            document.body.style.overflowY = "scroll";
          }}
          className="fa-solid fa-chevron-right"
        />

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
