// src/components/CheckOutModal/InnerRight/InnerRight.js

// import css
import './InnerRight.css';

// import react-redux
import { useSelector } from 'react-redux';

//import react-router-dom
import { Link, NavLink } from 'react-router-dom';

// import context
import { useCheckOut } from '../../../context/CheckOutContext';
// import react
import { useEffect } from 'react';

// import component
import PaymentForm from '../InnerLeft/PaymentMethod/PaymentForm';
import { checkAddressSelected } from '../InnerLeft/ShippingAddress/ShippingAddress';
import { checkCurrentCartQuantity } from '../InnerLeft/ReviewItems/ReviewItems';

// import store
import * as shoppingCartActions from '../../../store/shoppingCarts';
import * as productActions from '../../../store/products';

//? InnerRight component
const InnerRight = () => {
  /**
  * Controlled inputs
  */
  const { currentStep, setCurrentStep } = useCheckOut();
  const { stripeLoaded, setStripeLoaded } = useCheckOut();

  /**
   * Selector functions
   */
  const currentUserCarts = useSelector(shoppingCartActions.getCurrentUserCarts);
  const currentProducts = useSelector(productActions.getCurrentProducts);
  const currentItemsQuantity = useSelector(shoppingCartActions.getCurrentItemsQuantity);

  /**
  * UseEffect
  */
  // per general
  useEffect(() => {
    // nothing for now
  }, [currentStep]);

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

  // function to load inner right content container
  const loadInnerRightContent = () => {
    // if step 1, return shipping address
    if (currentStep === 1) {
      return (
        loadShippingAddressIR()
      );
    }

    // if step 2, return payment method
    if (currentStep === 2) {
      return (
        loadReviewItemsIR()
      );
    }

    // if step 3, return review items and shipping
    if (currentStep === 3) {
      return (
        loadPaymentMethodIR()
      );
    }
  }

  // function to load step 1: Shipping Address
  const loadShippingAddressIR = () => {
    return (
      <>
        {/* Place Order */}
        < button
          className={`${checkAddressSelected() ? "valid" : "invalid"}`}
          onClick={_ => {
            if (checkAddressSelected()) {
              setCurrentStep(currentStep => currentStep + 1)
            }
          }}
        >
          Use this address
        </button >

        {/* Quick Fine Line */}
        < p >
          Continue to step 3 to finish checking out.
          You'll have a chance to review and edit your order
          before it's final.
        </p >
      </>
    );
  }

  // function to open another webpage
  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  };

  // function to load step 2: Payment Method
  const loadPaymentMethodIR = () => {
    return (
      <>
        {/* Place Order */}
        < button
          className={`stripe ${stripeLoaded}`}
        >
          Checkout
        </button >

        {/* Quick Fine Line */}
        < p >
          By placing your order, you agree to Brightleaf Import's &nbsp;
          <Link
            to="/store-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Shipping and Return & Exchange Policy
          </Link >
        </p >
      </>
    );
  }

  // function to load step 3: Review Items and Shipping
  const loadReviewItemsIR = () => {
    return (
      <>
        {/* Place Order */}
        < button
          className={`cil accept-review ${checkCurrentCartQuantity(currentItemsQuantity) ? "valid" : "invalid"}`}
          onClick={_ => {
            if (checkCurrentCartQuantity(currentItemsQuantity)) {
              setCurrentStep(currentStep => currentStep + 1)
            }

          }}
        >
          Proceed to Payment
        </button >

        {/* Quick Fine Line */}
        < p >
          By placing your order, you agree to Brightleaf Import's &nbsp;
          <Link
            to="/store-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Shipping and Return & Exchange Policy
          </Link >
        </p >
      </>
    );
  }

  return (
    // Checkout Modal: Inner Section: Right
    < aside className="checkoutmodal inner-section right" >
      <aside className="cir inner-main">

        {/* Submit Container */}
        < section className="cir submit-container" >
          {
            loadInnerRightContent()
          }
        </section >

        <span className='line-span' />

        {/* Order Summary */}
        < section className="cir order-summary" >
          {/* Header */}
          <h2>
            Order Summary
          </h2>

          <section className='cir order-summary inner'>
            {/* Items $ */}
            <p>
              <span>
                Items:
              </span>
              <span>
                {` $ ${getCartTotal()} USD`}
              </span>
            </p>

            {/* Shipping & Handling */}
            <p>
              <span>
                Shipping & handling:
              </span>
              <span>
                {` $ ${0} USD`}
              </span>
            </p>

            <p className="line-span-container">
              <span />
              <span className='line-span' />
            </p>

            {/* Total before tax */}
            <p>
              <span>
                Total before tax:
              </span>
              <span>
                {` $ ${getCartTotal()} USD`}
              </span>
            </p>

            {/* Estimated tax to be collected */}
            <p>
              <span>
                Estimated tax to be collected:
              </span>
              <span>
                {` $ ${0} USD`}
              </span>
            </p>

          </section>

          <span className='line-span' />

          {/* Order total */}
          <p className="cir order-total">
            <span>
              Order total:
            </span>
            <span>
              {` $ ${getCartTotal()} USD`}
            </span>
          </p>

        </section >
      </aside>
    </aside >
  );
};

// export default component
export default InnerRight;
