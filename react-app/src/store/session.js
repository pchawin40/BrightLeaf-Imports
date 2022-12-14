// src/store/session.js

/* --------- ACTIONS -------- */
// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
})

/* --------- THUNKS -------- */

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
}

// thunk to set a new session in redux
export const thunkGetNewSessionInfo = (email) => async (dispatch) => {
  const response = await fetch('/api/auth/login_update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email
    })
  });


  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });


  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const thunkAPILogin = (response, role = "user") => async dispatch => {
  const apiUser = {
    ...response,
    role
  }

  if (response.login_by) {
    apiUser.email = `${response.name.replaceAll(' ', '-').toLowerCase()}@${response.login_by}-login.com`
    apiUser.password = "complex_p@ssword_123"
  }

  // dispatch(setUser(apiUser));
  const res = await fetch('/api/auth/custom_api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(apiUser)
  });

  if (res.ok) {
    const data = await res.json();
    dispatch(setUser({
      ...data,
      login_by: response.login_by
    }))
    return null;
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout');

  if (response.ok) {
    dispatch(removeUser());
  }
};


export const signUp = (email, password, role = "user") => async (dispatch) => {

  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      role
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

/* --------- SELECTOR FUNCTIONS -------- */
export const getCurrentUserInfo = state => state.session.user;
export const getCurrentUserId = state => state.session.user ? state.session.user.id : state.session.user;

/* --------- REDUCERS -------- */
const initialState = { user: null };

export default function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload }
    case REMOVE_USER:
      return { user: null }
    default:
      return state;
  }
}
