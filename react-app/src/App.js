// src/App.js

// import components
import ProtectedRoute from './components/Auth/ProtectedRoute';
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
import MyOrders from './components/AccountMenu/MyOrders';
import MyAddresses from './components/AccountMenu/MyAddresses';
import MyWishlist from './components/AccountMenu/MyWishlist';
import MyAccount from './components/AccountMenu/MyAccount';
import CheckOutModal from './components/CheckOutModal/CheckOutModal';
import AddressModal from './components/AccountMenu/MyAddresses/MAdrContent/AddressModal';
import LoadingScreenModal from './components/LoadingScreenModal';
import ResourceNotFound from './components/ResourceNotFound';

// import context
import { useNavRight } from './context/NavRightContext';
import { useProduct } from './context/ProductContext';
import { Modal } from './context/Modal';
import { useAddress } from './context/AddressesContext';
import { useCheckOut } from './context/CheckOutContext';
import { useNavHeader } from './context/NavHeaderContext';
import { useLanding } from './context/LandingContext';
import AccountProvider from './context/AccountMenuContext';

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
import * as productUserActions from './store/productUser';
import * as addressActions from './store/address';
import * as imageActions from './store/images';

function App() {
  /**
  * Selector functions
  */
  const currentUserInfo = useSelector(sessionActions.getCurrentUserInfo);
  const currentUserAddresses = useSelector(addressActions.getCurrentUserAddresses);

  /**
   * Controlled inputs
   */
  const [loaded, setLoaded] = useState(false);
  const { showNavModal, setShowNavModal } = useNavRight();
  const { showProductFormModal, setShowProductFormModal } = useProduct();
  const { addressLoaded, setAddressLoaded } = useAddress();
  const { showCheckoutModal, setShowCheckoutModal } = useCheckOut();
  const { showAddressModal, setShowAddressModal } = useAddress();
  const { currentAddressId, setCurrentAddressId } = useAddress();
  const { loadCartModal, setLoadCartModal } = useNavHeader();
  const { selectedAddress, setSelectedAddress } = useAddress();
  const { currentStep, setCurrentStep } = useCheckOut();
  const { screenLoaded, setScreenLoaded } = useLanding();
  const { hideLoadingModal, setHideLoadingModal } = useLanding();

  // invoke dispatch
  const dispatch = useDispatch();

  /**
   * UseEffect
   */
  useEffect(() => {
    (async () => {
      await dispatch(sessionActions.authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  // per screen loading
  useEffect(() => {
    // nothing for now
  }, [screenLoaded, hideLoadingModal]);

  // load data
  useEffect(() => {
    if (currentUserInfo) {
      // get current user carts
      dispatch(shoppingCartActions.thunkGetSessionUserCarts());

      // get product that belong to users
      dispatch(productUserActions.thunkGetProductUsers());

      // get user addresses
      dispatch(addressActions.thunkGetUserAddresses());
    }

    // load products
    dispatch(productActions.thunkGetProducts());
    // load reviews
    dispatch(reviewActions.thunkGetReviews());
    // load users
    dispatch(userActions.thunkGetUsers());
  }, [currentUserInfo]);

  // per general
  useEffect(() => {
    // nothing for now
    if (
      currentUserAddresses
      &&
      currentUserAddresses.length > 0
    ) {
      setAddressLoaded(true);
    } else {
      setAddressLoaded(false);
    }
  }, [currentUserAddresses]);

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


      {/* CheckoutModal (placing in App for AccountMenu and ShopCartModal) */}
      {showCheckoutModal && (
        <Modal
          onClose={(_) => {
            // resetting cart modal
            setCurrentStep(1);
            setLoadCartModal(false);
            setShowCheckoutModal(false);
            setSelectedAddress(null);
          }}
        >
          <CheckOutModal />
        </Modal>
      )}

      {/* Address Modal */}
      {showAddressModal && (
        <Modal
          onClose={(_) => {
            setShowAddressModal(false);
            setCurrentAddressId(null);
          }}
          currentVisible={false}
        >
          <AddressModal currentAddressId={currentAddressId} setCurrentAddressId={setCurrentAddressId} />
        </Modal>
      )}

      {/* Show Loading Screen Modal */}
      {!hideLoadingModal && (
        <Modal>
          <LoadingScreenModal />
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
        <AccountProvider>
          {/* My Orders */}
          <ProtectedRoute path="/account/my-orders">
            <MyOrders />
          </ProtectedRoute>

          {/* My Addreses */}
          <ProtectedRoute path="/account/my-addresses">
            <MyAddresses />
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
          <Route path="*">
            <ResourceNotFound />
          </Route>
        </AccountProvider>
      </Switch>
    </BrowserRouter >
  );
}

export default App;
