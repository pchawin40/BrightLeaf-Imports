// src/store/shoppingCarts.js

/* --------- ACTIONS -------- */
//? Action: Load carts
const LOAD_CARTS = "carts/LOAD_CARTS";

// action creator: load carts
export const loadShoppingCarts = (shoppingCarts) => {
  return {
    type: LOAD_CARTS,
    shoppingCarts
  }
}

//? Action: Create cart
const CREATE_CART = "carts/CREATE_CART";

// action creator: create cart
export const createCart = cart => {
  return {
    type: CREATE_CART,
    cart
  }
}

//? Action: Update cart
const UPDATE_CART = "carts/UPDATE_CART";

// action creator: update cart
export const updateShoppingCart = (shoppingCart) => {
  return {
    type: UPDATE_CART,
    shoppingCart
  }
};

//? Action: Delete cart
const DELETE_CART = "carts/DELETE_CART";

// action creator: delete cart by its id
export const deleteShoppingCart = (cartId) => {
  return {
    type: DELETE_CART,
    cartId
  }
}

/* --------- THUNKS -------- */
export const thunkGetAllShoppingCarts = () => async (dispatch) => {
  // fetch all shopping carts
  const res = await fetch('/api/shopping-carts/');

  if (res.ok) {
    // parse res to shopping cart data
    const shoppingCartData = await res.json();

    // dispatch load shopping carts w/ loaded carts
    dispatch(loadShoppingCarts(shoppingCartData.shopping_carts));

    // return carts
    return shoppingCartData;
  }

  // return res if unsuccesful
  return res;
}

export const thunkGetSessionUserCarts = () => async (dispatch) => {
  // fetch all shopping carts that belong to current session user
  const res = await fetch('/api/users/shopping-carts');

  if (res.ok) {
    // parse res to shopping cart data
    const shoppingCartData = await res.json();

    // dispatch load shopping carts w/ loaded carts
    dispatch(loadShoppingCarts(shoppingCartData.shopping_carts));

    // return carts
    return shoppingCartData;
  }

  // return res if unsuccesful
  return res;
}

// thunk to create cart
export const thunkPostCart = (cart) => async (dispatch) => {
  // fetch route to post cart
  const res = await fetch("/api/shopping-carts/", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cart)
  });

  // if successful
  if (res.ok) {
    const cartData = await res.json();

    // if there's any error from res, return null
    if (cartData.errors) {
      return null;
    }

    // dispatch setting cart
    dispatch(createCart(cartData));
    // if unsucessful
  } else if (res.status < 500) {
    const data = await res.json();

    if (data['errors']) {
      return data;
    }
  }

  return ['An error occurred. Please try again.']
}

// thunk to update cart
export const thunkUpdateCart = (updateCart, cartId) => async (dispatch) => {
  // fetch route to update cart
  const res = await fetch(`/api/shopping-carts/${cartId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateCart)
  });

  // if successful, return res
  if (res.ok) {
    const cartUpdate = await res.json();
    dispatch(updateShoppingCart(cartUpdate));

    // return successful response
    return cartUpdate;
  }

  // return null if unsuccessful
  return null;
}

// thunk to delete cart
export const thunkDeleteCart = (cartId) => async (dispatch) => {
  // fetch route to delete cart
  const res = await fetch(`/api/shopping-carts/${cartId}`, {
    method: 'DELETE'
  });

  // if successful, return res
  if (res.ok) {
    dispatch(deleteShoppingCart(cartId));
  }

  // return nothing
  return null;
}

/* --------- SELECTOR FUNCTIONS -------- */
export const getCurrentUserCarts = state => Object.values(state.shoppingCarts);

/* --------- REDUCERS -------- */
const initialState = {}

export default function shoppingCartReducer(state = initialState, action) {
  const newCarts = { ...state };

  switch (action.type) {
    // case to load cart
    case LOAD_CARTS:
      return Object.assign({}, action.shoppingCarts);
    // case to remove cart
    case DELETE_CART:
      delete newCarts[action.cartId];
      return newCarts;
    default:
      return Object.assign({}, newCarts, action.shoppingCarts);
  }
}
