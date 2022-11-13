// src/components/LandingPage/LandingPage.js

// import css
import './LandingPage.css';

// export component
import Footer from "../Footer";
import NavHeader from "../NavHeader";
import LowerLanding from "./LowerLanding";
import TopLanding from "./TopLanding";

// import react-redux
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

// import store
import * as shoppingCartActions from '../../store/shoppingCarts';
import * as sessionActions from '../../store/session';

//? LandingPage component
const LandingPage = () => {

  /**
   * Selector functions
   */
  const currentUserInfo = useSelector(sessionActions.getCurrentUserInfo);

  // invoke dispatch
  const dispatch = useDispatch();

  // load data
  useEffect(() => {
    if (currentUserInfo) {
      dispatch(shoppingCartActions.thunkGetSessionUserCarts());
    }
  }, [currentUserInfo, dispatch]);

  return (
    <section id="landing-page-section">
      {/* Top Landing */}
      <TopLanding />

      {/* Lower Landing */}
      <LowerLanding />

      {/* Footer */}
      <Footer />
    </section>
  );
};

// export default component
export default LandingPage;
