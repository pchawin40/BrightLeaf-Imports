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

//? Action: Edit User
const EDIT_USER = "users/EDIT_USER";

// action creator: edit user
export const editUser = user => {
  return {
    type: EDIT_USER,
    user
  };
};

/* --------- THUNKS -------- */
// thunk to get users
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

// thunk to edit user
export const thunkEditUser = (userInfo, userId) => async (dispatch) => {
  // fetch route to edit user
  const res = await fetch(`/api/users/${userId}`, {
    method: 'PUT',
    body: userInfo
  });

  // if successful
  if (res.ok) {
    // parse res to json
    const editedUser = await res.json();

    // dispatch setting user
    dispatch(editUser(editedUser));

    // return edited user
    return editedUser;
  } else if (res.status < 500) {
    const data = await res.json();

    if (data['errors']) {
      return data;
    }
  }

  return null;
}

/* --------- SELECTOR FUNCTIONS -------- */
export const getCurrentUsers = state => Object.values(state.users);
export const getCurrentUserByEmail = emailToReset => state => Object.values(state.users).find(user => user.email === emailToReset);

/* --------- REDUCERS -------- */
const initialState = {}

export default function userReducer(state = initialState, action) {
  const newUsers = { ...state };

  switch (action.type) {
    default:
      return Object.assign({}, newUsers, action.users);
  }
}
