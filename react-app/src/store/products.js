// src/store/products.js

/* --------- ACTIONS -------- */
//? Action: Load products
const LOAD_PRODUCTS = "products/LOAD_PRODUCTS";

// action creator: load products
export const loadProducts = (products) => {
  return {
    type: LOAD_PRODUCTS,
    products
  };
};

//? Action: Create product
const CREATE_PRODUCT = "products/CREATE_PRODUCT";

// action creator: create product
export const createProduct = (product) => {
  return {
    type: CREATE_PRODUCT,
    product
  };
};

//? Action: Update products
const UPDATE_PRODUCT = "products/UPDATE_PRODUCT";

// action creator: load products
export const updateProduct = (product) => {
  return {
    type: UPDATE_PRODUCT,
    product
  };
};

//? Action: Delete product
const DELETE_PRODUCT = "products/DELETE_PRODUCT";

// action creator: delete product
export const deleteProduct = productId => {
  return {
    type: DELETE_PRODUCT,
    productId
  };
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

// thunk to create product
export const thunkPostProduct = (productToAdd) => async (dispatch) => {
  // destructure product to place into form data
  const {
    name,
    description,
    price,
    quantity,
    preview_image
  } = productToAdd;

  // define form data
  const formData = new FormData();

  // put productToAdd into form data
  formData.append("name", name);
  formData.append("description", description);
  formData.append("price", price);
  formData.append("quantity", quantity);
  formData.append("preview_image", preview_image);

  // fetch route to post product
  const res = await fetch('/api/products/', {
    method: 'POST',
    body: formData
  });

  // if succesful
  if (res.ok) {
    const productData = await res.json();

    // if there's any error from res, return null
    if (productData.errors) {
      return null;
    }

    // dispatch setting product
    dispatch(createProduct(productData));

    // if unsuccesful
  } else if (res.status < 500) {
    const data = await res.json();

    if (data['errors']) {
      return data;
    }
  }

  return ['An error occurred. Please try again.'];
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

  // return null if unsuccessful
  return null;
}

// thunk to delete product
export const thunkDeleteProduct = productId => async (dispatch) => {
  // fetch route to delete product
  const res = await fetch(`/api/products/${productId}`, {
    method: 'DELETE'
  });

  // if successful, return res
  if (res.ok) {
    // proceed to delete product in redux
    dispatch(deleteProduct(productId));
  }

  // return nothing
  return null;
}

/* --------- SELECTOR FUNCTIONS -------- */
export const getCurrentProducts = state => state.products;
export const getCurrentProductById = productId => state => Object.values(state.products).find(product => product.id === productId);

/* --------- REDUCERS -------- */
const initialState = {}

export default function productReducer(state = initialState, action) {
  const newProducts = { ...state };

  switch (action.type) {
    // case to delete product
    case DELETE_PRODUCT:
      delete newProducts[action.productId];

      return newProducts;
    default:
      return Object.assign({}, newProducts, action.products);
  }
}
