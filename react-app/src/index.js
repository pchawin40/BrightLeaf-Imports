import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { ModalProvider } from './context/Modal';
import { GoogleOAuthProvider } from '@react-oauth/google';
import NavHeaderProvider from './context/NavHeaderContext';
import NavRightProvider from './context/NavRightContext';
import ImageProvider from './context/ImageContext';
import ProductProvider from './context/ProductContext';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <GoogleOAuthProvider clientId="1082422331077-c0eugbsvcaj0tbv9v500qorljk16ucl3.apps.googleusercontent.com">
          <NavHeaderProvider>
            <NavRightProvider>
              <ImageProvider>
                <ProductProvider>
                  <App />
                </ProductProvider>
              </ImageProvider>
            </NavRightProvider>
          </NavHeaderProvider>
        </GoogleOAuthProvider>
      </ModalProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
