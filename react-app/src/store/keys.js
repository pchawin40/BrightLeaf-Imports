// src/store/keys.js

/* --------- ACTIONS -------- */
//? action for loading api key
const LOAD_API_KEYS = "keys/LOAD_API_KEYS";

//? action creator to use action for loading api key
const loadApiKeys = keys => ({
  type: LOAD_API_KEYS,
  keys
});

/* --------- THUNKS -------- */

//? getKey thunk action creator
// Thunk creator to access POST / stripe / maps / key route
export const getKey = () => async dispatch => {

  // post fetch /api/keys/ 
  const res = await fetch('/api/keys/', {
    method: 'POST'
  });

  // parse data to json
  const data = await res.json();

  // dispatch to load the api keys
  dispatch(loadApiKeys(data));
};

/* --------- SELECTOR FUNCTIONS -------- */
// selector function to get map key
export const getMapKey = state => state.keys.googleMapsAPIKey;
// selector function to get recaptchaKey
export const getRecaptchaKey = state => state.keys.recaptchaKey;

/* --------- REDUCERS -------- */

// initial state w/ key defaulted as null
const initialKey = {};

const keysReducer = (state = initialKey, action) => {
  const newKeys = { ...state };

  switch (action.type) {
    //? LOAD_API_KEY case to load api key
    case LOAD_API_KEYS:
      // fill api keys
      return Object.assign({}, action.keys);
    //? default case
    default:
      return Object.assign({}, newKeys, action.keys);
  }
};

// export mapsReducer
export default keysReducer;
