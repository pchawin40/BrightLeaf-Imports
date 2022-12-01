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
// thunk to get product users
export const thunkGetProductUsers = () => async (dispatch) => {
  // fetch all product users
  const res = await fetch('/api/product_users/');

  // if successful
  if (res.ok) {
    // parse res to productUser data
    const productUserData = await res.json();

    // dispatch load product users w/ loaded data
    dispatch(loadProductUsers(productUserData.product_users));

    // return data
    return productUserData;
  }

  // return res if unsuccessful
  return res;
}

// thunk to post product users
export const thunkPostProductUser = productUser => async (dispatch) => {
  // fetch route to post product user
  const res = await fetch('/api/product_users/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productUser)
  });

  // if successful
  if (res.ok) {
    const productUserData = await res.json();

    // if there's any error from res, return null
    if (productUserData.errors) {
      return null;
    }

    // dispatch setting product user
    dispatch(createProductUsers(productUserData));

    // if unsuccessful
  } else if (res.status < 500) {
    const data = await res.json();

    if (data['errors']) {
      return data;
    }
  }

  return ['An error occurred. Please try again.']
}

// thunk to edit product users
export const thunkEditProductUser = productUser => async (dispatch) => {
  // fetch route to edit product user
  const res = await fetch(`/api/product_users/${productUser.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(productUser)
  });

  // if successful
  if (res.ok) {
    // parse res to json
    const editedProductUser = await res.json();

    // dispatch setting product user
    dispatch(editProductUser(editedProductUser));

    // return edited product user
    return editedProductUser;
  }

  // return nothing if there are error
  return null;
}

// thunk to delete product users
export const thunkDeleteProductUser = productUserId => async (dispatch) => {
  // fetch route to delete product user
  const res = await fetch(`/api/product_users/${productUserId}`, {
    method: 'DELETE'
  });

  // if successful, return res
  if (res.ok) {
    // proceed to delete product user in redux
    dispatch(deleteProductUser(productUserId));
  }

  // else return nothing
  return null;
}

/* --------- SELECTOR FUNCTIONS -------- */
export const getCurrentProductUsers = state => Object.values(state.productUsers);
export const getCurrentLikeByProductId = productId => state => Object.values(state.productUsers).find(productUser => productUser.product_id === productId);

/* --------- REDUCERS -------- */
const initialState = {}

// reducer
export default function productUserReducer(state = initialState, action) {
  const newProductUsers = { ...state };

  switch (action.type) {
    default:
      return Object.assign({}, newProductUsers, action.productUsers)
  }
}
