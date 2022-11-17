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

// import context
import { useNavRight } from './context/NavRightContext';

// import react
import React, { useState, useEffect } from 'react';

// import react-router-dom
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import store
import * as sessionActions from './store/session';
import * as shoppingCartActions from './store/shoppingCarts';
import * as imageActions from './store/images';
import * as productActions from './store/products';


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

    // load images
    // dispatch(imageActions.thunkGetImages(""));

    // load products
    dispatch(productActions.thunkGetProducts());
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

      <Switch>
        {/* Home */}
        <Route path='/' exact={true} >
          <LandingPage />
        </Route>

        {/* Shop All */}
        <Route path='/product-page'>
          <ShopAll />
        </Route>

        {/* Portfolio */}
        <Route to="/for-home">
          <Portfolio />
        </Route>

        {/* About */}
        <Route to="/about">
          <About />
        </Route>

        {/* Contact */}
        <Route to="/contact">
          <Contact />
        </Route>

        {/* Shipping & Return */}
        <Route to="/shipping-returns">
          <ShippingReturns />
        </Route>

        {/* Store Policy | Payment Methods */}
        <Route to="/store-policy">
          <StorePolicy />
        </Route>

        {/* //? 404 Route */}
        <Route>404 Page Not Found</Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
