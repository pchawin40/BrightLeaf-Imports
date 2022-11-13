// src/App.js

// import components
import ProtectedRoute from './components/auth/ProtectedRoute';
import LandingPage from './components/LandingPage/LandingPage';
import NavHeader from './components/NavHeader';

// import react
import React, { useState, useEffect } from 'react';

// import react-router-dom
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// import react-redux
import { useDispatch, useSelector } from 'react-redux';

// import store
import * as sessionActions from './store/session';
import * as shoppingCartActions from './store/shoppingCarts';
import NavRight from './components/NavRight';

function App() {
  /**
  * Selector functions
  */
  const currentUserInfo = useSelector(sessionActions.getCurrentUserInfo);

  /**
   * Controlled inputs
   */
  const [loaded, setLoaded] = useState(false);

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
      dispatch(shoppingCartActions.thunkGetSessionUserCarts());
    }
  }, [currentUserInfo]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {/* NavHeader */}
      <NavHeader />

      <Switch>
        <Route path='/' exact={true} >
          <LandingPage />
        </Route>

        {/* //? 404 Route */}
        <Route>404 Page Not Found</Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
