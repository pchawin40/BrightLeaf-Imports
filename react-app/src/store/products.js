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

//? Action: Update products
const UPDATE_PRODUCT = "products/UPDATE_PRODUCT";

// action creator: load products
export const updateProduct = (product) => {
  return {
    type: UPDATE_PRODUCT,
    product
  }
};

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

// thunk to update product
export const thunkUpdateProduct = (editedProduct, productId) => async (dispatch) => {
  // fetch route to update product
  const res = await fetch(`/api/products/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(editedProduct)
  });

  // if successful, return res
  if (res.ok) {
    const productUpdate = await res.json();
    dispatch(updateProduct(productUpdate));

    // return successful response
    return productUpdate;
  }

  console.log('res', await res.json());
  // console.log('errors:', await res.json()['errors']);

  // return null if unsuccessful
  return null;
}

// thunk to delete product


/* --------- SELECTOR FUNCTIONS -------- */
export const getCurrentProducts = state => state.products;
export const getCurrentProductById = productId => state => Object.values(state.products).find(product => product.id === productId);

/* --------- REDUCERS -------- */
const initialState = {}

export default function productReducer(state = initialState, action) {
  const newProducts = { ...state };

  switch (action.type) {
    default:
      return Object.assign({}, newProducts, action.products);
  }
}
