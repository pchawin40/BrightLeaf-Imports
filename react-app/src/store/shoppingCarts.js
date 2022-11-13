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

/* --------- THUNKS -------- */
export const thunkGetAllShoppingCarts = () => async (dispatch) => {
  // fetch all shopping carts
  const res = await fetch('/api/shopping-carts');

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

/* --------- SELECTOR FUNCTIONS -------- */
export const getCurrentUserCarts = state => state.shoppingCarts;

/* --------- REDUCERS -------- */
const initialState = {}

export default function shoppingCartReducer(state = initialState, action) {
  const newCarts = { ...state };

  switch (action.type) {
    default:
      return Object.assign({}, newCarts, action.shoppingCarts);
  }
}
