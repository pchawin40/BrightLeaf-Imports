// src/components/NavHeader/UserModal/FacebookLoginComponent/FacebookLoginComponent.js
// import react
import React, { useState } from "react";

// import react-redux
import { useDispatch } from "react-redux";

// import libraries
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

// import store
import * as sessionActions from '../../../../store/session';

//? FacebookLogin Component
const FacebookLoginComponent = () => {
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState("");

  // invoke dispatch
  const dispatch = useDispatch();

  const responseFacebook = (res) => {
    // Login failed
    if (res.status === "unknown") {
      alert("Login failed!");
      setLogin(false);
      return false;
    }
    setData(res);
    setPicture(res.picture.data.url);
    if (res.accessToken) {
      // on successful login
      setLogin(true);

      // grab information from response
      const facebookUserResponse = {
        name: res.name,
        email: res.email,
        id: res.id
      }

      // call on thunk to set user information
      dispatch(sessionActions.thunkAPILogin(facebookUserResponse));
    } else {
      setLogin(false);
    }
  };

  // function to handle facebook logout
  const logout = () => {
    setLogin(false);
    setData({});
    setPicture("");
  };

  return (
    <div className="container">
      {!login && (
        <FacebookLogin
          appId="569720507786195"
          autoLoad={false}
          fields="name,email,picture"
          scope="public_profile,email,user_friends"
          callback={responseFacebook}
          render={renderProps => (
            <figure
              id="fb-login-img-figure"
              onClick={renderProps.onClick}
            >
              <img
                src="https://cdn2.downdetector.com/static/uploads/logo/FB-f-Logo__blue_512.png"
                alt="facebook-login"
                id="fb-login-img"
              />
            </figure>
          )}
        />
      )}

      {login && (
        // To handle to login once click on sign in w/ facebook
        <div className="card">
          <div className="card-body">
            <img className="rounded" src={picture} alt="Profile" />
            <h5 className="card-title">{data.name}</h5>
            <p className="card-text">Email ID: {data.email}</p>
            <a href="#" className="btn btn-danger btn-sm" onClick={logout}>
              Logout
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

// export default component
export default FacebookLoginComponent;
