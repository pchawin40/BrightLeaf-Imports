// src/store/productUser.js

/* --------- ACTIONS -------- */
//? Action: Load product users
const LOAD_PRODUCT_USERS = "productUsers/LOAD_PRODUCT_USERS";

// action creator: load product users
export const loadProductUsers = productUsers => {
  return {
    type: LOAD_PRODUCT_USERS,
    productUsers
  };
};

//? Action: Create product user
const CREATE_PRODUCT_USER = "productUsers/CREATE_PRODUCT_USER";

// action creator: create product users
export const createProductUsers = productUser => {
  return {
    type: CREATE_PRODUCT_USER,
    productUser
  };
};

//? Action: Edit product user
const EDIT_PRODUCT_USER = "productUser/EDIT_PRODUCT_USER";

// action creator: edit product user
export const editProductUser = productUser => {
  return {
    type: EDIT_PRODUCT_USER,
    productUser
  };
};

//? Action: Delete product user
const DELETE_PRODUCT_USER = "productUser/DELETE_PRODUCT_USER";

// action creator: delete product user
export const deleteProductUser = productUserId => {
  return {
    type: DELETE_PRODUCT_USER,
    productUserId
  };
};

/* --------- THUNKS -------- */
export const thunkGetProductUsers = () => async (dispatch) => {
  // fetch all product users
  const res = await fetch('/api/users/');
}

/* --------- SELECTOR FUNCTIONS -------- */

/* --------- REDUCERS -------- */
