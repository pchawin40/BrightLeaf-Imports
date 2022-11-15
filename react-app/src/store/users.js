// src/store/users.js

/* --------- ACTIONS -------- */
//? Action: Load users
const LOAD_USERS = "users/LOAD_USERS";

// action creator: load users
export const loadUsers = (users) => {
  return {
    type: LOAD_USERS,
    users
  }
}

/* --------- THUNKS -------- */
export const thunkGetUsers = () => async (dispatch) => {
  // fetch all users
  const res = await fetch('/api/users/');

  if (res.ok) {
    // parse res to user data
    const userData = await res.json();

    // dispatch load users w/ loaded users
    dispatch(loadUsers(userData.users));

    // return users
    return userData;
  }

  // return res if unsuccesful
  return res;
}

/* --------- SELECTOR FUNCTIONS -------- */
/* --------- REDUCERS -------- */
const initialState = {}

export default function userReducer(state = initialState, action) {
  const newUsers = { ...state };

  switch (action.type) {
    default:
      return Object.assign({}, newUsers, action.users);
  }
}
