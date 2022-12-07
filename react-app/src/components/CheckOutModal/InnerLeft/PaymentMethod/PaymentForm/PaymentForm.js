// src/components/CheckOutModal/InnerLeft/PaymentMethod/PaymentForm/PaymentForm.js

// import css
import './PaymentForm.css';

// import react
import { useEffect, useState } from 'react';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import react-router-dom
import { useHistory } from 'react-router-dom';

// import context
import { useCheckOut } from '../../../../../context/CheckOutContext';
import { useNavHeader } from '../../../../../context/NavHeaderContext';

// import store
import * as productActions from '../../../../../store/products';
import * as shoppingCartActions from '../../../../../store/shoppingCarts';

//? PaymentForm component
const PaymentForm = () => {
  /**
   * Controlled inputs
   */
  const { stripeLoaded, setStripeLoaded } = useCheckOut();
  const { finishLoading, setFinishLoading } = useCheckOut();
  const { stripeUrl, setStripeUrl } = useCheckOut();
  const { showCheckoutModal, setShowCheckoutModal } = useCheckOut();
  const { loadCartModal, setLoadCartModal } = useNavHeader();
  const { currentStep, setCurrentStep } = useCheckOut();

  /**
   * Selector functions
   */
  const currentUserCarts = useSelector(shoppingCartActions.getCurrentUserCarts);
  const currentProducts = useSelector(productActions.getCurrentProducts);

  /**
   * UseEffect
   */
  useEffect(() => {
    if (stripeUrl) {
      setStripeLoaded(true);
    } else {
      if (currentUserCarts && currentProducts) {
        fetchStripeUrl()
      }
    }
  }, [stripeLoaded, currentUserCarts, currentProducts]);

  // invoke history
  const history = useHistory();

  // function to get price of cart item
  const getCartItemPrice = (cartItem) => {
    // given cart item, get the quantity
    const cartItemQuantity = cartItem.quantity;
    // find product's price
    const cartItemPrice = Object.values(currentProducts).find(product => product.id === cartItem.product_id).price;

    return Math.ceil(((cartItemQuantity * cartItemPrice) * 100) / 100);
  }

  // function to get price of cart total
  const getCartTotal = () => {
    // for every cart item, invoke getCartItemPrice to find the cart item price
    let total = 0;

    Object.values(currentUserCarts).map(cart => {
      total += Math.ceil((getCartItemPrice(cart) * 100) / 100);
    });

    return total;
  }

  // fetch route to get stripe's url
  const fetchStripeUrl = async () => {
    const cartTotal = getCartTotal() * 100;

    // fetch route to post product
    const res = await fetch('/api/stripe/charge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        price: cartTotal,
        'quantity': 1
      })
    });

    // if succesful
    if (res.ok) {

      const stripeUrlToSet = await res.json();

      setStripeLoaded(false);

      if (stripeUrlToSet) {
        if (window.confirm(`You are about to leave to another page to pay. Do you accept? \n\nDISCLAIMER: STRIPE API CHARGES REAL $ AND WILL NOT BE SENDING ANY REAL PRODUCTS AS OF YET`)) {
          window.open(stripeUrlToSet.session_url, '_self');
        } else {
          window.alert("You have cancelled the payment. Heading back to home page.");

          // proceed to close and reset everything if cancelled
          history.push('/');
          setLoadCartModal(false);
          setCurrentStep(1);
          document.body.style.overflowY = "auto";
          setShowCheckoutModal(false);
        }
      }
    }
  }

  return (
    stripeLoaded
      ?
      <section>
        Awaiting for payment to finish
      </section>
      :
      <figure
        className="loading-screen"
      >
        <img
          src='https://cdn.dribbble.com/users/2077073/screenshots/6005120/loadin_gif.gif'
          alt='Loading'
        />
      </figure>
  );
};

// export default component
export default PaymentForm;
