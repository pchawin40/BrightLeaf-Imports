// import react
import React, { useState, useEffect } from 'react';

// import react-router-dom
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// import react-redux
import { useDispatch } from 'react-redux';

// import store
import { authenticate } from './store/session';

// import components
import ProtectedRoute from './components/auth/ProtectedRoute';
import LandingPage from './components/LandingPage/LandingPage';
import NavHeader from './components/NavHeader';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

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
