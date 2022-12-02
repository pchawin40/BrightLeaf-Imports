// src/store/address.js

/* --------- ACTIONS -------- */
//? Action: Load addresses
const LOAD_ADDRESSES = "addresses/LOAD_ADDRESSES";

// action creator: load addresses
export const loadAddresses = addresses => {
  return {
    type: LOAD_ADDRESSES,
    addresses
  };
};

//? Action: Create address
const CREATE_ADDRESS = "addresses/CREATE_ADDRESS";

// action creator: create address
export const createAddress = address => {
  return {
    type: CREATE_ADDRESS,
    address
  };
};

//? Action: Edit address
const EDIT_ADDRESS = "addresses/EDIT_ADDRESS";

// action creator: edit address
export const editAddress = address => {
  return {
    type: EDIT_ADDRESS,
    address
  };
};

//? Action: Delete address
const DELETE_ADDRESS = "addresses/DELETE_ADDRESS";

// action creator: delete address
export const deleteAddress = addressId => {
  return {
    type: DELETE_ADDRESS,
    addressId
  };
};

/* --------- THUNKS -------- */
// thunk to get addresses that belong to current user
export const thunkGetUserAddresses = () => async (dispatch) => {
  // fetch all addresses that belong to current user
  const res = await fetch('/api/users/addresses');

  // if successful
  if (res.ok) {
    // parse res to addresses data
    const addressesData = await res.json();

    // dispatch load addresses w/ loaded data
    dispatch(loadAddresses(addressesData.addresses));

    // return data
    return addressesData;
  }

  // return res if unsuccessful
  return res;
}

// thunk to post address
export const thunkPostAddress = address => async (dispatch) => {
  // fetch route to post address
  const res = await fetch('/api/addresses/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(address)
  });

  // if successful
  if (res.ok) {
    const addressData = await res.json();

    // if there's any error from res, return null
    if (addressData.errors) {
      return null;
    }

    // dispatch setting address
    dispatch(createAddress(addressData));

    // if unsuccessful
  } else if (res.status < 500) {
    const data = await res.json();

    if (data['errors']) {
      return data;
    }
  }

  return ['An error occurred. Please try again.']
}

// thunk to edit address
export const thunkEditAddress = address => async (dispatch) => {
  // fetch route to edit address
  const res = await fetch(`/api/addresses/${address.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(address)
  });

  // if successful
  if (res.ok) {
    // parse res to json
    const editedAddress = await res.json();

    // dispatch setting address
    dispatch(editAddress(editedAddress));

    // return edited address
    return editedAddress;
  }

  // return nothing if there are error
  return null;
}

// thunk to delete address
export const thunkDeleteAddress = addressId => async (dispatch) => {
  // fetch route to delete address
  const res = await fetch(`/api/addresses/${addressId}`, {
    method: 'DELETE'
  });

  // if successful, return res
  if (res.ok) {
    // proceed to delete address in redux
    dispatch(deleteAddress(addressId));
  }

  // else return nothing
  return null;
}

/* --------- SELECTOR FUNCTIONS -------- */
export const getCurrentUserAddresses = state => Object.values(state.addresses);

/* --------- REDUCERS -------- */
const initialState = {}

// reducer
export default function addressReducer(state = initialState, action) {
  const newAddresses = { ...state };

  switch (action.type) {
    // case to load address
    case LOAD_ADDRESSES:
      return Object.assign({}, action.addresses);
    // case to delete address
    case DELETE_ADDRESS:
      delete newAddresses[action.addressId];

      return newAddresses;
    default:
      return Object.assign({}, newAddresses, action.address)
  }
}
