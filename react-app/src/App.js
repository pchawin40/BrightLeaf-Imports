// src/App.js

// import components
import ProtectedRoute from './components/auth/ProtectedRoute';
import LandingPage from './components/LandingPage/LandingPage';
import NavHeader from './components/NavHeader';
import NavRight from './components/NavRight';
import NavFooter from './components/NavFooter';
import NavModal from './components/NavRight/NavModal';
import ShopAll from './components/ShopAll';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Contact from './components/Contact';
import ShippingReturns from './components/ShippingReturns';
import StorePolicy from './components/StorePolicy';
import ShopProduct from './components/ShopProduct';
import ProductFormModal from './components/ProductFormModal';

// import context
import { useNavRight } from './context/NavRightContext';
import { useProduct } from './context/ProductContext';
import { useNavHeader } from './context/NavHeaderContext';
import { Modal } from './context/Modal';

// import react
import React, { useState, useEffect } from 'react';

// import react-router-dom
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import store
import * as sessionActions from './store/session';
import * as shoppingCartActions from './store/shoppingCarts';
import * as productActions from './store/products';
import * as reviewActions from './store/reviews';
import * as userActions from './store/users';
import MyOrders from './components/AccountMenu/MyOrders';
import MyAddresses from './components/AccountMenu/MyAddresses';
import MyWallet from './components/AccountMenu/MyWallet';
import MyWishlist from './components/AccountMenu/MyWishlist';
import MyAccount from './components/AccountMenu/MyAccount';

function App() {
  /**
  * Selector functions
  */
  const currentUserInfo = useSelector(sessionActions.getCurrentUserInfo);

  /**
   * Controlled inputs
   */
  const [loaded, setLoaded] = useState(false);
  const { showNavModal, setShowNavModal } = useNavRight();
  const { showProductFormModal, setShowProductFormModal } = useProduct();

  // invoke dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(sessionActions.authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  // load data
  useEffect(() => {
    if (currentUserInfo) {
      //! TODO: To work on shopping cart error
      dispatch(shoppingCartActions.thunkGetSessionUserCarts());
    }

    // load products
    dispatch(productActions.thunkGetProducts());
    // load reviews
    dispatch(reviewActions.thunkGetReviews());
    // load users
    dispatch(userActions.thunkGetUsers());
  }, [currentUserInfo]);

  if (!loaded) {
    return null;
  }

  // on page refresh, go to top of page
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }

  return (
    <BrowserRouter>
      {/* NavHeader */}
      <NavHeader />

      {/* NavFooter */}
      <NavFooter />

      {/* NavRight */}
      <NavRight />

      {/* NavModal */}
      {
        showNavModal &&
        (
          <NavModal />
        )
      }

      {/* ProductFormModal (placing in App for ShopAll and ShopProduct) */}
      {showProductFormModal && (
        <Modal
          onClose={(_) => {
            setShowProductFormModal(false)
          }}
        >
          <ProductFormModal />
        </Modal>
      )}

      <Switch>
        {/* Home */}
        <Route path='/' exact={true} >
          <LandingPage />
        </Route>

        {/* Shop All */}
        <Route path='/product-page' exact={true}>
          <ShopAll />
        </Route>

        {/* Shop All specific page */}
        <Route path='/product-page/:productName'>
          {/* //TODO: For specific product */}
          <ShopProduct />
        </Route>

        {/* Portfolio */}
        <Route path="/for-home">
          <Portfolio />
        </Route>

        {/* About */}
        <Route path="/about">
          <About />
        </Route>

        {/* Contact */}
        <Route path="/contact">
          <Contact />
        </Route>

        {/* Shipping & Return */}
        <Route path="/shipping-returns">
          <ShippingReturns />
        </Route>

        {/* Store Policy | Payment Methods */}
        <Route path="/store-policy">
          <StorePolicy />
        </Route>

        {/* //? Account Menu */}
        {/* My Orders */}
        <ProtectedRoute path="/account/my-orders">
          <MyOrders />
        </ProtectedRoute>

        {/* My Addreses */}
        <ProtectedRoute path="/account/my-addresses">
          <MyAddresses />
        </ProtectedRoute>

        {/* My Wallet */}
        <ProtectedRoute path="/account/my-wallet">
          <MyWallet />
        </ProtectedRoute>

        {/* My Wishlist */}
        <ProtectedRoute path="/account/my-wishlist">
          <MyWishlist />
        </ProtectedRoute>

        {/* My Account */}
        <ProtectedRoute path="/account/my-account">
          <MyAccount />
        </ProtectedRoute>

        {/* //? 404 Route */}
        <Route>404 Page Not Found</Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
