// import react
import React from 'react';

// import react-dom
import ReactDOM from 'react-dom';

// import react-redux
import { Provider } from 'react-redux';

// import css
import './index.css';

// import component
import App from './App';

// import store
import configureStore from './store';

// import context
import { ModalProvider } from './context/Modal';
import NavHeaderProvider from './context/NavHeaderContext';
import NavRightProvider from './context/NavRightContext';
import ImageProvider from './context/ImageContext';
import ProductProvider from './context/ProductContext';
import ShoppingCartProvider from './context/ShoppingCartContext';
import AddressProvider from './context/AddressesContext';
import ProductUserProvider from './context/ProductUserContext';

// import libraries
import { GoogleOAuthProvider } from '@react-oauth/google';
import CheckOutProvider from './context/CheckOutContext';
import LandingProvider from './context/LandingContext';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <GoogleOAuthProvider clientId="1082422331077-c0eugbsvcaj0tbv9v500qorljk16ucl3.apps.googleusercontent.com">
          <NavHeaderProvider>
            <NavRightProvider>
              <AddressProvider>
                <ImageProvider>
                  <ProductProvider>
                    <ProductUserProvider>
                      <ShoppingCartProvider>
                        <CheckOutProvider>
                          <LandingProvider>
                            <App />
                          </LandingProvider>
                        </CheckOutProvider>
                      </ShoppingCartProvider>
                    </ProductUserProvider>
                  </ProductProvider>
                </ImageProvider>
              </AddressProvider>
            </NavRightProvider>
          </NavHeaderProvider>
        </GoogleOAuthProvider>
      </ModalProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
