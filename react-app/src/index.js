import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import configureStore from './store';
import { ModalProvider } from './context/Modal';
import { GoogleOAuthProvider } from '@react-oauth/google';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModalProvider>
        <GoogleOAuthProvider clientId="1082422331077-c0eugbsvcaj0tbv9v500qorljk16ucl3.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
      </ModalProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
