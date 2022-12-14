import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import imageReducer from './images';
import productReducer from './products';
import shoppingCartReducer from './shoppingCarts';
import reviewReducer from './reviews';
import userReducer from './users';
import keysReducer from './keys';
import productUserReducer from './productUser';
import addressReducer from './address';

const rootReducer = combineReducers({
  session: sessionReducer,
  images: imageReducer,
  products: productReducer,
  shoppingCarts: shoppingCartReducer,
  reviews: reviewReducer,
  users: userReducer,
  keys: keysReducer,
  productUsers: productUserReducer,
  addresses: addressReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
