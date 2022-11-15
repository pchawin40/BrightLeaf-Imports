// src/store/products.js

/* --------- ACTIONS -------- */
//? Action: Load products
const LOAD_PRODUCTS = "products/LOAD_PRODUCTS";

// action creator: load products
export const loadProducts = (products) => {
  return {
    type: LOAD_PRODUCTS,
    products
  }
}

/* --------- THUNKS -------- */
export const thunkGetProducts = () => async (dispatch) => {
  // fetch all products
  const res = await fetch('/api/products/');

  if (res.ok) {
    // parse res to product data
    const productData = await res.json();

    // dispatch load products w/ loaded products
    dispatch(loadProducts(productData.products));

    // return products
    return productData;
  }

  // return res if unsuccesful
  return res;
}

/* --------- SELECTOR FUNCTIONS -------- */
export const getCurrentProducts = state => state.products;

/* --------- REDUCERS -------- */
const initialState = {}

export default function productReducer(state = initialState, action) {
  const newProducts = { ...state };

  switch (action.type) {
    default:
      return Object.assign({}, newProducts, action.products);
  }
}
